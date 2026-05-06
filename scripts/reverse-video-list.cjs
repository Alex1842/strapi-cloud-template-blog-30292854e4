// scripts/reverse-video-list.cjs

require("dotenv").config();

const STRAPI_URL = process.env.STRAPI_CLOUD_URL;
const STRAPI_TOKEN = process.env.STRAPI_TRANSFER_TOKEN;

async function run() {
  if (!STRAPI_URL || !STRAPI_TOKEN) {
    throw new Error("Missing STRAPI_CLOUD_URL or STRAPI_TRANSFER_TOKEN");
  }
  console.log("STRAPI_URL:", STRAPI_URL);
  console.log("TOKEN EXISTS:", Boolean(STRAPI_TOKEN));
  console.log("TOKEN PREFIX:", STRAPI_TOKEN?.slice(0, 10));

  const endpoint = `${STRAPI_URL}/api/video`;

  const getResponse = await fetch(`${endpoint}?populate=video_list`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (!getResponse.ok) {
    throw new Error(
      `GET failed: ${getResponse.status} ${await getResponse.text()}`,
    );
  }

  const payload = await getResponse.json();
  const videoList = payload?.data?.video_list ?? [];

  if (!Array.isArray(videoList)) {
    throw new Error("video_list is not an array");
  }

  const reversedVideoList = [...videoList]
    .reverse()
    .map(({ id, ...item }) => item);

  const putResponse = await fetch(endpoint, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        video_list: reversedVideoList,
      },
    }),
  });

  if (!putResponse.ok) {
    throw new Error(
      `PUT failed: ${putResponse.status} ${await putResponse.text()}`,
    );
  }

  console.log(`✅ Reversed ${reversedVideoList.length} video items.`);
}

run().catch((error) => {
  console.error("❌ Failed:", error);
  process.exit(1);
});
