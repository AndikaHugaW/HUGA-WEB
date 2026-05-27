const sharp = require('sharp');
const path = require('path');

const filePath = 'd:/File HUGA/PROJEX HUGA/Website/Porto - Huga/public/images/hero/background hero.png';

async function run() {
  try {
    const { data, info } = await sharp(filePath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    console.log(`Image info: ${info.width}x${info.height}, channels: ${info.channels}`);

    // Check pixels at various x coordinates in the middle of the height (y = height / 2)
    const y = Math.floor(info.height / 2);
    const step = Math.floor(info.width / 10);

    console.log(`Checking colors at y = ${y}:`);
    for (let i = 0; i < 10; i++) {
      const x = i * step;
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      console.log(`x = ${x}: R=${r}, G=${g}, B=${b}`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

run();
