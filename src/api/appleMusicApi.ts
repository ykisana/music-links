import jwt from "jsonwebtoken";

export function fetchAppleJWTToken() {
  const applePrivateKey = process.env.APPLE_MUSIC_PRIVATE_KEY;
  if (!applePrivateKey) {
    throw new Error("missing Apple Private Key");
  }

  const token = jwt.sign({}, applePrivateKey, {
    algorithm: "ES256",
    expiresIn: "1d",
    issuer: process.env.APPLE_MUSIC_TEAM_ID,
    header: {
      alg: "ES256",
      kid: process.env.APPLE_MUSIC_KEY_ID,
      typ: "JWT",
    },
  });

  return token;
}

export async function fetchAppleMusicStreamingLink(
  upc: string,
  authHeader: Headers
) {
  const url = `https://api.music.apple.com/v1/catalog/us/albums?filter[upc]=${upc}`;

  const response = await fetch(url, { method: "GET", headers: authHeader });
  const data = await response.json();
  return `https://music.apple.com/us/album/${data.data[0].id}` as string;
}
