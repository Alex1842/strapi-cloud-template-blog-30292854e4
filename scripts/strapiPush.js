require('dotenv').config();
const { execSync } = require('child_process');

const cloudUrl = process.env.STRAPI_CLOUD_URL;
const transferToken = process.env.STRAPI_TRANSFER_TOKEN;

if (!cloudUrl || !transferToken) {
  console.error("❌ STRAPI_CLOUD_URL vagy STRAPI_TRANSFER_TOKEN hiányzik a .env-ből");
  process.exit(1);
}

const cmd = `node ./node_modules/@strapi/strapi/bin/strapi.js transfer --to ${cloudUrl} --to-token ${transferToken} --force`;

console.log("🚀 Futtatom a parancsot:\n" + cmd);
try {
  execSync(cmd, { stdio: 'inherit' });
} catch (error) {
  console.error("❌ Hiba történt:", error.message);
  process.exit(1);
}
