const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'src', 'assets', 'unsplash');
const productFile = path.join(root, 'src', 'components', 'Products', 'Products.jsx');
const seoFile = path.join(root, 'src', 'config', 'seoConfig.js');

fs.mkdirSync(assetsDir, { recursive: true });

const urlRegex = /https:\/\/images\.unsplash\.com\/[^'"\)\s]+/g;
const productText = fs.readFileSync(productFile, 'utf8');
const seoText = fs.readFileSync(seoFile, 'utf8');

const urls = [...new Set([
  ...(productText.match(urlRegex) || []),
  ...(seoText.match(urlRegex) || []),
])];

(async () => {
  const imports = [];
  const entries = [];

  for (let i = 0; i < urls.length; i += 1) {
    const url = urls[i];
    const fileName = `img-${String(i + 1).padStart(2, '0')}.jpg`;
    const localPath = path.join(assetsDir, fileName);
    const id = `img${i + 1}`;

    if (!fs.existsSync(localPath)) {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to download ${url}: ${res.status}`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(localPath, buffer);
    }

    imports.push(`import ${id} from '../../assets/unsplash/${fileName}'`);
    entries.push(`  ${JSON.stringify(url)}: ${id},`);
  }

  const remoteMapText = `${imports.join('\n')}\n\nexport const unsplashMap = {\n${entries.join('\n')}\n};\n`;
  fs.writeFileSync(path.join(assetsDir, 'remoteMap.js'), remoteMapText);

  let updatedProduct = productText;
  if (!updatedProduct.includes('unsplashMap')) {
    updatedProduct = updatedProduct.replace(
      "import styles from './Products.module.css'\n",
      "import styles from './Products.module.css'\nimport { unsplashMap } from '../../assets/unsplash/remoteMap'\n"
    );
    updatedProduct = updatedProduct.replace(
      "const products = [",
      "const localImageUrl = (url) => unsplashMap[url] ?? url\n\nconst products = ["
    );
  }

  updatedProduct = updatedProduct.replace(/image:\s*'([^']+)'/g, (match, value) => {
    if (value.startsWith('https://images.unsplash.com/')) {
      return `image: localImageUrl('${value}')`;
    }
    return match;
  });

  updatedProduct = updatedProduct.replace(/url:\s*'([^']+)'/g, (match, value) => {
    if (value.startsWith('https://images.unsplash.com/')) {
      return `url: localImageUrl('${value}')`;
    }
    return match;
  });

  fs.writeFileSync(productFile, updatedProduct);

  let updatedSeo = seoText;
  if (!updatedSeo.includes('unsplashMap')) {
    updatedSeo = updatedSeo.replace(
      "*/\n\nexport const seoConfig = {",
      "*/\n\nimport { unsplashMap } from '../assets/unsplash/remoteMap'\n\nconst localImageUrl = (url) => unsplashMap[url] ?? url\n\nexport const seoConfig = {"
    );
  }

  updatedSeo = updatedSeo.replace(/imageEn:\s*'([^']+)'/g, (match, value) => {
    if (value.startsWith('https://images.unsplash.com/')) {
      return `imageEn: localImageUrl('${value}')`;
    }
    return match;
  });

  fs.writeFileSync(seoFile, updatedSeo);

  console.log(`Processed ${urls.length} Unsplash images into ${assetsDir}`);
})();
