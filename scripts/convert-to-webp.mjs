import sharp from "sharp";
import { readdirSync, unlinkSync } from "fs";
import { join, extname, basename } from "path";

const dir = "./public/images/certificates";
const files = readdirSync(dir).filter(f => extname(f).toLowerCase() === ".png");

console.log(`Found ${files.length} PNG files. Converting...`);

for (const file of files) {
  const input  = join(dir, file);
  const output = join(dir, basename(file, ".png") + ".webp");

  await sharp(input)
    .webp({ quality: 90, effort: 4 })
    .toFile(output);

  unlinkSync(input); // remove original PNG
  console.log(`  ✓ ${file} → ${basename(file, ".png")}.webp`);
}

console.log("\nDone! All certificates converted to WebP.");
