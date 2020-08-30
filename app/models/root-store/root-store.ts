import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { type } from "ramda";

/**
 * A RootStore model.
 */
export enum State {
    Playing = 0,
    Pause,    
}
// Define songmodel
export const SongModel = types.model("Song", {
    NameSong: types.optional(types.string, ""),
    NameAuthor: types.optional(types.string, ""),
    UrlImage: types.optional(types.string, ""),
    Duration: types.optional(types.number, 0),
    isPlaying: types.optional(types.boolean, false)
})
// Define VideoModel
export const VideoModel = types.model("Video", {
    NameVideo: types.optional(types.string, ""),
    NameAuthor: types.optional(types.string, ""),
    UrlViddeo: types.optional(types.string, ""),
    isPlaying: types.optional(types.boolean, false)
});
// Define albumSongs
export const AlbumSongModel = types.model("AlbumSong", {
    NameAlbumSong: types.optional(types.string, ""),
    AlbumSong: types.array(SongModel)
})
// Define albumVideos
export const AlbumVideoModel = types.model("AlbumVideo", {
    NameAlbumVideo: types.optional(types.string, ""),
    AlbumVideo: types.array(VideoModel)
})
// Define Playlists
export const PlaylistsModel = types.model("PlaylistsModel", {
    AlbumSongPlaylist:  AlbumSongModel,
    AlbumVideoPlaylist:  AlbumVideoModel
})
// navigation
export const PayloadObject = types.model("Payload", {
    currentScreen: types.optional(types.string, ""),
    property: types.optional(types.string, ""),
    valueProperty: types.optional(types.number, 0)
}).actions(self => ({
    setValueProp (value) {
        self.valueProperty = value;
    }
})).views(self => ({
     get getValueProp () {
        console.log(`self.valueProperty + ${self.valueProperty}`)
        return self.valueProperty
    }
}))

export const NavigationModel = types.model("NavigationModel", {
    payload: PayloadObject
})

export const DatabaseModel = types.model("DatabaseModel", {
    firestore: types.frozen()
}).views(self => {
    return {
        get getFireStore() {
            return self.firestore
        }
    }
})
// Define Settings
// export const SettingsModel = 

// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    Playlist:  PlaylistsModel,
    Navigation: types.maybe(NavigationModel),
    Database: types.maybe(DatabaseModel)
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}