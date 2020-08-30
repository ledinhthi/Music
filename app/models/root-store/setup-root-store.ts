import { onSnapshot } from "mobx-state-tree"
import { RootStoreModel, RootStore, State } from "./root-store"
import { Environment } from "../environment"
import * as storage from "../../utils/storage"
import {firebase} from "../../config/firebase"
import { Alert } from "react-native"

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "root"

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export async function createEnvironment() {
  const env = new Environment()
  await env.setup()
  return env
}

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore
  let data: any

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment()
  // init db 
  const firestore = firebase.auth()
  .signInWithEmailAndPassword("ledinhthi11@gmail.com", "dananhchi1")
  .then((response) => {
     const db = firebase.firestore()
     return db;
  })
  .catch((Error) => {
      Alert.alert("Signin Error")
  })
  try {
    // load data from storage
    data = (await storage.load(ROOT_STATE_STORAGE_KEY)) || {}
    console.log(`Data: ${data}`)
    
    rootStore = RootStoreModel.create({
      Playlist: {
        AlbumSongPlaylist: {
          NameAlbumSong: "Vk iu",
          AlbumSong: [
            {
              NameSong: "123",
              NameAuthor: "ThiHa",
              isPlaying: false
            }
          ]

        },
        AlbumVideoPlaylist: {
          NameAlbumVideo: "Vk iu video"
        }
      },
      Navigation: {
        payload: {
          valueProperty: 0
        },
        isLogin: false
      },
      Database: {
        firestore: firestore
      }
    })
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env)

    // but please inform us what happened
    __DEV__ && console.tron.error(e.message, null)
  }

  // reactotron logging
  if (__DEV__) {
    env.reactotron.setRootStore(rootStore, data)
  }

  // track changes & save to storage
  onSnapshot(rootStore, snapshot => storage.save(ROOT_STATE_STORAGE_KEY, snapshot))

  return rootStore
}
