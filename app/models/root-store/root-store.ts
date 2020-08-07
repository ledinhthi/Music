import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * A RootStore model.
 */
enum State {
    Playing = 0,
    Pause,    
}
// Define songmodel
export const SongModel = types.model("Song", {
    NameSong: types.string,
    NameAuthor: types.string,
    UrlImage: types.string,
    Duration: types.number,
    isPlaying: typeof State
})
// Define VideoModel
export const VideoModel = types.model("Video", {
    NameVideo: types.string,
    NameAuthor: types.string,
    UrlViddeo: types.string,
    isPlaying: typeof State
});
// Define albumSongs
export const AlbumSongModel = types.model("AlbumSong", {
    NameAlbumSong: types.string,
    AlbumSong: types.array(SongModel)
})
// Define albumVideos
export const AlbumVideoModel = types.model("AlbumVideo", {
    NameAlbumVideo: types.string,
    AlbumVideo: types.array(VideoModel)
})
// Define Playlists
export const PlaylistsModel = types.model("PlaylistsModel", {
    AlbumSongPlaylist:  AlbumSongModel,
    AlbumVideoPlaylist:  AlbumVideoModel
})
// Define Settings
// export const SettingsModel = 

// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    Playlist: typeof PlaylistsModel
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
