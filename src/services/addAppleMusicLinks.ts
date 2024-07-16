import {
  fetchAppleJWTToken,
  fetchAppleMusicStreamingLink,
} from "@api/appleMusicApi";
import { StreamingRelease } from "@models/StreamingRelease";
import { createAuthHeader } from "@utils/createAuthHeader";

export async function addAppleMusicLinks(releases: StreamingRelease[]) {
  const jwtToken = fetchAppleJWTToken();
  const authHeader = createAuthHeader(jwtToken);

  for (const release of releases) {
    try {
      const appleMusicLink = await fetchAppleMusicStreamingLink(
        release.upc,
        authHeader
      );
      release.appleMusicStreamingLink = appleMusicLink;
    } catch {
      console.log(`Failed to get Apple Music link for ${release.upc}`);
    }
  }
  return releases;
}
