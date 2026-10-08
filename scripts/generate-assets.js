const fs = require('fs');
const path = require('path');

// 1. Resume PDF
const resumeDir = path.join(__dirname, '..', 'public', 'resume');
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 500 >>
stream
BT
/F1 18 Tf
50 720 Td
(Most. Rufaida Islam Rishat - Curriculum Vitae) Tj
/F1 12 Tf
0 -30 Td
(Electronics & Communication Engineering Student) Tj
0 -18 Td
(Hajee Mohammad Danesh Science and Technology University HSTU, Bangladesh) Tj
0 -25 Td
(Focus: AI Data Annotation, Model Evaluation, Bengali-English Tasks) Tj
0 -18 Td
(Technical Skills: C, C++, Python, Spreadsheets, Data Quality & QA) Tj
0 -35 Td
(Contact: rufaidarishat@gmail.com | github.com/rufaidaislam-rishat) Tj
0 -40 Td
(Editable Placeholder: Replace this file anytime at /public/resume/) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000800 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
880
%%EOF`;

fs.writeFileSync(path.join(resumeDir, 'Rufaida_Islam_Rishat_Resume.pdf'), pdfContent);
console.log('Resume PDF written successfully.');

// 2. Generate a valid 1200x630 PNG placeholder for OG image using a 1x1 or minimal valid PNG
// Minimal valid PNG buffer
const minimalPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(path.join(publicDir, 'og-image.png'), minimalPng);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), minimalPng);
console.log('og-image.png and favicon.ico written successfully.');
