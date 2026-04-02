const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, 'dist');
const BASE_PATH = 'api-doc-v2';
const TEMP_DIR = path.join(__dirname, 'local-preview');

console.log('🌐 Preparing local preview server...');

// 1. Temizlik
if (fs.existsSync(TEMP_DIR)) {
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}
fs.mkdirSync(TEMP_DIR);

// 2. Repo adıyla klasör oluştur
const repoDir = path.join(TEMP_DIR, BASE_PATH);
fs.mkdirSync(repoDir, { recursive: true });

// 3. Dist içeriğini kopyala/linkle
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ dist folder not found! Please run "node build-all.js" first.');
  process.exit(1);
}

// Tüm dist içeriğini api-doc-v2 içine kopyala
fs.cpSync(DIST_DIR, repoDir, { recursive: true });

// index.html'i api-doc-v2 dışına da koyalım (localhost:3000/ direkt açılsın diye)
fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(TEMP_DIR, 'index.html'));

console.log(`✅ Ready! Serving ${BASE_PATH} layout locally.`);
console.log(`🚀 Access at: http://localhost:3000/${BASE_PATH}/`);

try {
  execSync('npx serve -l 3000 local-preview', { stdio: 'inherit' });
} catch (error) {
  // Graceful shutdown
} finally {
  console.log('\n🧹 Cleaning up temporary local-preview folder...');
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}
