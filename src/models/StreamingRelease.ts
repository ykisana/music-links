export interface StreamingRelease {
  upc: string;
  title: string;
  artists: string[];
  releaseDate: Date;
  spotifyAlbumArtLink: string;
  spotifyStreamingLink: string;
  appleMusicStreamingLink?: string;
}
