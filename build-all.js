const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Müşteri listesini oku
const customers = JSON.parse(fs.readFileSync('./customers.config.json', 'utf-8'));
const DIST_DIR = path.join(__dirname, 'dist');
const BASE_PATH = 'api-doc-v2';

console.log('🚀 Starting multi-tenant build process...');

// 1. Temizlik
if (fs.existsSync(DIST_DIR)) {
  console.log('🧹 Cleaning existing dist folder...');
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR);

// 2. Döngü
const buildIds = Object.keys(customers);
buildIds.forEach((id) => {
  console.log(`\n--- BUILDING: ${id} (${customers[id].name}) ---`);
  
  // Build komutunu çalıştır (CUSTOMER_ID environment variable ile)
  try {
    execSync(`CUSTOMER_ID=${id} npm run build`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Build failed for ${id}:`, error.message);
    return;
  }

  // Taşıma: baseUrl ile uyumlu olması için dist/api-doc-v2/id yapısını kuruyoruz
  const targetDir = path.join(DIST_DIR, BASE_PATH, id);
  fs.mkdirSync(targetDir, { recursive: true });
  
  // Build içeriğini hedef klasöre kopyala
  const buildPath = path.join(__dirname, 'build');
  if (fs.existsSync(buildPath)) {
    fs.cpSync(buildPath, targetDir, { recursive: true });
    console.log(`✅ Completed: ${id} -> dist/${BASE_PATH}/${id}`);
  } else {
    console.error(`❌ Build folder not found for ${id}`);
  }
});

// 3. Root index.html oluştur (Kolay erişim için)
const links = buildIds
  .map(id => `<li><a href="/${BASE_PATH}/${id}/">${customers[id].name} (${id})</a></li>`)
  .join('\n      ');

const indexHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Payporter API Documentation Builds</title>
    <style>
        body { font-family: sans-serif; padding: 40px; line-height: 1.6; max-width: 800px; margin: 0 auto; background: #f4f7f6; }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        ul { list-style: none; padding: 0; }
        li { background: white; margin: 10px 0; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: transform 0.2s; }
        li:hover { transform: translateX(10px); }
        a { text-decoration: none; color: #3498db; font-weight: bold; display: block; }
        .footer { margin-top: 50px; font-size: 0.8em; color: #7f8c8d; text-align: center; }
    </style>
</head>
<body>
    <h1>Available API Documentation Builds</h1>
    <p>Select a customer build to view:</p>
    <ul>
      ${links}
    </ul>
    <div class="footer">Built with Docusaurus Multi-Tenant Script</div>
</body>
</html>
`;

fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexHtml);

console.log('\n✨ All builds are ready in /dist folder!');
console.log(`👉 Run 'npx serve dist' to view the landing page.`);