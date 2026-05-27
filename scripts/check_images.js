const sharp = require('sharp');
const path = require('path');

const heroDir = 'd:/File HUGA/PROJEX HUGA/Website/Porto - Huga/public/images/hero';

async function checkImage(filename) {
  try {
    const filePath = path.join(heroDir, filename);
    const metadata = await sharp(filePath).metadata();
    console.log(`--- ${filename} ---`);
    console.log(`Width: ${metadata.width}`);
    console.log(`Height: ${metadata.height}`);
    console.log(`Format: ${metadata.format}`);
    console.log(`Has Alpha (transparency): ${metadata.hasAlpha}`);
    console.log(`Space: ${metadata.space}`);
    console.log(`Channels: ${metadata.channels}`);
  } catch (err) {
    console.error(`Error checking ${filename}:`, err.message);
  }
}

async function run() {
  await checkImage('background hero.png');
  await checkImage('Huga.png');
  await checkImage('Huga 2.png');
  await checkImage('Huga 3.png');
}

run();
