# Streaming Music Link Aggregator
A program to get all major releases and streaming links for artists.

Currently only Spotify and Apple Music are supported.

## Setup
You will need to setup your environment variables and mongoDB collections.
> **_NOTE:_**  This is setup with MongoDB & the MongoDB node package.
> However, if another DB is required, you can replace the functions in the MongoDB folder.

### Initial
First begin by installing the packages.
```
npm install
```


### Setting up environment variables
You will need to create environment variables for this program to work. 
These are used for connecting to the database and the relevent streaming service APIs.
You can base this off the .env.example file.

To setup the enviroment variables, first create a file named '.env'. 
Then copy the contents of the .env.example file or the ones below. 
Finally, swap out the values.

```
MONGO_CONNECTION_STRING=""
MONGO_DATABASE_NAME=""
MONGO_ARTIST_ID_COLLECTION_NAME=""
MONGO_SREAMING_RELEASE_CONNECTION_NAME=""
SPOTIFY_CLIENT_ID=""
SPOTIFY_CLIENT_SECRET=""
APPLE_MUSIC_PRIVATE_KEY=""
APPLE_MUSIC_KEY_ID=""
APPLE_MUSIC_TEAM_ID=""
```
### Setting up MongoDB Collections
You will need two collections in your database.
One for the Spotify Artist IDs and one to store the result \(the aggregate streaming links).

By default, the list of Artist IDs must be from Spotify, as this program first uses the Spotify API to get the list of releases and the ISRCs.
