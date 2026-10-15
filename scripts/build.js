import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const wwwDir = path.join(rootDir, 'www');
const configDir = path.join(rootDir, 'config');

console.log('[Build] Cleaning and building www directory...');

if (fs.existsSync(wwwDir)) {
  fs.rmSync(wwwDir, { recursive: true, force: true });
}
fs.mkdirSync(wwwDir, { recursive: true });

// Copy all files from src to www
const srcFiles = fs.readdirSync(srcDir);
for (const file of srcFiles) {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(wwwDir, file);
  fs.copyFileSync(srcPath, destPath);
  console.log(`[Build] Copied ${file} -> www/${file}`);
}

// Copy config directory into www/config
const wwwConfigDir = path.join(wwwDir, 'config');
fs.mkdirSync(wwwConfigDir, { recursive: true });
fs.copyFileSync(
  path.join(configDir, 'business.json'),
  path.join(wwwConfigDir, 'business.json')
);
console.log('[Build] Copied config/business.json -> www/config/business.json');

// Create icons directory for Capacitor
const wwwIconsDir = path.join(wwwDir, 'icons');
fs.mkdirSync(wwwIconsDir, { recursive: true });

// Also write a standard svg icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
  <rect width="192" height="192" rx="40" fill="#123c35"/>
  <text y="125" x="96" font-size="90" font-weight="900" text-anchor="middle" fill="#00b894" font-family="system-ui, sans-serif">SF</text>
</svg>`;
fs.writeFileSync(path.join(wwwIconsDir, 'icon.svg'), svgIcon, 'utf8');

console.log('[Build] Build completed successfully.');
