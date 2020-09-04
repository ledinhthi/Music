import { Instance, SnapshotOut, types, SnapshotIn } from "mobx-state-tree"
import { forEach } from "ramda"

/**
 * A RootStore model.
 */
export enum State {
    Playing = 0,
    Pause,    
}
// Define songmodel
export const SongModel = types.model("Song", {
    title: types.optional(types.string, ""),
    author: types.optional(types.string, ""),
    urlImage: types.optional(types.string, ""),
    duration: types.optional(types.number, 0),
    urlSong: types.optional(types.string, ""),
    content: types.optional(types.string, "")
})
// // Define VideoModel
// export const VideoModel = types.model("Video", {
//     NameVideo: types.optional(types.string, ""),
//     NameAuthor: types.optional(types.string, ""),
//     UrlViddeo: types.optional(types.string, ""),
//     isPlaying: types.optional(types.boolean, false)
// });
// Define albumSongs
export const AlbumSongModel = types.model("AlbumSong", {
    AlbumArt: types.optional(types.string, ""),
    AlbumName: types.optional(types.string, ""),
    Songs: types.array(SongModel)
})
.actions(self => ({
    setAlbumName (albumName) {
        console.log(`AlbumName` + albumName)
        self.AlbumName = albumName
    },
    setListSongs (listSong) {
        self.Songs = listSong
    },
    setAlbumArt(albumArt) {
        console.log(`albumAdrt` + albumArt)
        self.AlbumArt = albumArt
    }
}))
.views(self => ({
     getAlbumName () {
        console.log("self.AlbumName" + self.AlbumName)
        return self.AlbumName;
     },
     getListSongs () {
        console.log("NumberOf songs" + self.Songs.length)
        return self.Songs;
     }
}))
// Define albumVideos
// export const AlbumVideoModel = types.model("AlbumVideo", {
//     NameAlbumVideo: types.optional(types.string, ""),
//     AlbumVideo: types.array(VideoModel)
// })
// Define Playlists
export const PlaylistsModel = types.model("PlaylistsModel", {
    AlbumSongPlaylist:  types.array(AlbumSongModel)
})
.views(self => ({
    getListSongAlbum() {
        return self.AlbumSongPlaylist
    },
    getFirstAlbum() {
        return self.AlbumSongPlaylist[0]
    },
    getAlbumByName(nameAlbum) {
        var albumTemp = {};
        if (self.AlbumSongPlaylist.length > 0) {
            self.AlbumSongPlaylist.forEach(albumn => {
                if (albumn.AlbumName == nameAlbum) {
                    albumTemp = albumn
                    return;
                }
            })
        }
        return albumTemp;
    }
}))
.actions(self => ({
    setListAlbum(listAlbum) {
        self.AlbumSongPlaylist = listAlbum
    }
}))
// navigation
export const PayloadObject = types.model("Payload", {
    title: types.optional(types.string, ""),
    author: types.optional(types.string, ""),
    urlImage: types.optional(types.string, ""),
    duration: types.optional(types.number, 0),
    urlSong: types.optional(types.string, ""),
    content: types.optional(types.string, "")
})

export const NavigationModel = types.model("NavigationModel", {
    payload: PayloadObject,
    isLogin: types.optional(types.boolean, false)
}).views(self => {
    return {
        getIsLogin() {
            return self.isLogin
        },
        getPayload() {
            return self.payload
        }
    }
}).actions(self => {
    return {
        setIsLogin<T>(key: keyof SnapshotIn<typeof self>, value: T) {
            (self[key] as T) = value;
        },
        setPayload(payload) {
            console.log("payload", payload)
            self.payload = payload
        }
    }
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
export const RootStoreModel = types.model("RootStore",{
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
