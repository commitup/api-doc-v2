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
  
  // Clear old build artifacts and cache to prevent search leaks
  console.log(`🧹 Clearing cache for ${id}...`);
  execSync('npm run clear', { stdio: 'inherit' });
  
  // Build komutunu çalıştır (CUSTOMER_ID environment variable ile)
  try {
    execSync(`CUSTOMER_ID=${id} npm run build`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Build failed for ${id}:`, error.message);
    return;
  }

  // Taşıma: baseUrl (/api-doc-v2/id/) ile uyumlu olması için dist/id yapısını kuruyoruz
  const targetDir = path.join(DIST_DIR, id);
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

// 3. Root index.html oluştur (Güvenlik için listeleme kaldırıldı)
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payporter API Documentation</title>
    <style>
        :root {
            --primary: #3498db;
            --secondary: #2c3e50;
            --text: #34495e;
            --bg: #f4f7f6;
            --white: #ffffff;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: var(--bg);
            color: var(--text);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        .container {
            background: var(--white);
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            max-width: 500px;
            width: 90%;
            border-top: 5px solid var(--primary);
        }
        h1 {
            color: var(--secondary);
            margin-bottom: 1rem;
            font-size: 1.8rem;
        }
        .warning-box {
            background: #fff8e1;
            border-left: 4px solid #ffc107;
            padding: 1.5rem;
            margin: 2rem 0;
            border-radius: 8px;
            text-align: left;
        }
        .warning-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            display: block;
        }
        p {
            line-height: 1.6;
            color: var(--text);
            font-weight: 500;
            margin: 0;
        }
        .footer {
            margin-top: 2rem;
            font-size: 0.8rem;
            color: #bdc3c7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Payporter API Documentation</h1>
        <div class="warning-box">
            <span class="warning-icon">🔐</span>
            <p>Access Restricted</p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem; color: #666;">Please contact your <strong>account manager</strong> to obtain the full documentation URL for your account.</p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} Payporter. Documented with Cloud API Tech.</div>
    </div>
</body>
</html>
`;

fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexHtml);

console.log('\n✨ All builds are ready in /dist folder!');
console.log(`👉 Run 'npx serve dist' to view the landing page.`);