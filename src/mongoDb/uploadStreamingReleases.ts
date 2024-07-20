import { StreamingRelease } from "@models/StreamingRelease";
import { Collection, Db } from "mongodb";

export async function uploadStreamingReleases(
  db: Db,
  releases: StreamingRelease[]
) {
  try {
    const collection: Collection<StreamingRelease> = db.collection(
      process.env.MONGO_SREAMING_RELEASE_CONNECTION_NAME!
    );
    const updateOptions = { upsert: true };

    for (const release of releases) {
      const updateParams = createUpdateParams(release);
      await collection.updateOne(
        updateParams.filter,
        updateParams.update,
        updateOptions
      );
    }
  } catch (e) {
    console.log(e);
  }
}

function createUpdateParams(release: StreamingRelease) {
  const filter = { upc: release.upc };
  const update = {
    $set: {
      title: release.title,
      artists: release.artists,
      releaseDate: release.releaseDate,
      spotifyAlbumArtLink: release.spotifyAlbumArtLink,
      spotifyStreamingLink: release.spotifyStreamingLink,
      ...(release.appleMusicStreamingLink && {
        appleMusicStreamingLink: release.appleMusicStreamingLink,
      }),
    },
  };

  return { filter, update };
}
