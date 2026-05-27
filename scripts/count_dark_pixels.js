const sharp = require('sharp');
const path = require('path');

const heroDir = 'd:/File HUGA/PROJEX HUGA/Website/Porto - Huga/public/images/hero';

async function countDarkPixels(filename) {
  try {
    const filePath = path.join(heroDir, filename);
    const { data, info } = await sharp(filePath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    let darkPixels = 0;
    const totalPixels = info.width * info.height;

    for (let i = 0; i < data.length; i += info.channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Dark pixel threshold: R < 60, G < 60, B < 60
      if (r < 60 && g < 60 && b < 60) {
        darkPixels++;
      }
    }

    console.log(`--- ${filename} ---`);
    console.log(`Total pixels: ${totalPixels}`);
    console.log(`Dark pixels (R,G,B < 60): ${darkPixels}`);
    console.log(`Percentage: ${(darkPixels / totalPixels * 100).toFixed(2)}%`);
  } catch (err) {
    console.error(`Error analyzing ${filename}:`, err.message);
  }
}

async function run() {
  await countDarkPixels('background hero.png');
  await countDarkPixels('Huga.png');
}

run();
