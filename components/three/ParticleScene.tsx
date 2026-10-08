"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ParticleScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 800 : 1900;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let particlesMesh: THREE.Points;
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 85;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Particle Geometry & Attributes
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const originalY = new Float32Array(particleCount);

      // Color Palette: Blue (#4F46E5), Purple (#7C3AED), Cyan (#06B6D4)
      const colorBlue = new THREE.Color("#4F46E5");
      const colorPurple = new THREE.Color("#7C3AED");
      const colorCyan = new THREE.Color("#06B6D4");

      const spreadX = isMobile ? 70 : 120;
      const spreadY = isMobile ? 65 : 90;
      const spreadZ = 50;

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * spreadX;
        const y = (Math.random() - 0.5) * spreadY;
        const z = (Math.random() - 0.5) * spreadZ;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        originalY[i] = y;

        // Interpolate colors
        const rand = Math.random();
        const selectedColor = new THREE.Color();
        if (rand < 0.35) {
          selectedColor.copy(colorBlue);
        } else if (rand < 0.7) {
          selectedColor.copy(colorPurple);
        } else {
          selectedColor.copy(colorCyan);
        }

        colors[i * 3] = selectedColor.r;
        colors[i * 3 + 1] = selectedColor.g;
        colors[i * 3 + 2] = selectedColor.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Circular glowing particle texture
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.3, "rgba(124, 58, 237, 0.8)");
        grad.addColorStop(0.7, "rgba(6, 182, 212, 0.3)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      const particleTexture = new THREE.CanvasTexture(canvas);

      const material = new THREE.PointsMaterial({
        size: isMobile ? 1.6 : 2.0,
        map: particleTexture,
        transparent: true,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.85,
      });

      particlesMesh = new THREE.Points(geometry, material);
      scene.add(particlesMesh);

      // Mouse tracking with lerp
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetY = (e.clientY / window.innerHeight - 0.5) * 2;
      };

      if (!isMobile) {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
      }

      // Handle Resize
      const handleResize = () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      window.addEventListener("resize", handleResize);

      // Render Loop
      let clock = new THREE.Clock();

      const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        if (!prefersReducedMotion) {
          // Smooth mouse lerp
          mouseX += (targetX - mouseX) * 0.04;
          mouseY += (targetY - mouseY) * 0.04;

          particlesMesh.rotation.y = elapsedTime * 0.03 + mouseX * 0.15;
          particlesMesh.rotation.x = mouseY * 0.1;

          // Subtle wave motion on particles
          const pos = geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < particleCount; i++) {
            const x = pos[i * 3];
            pos[i * 3 + 1] =
              originalY[i] + Math.sin(elapsedTime * 1.2 + x * 0.08) * 1.5;
          }
          geometry.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        if (!isMobile) {
          window.removeEventListener("mousemove", handleMouseMove);
        }
        if (renderer?.domElement && container?.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        particleTexture.dispose();
        renderer.dispose();
      };
    } catch (err) {
      console.warn("WebGL initialization skipped:", err);
      setWebGLSupported(false);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Background gradients providing atmospheric depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.18),rgba(10,10,15,0))]" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0A0A0F] to-transparent pointer-events-none" />
      {!webGLSupported && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,rgba(10,10,15,0.95)_70%)]" />
      )}
    </div>
  );
}
