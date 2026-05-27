const sharp = require('sharp');
const path = require('path');

const heroDir = 'd:/File HUGA/PROJEX HUGA/Website/Porto - Huga/public/images/hero';

async function analyzeTransparency(filename) {
  try {
    const filePath = path.join(heroDir, filename);
    const { data, info } = await sharp(filePath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    let transparentPixels = 0;
    const totalPixels = info.width * info.height;

    if (info.channels === 4) {
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) {
          transparentPixels++;
        }
      }
    }

    console.log(`--- ${filename} ---`);
    console.log(`Total pixels: ${totalPixels}`);
    console.log(`Transparent pixels: ${transparentPixels}`);
    console.log(`Transparency percentage: ${(transparentPixels / totalPixels * 100).toFixed(2)}%`);
  } catch (err) {
    console.error(`Error analyzing ${filename}:`, err.message);
  }
}

async function run() {
  await analyzeTransparency('background hero.png');
  await analyzeTransparency('Huga.png');
}

run();
