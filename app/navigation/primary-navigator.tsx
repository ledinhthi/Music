/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { createDrawerNavigator } from '@react-navigation/drawer'
import {PortablePlayerScreen, SettingsScreen, MusicScreen,
       MusicPlayerScreen, PlaylistScreen, VideoScreen, VideoPlayerScreen,
      AlbumSongScreen, AlbumVideoScreen, SongPlaylistScreen, VideoPlaylistScreen} from "../screens"
// import { Image } from "react-native";
import Image from 'react-native-remote-svg'
// import Image from 'react-native-remote-svg'
import IconFontAweSome from 'react-native-vector-icons/FontAwesome';
import IconIoniCons from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import {color} from "../theme/color"

// settings  inicon   md-settings-sharp 

//Entypo video music

// material comunoity playlist-music
// Music
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
// Define Paramlist
export type PrimaryParamList = {
  Music: undefined
  Playlists: undefined
  Video: undefined
  Settings: undefined
};
// Music Param list for Music screen
export type MusicParamList = {
  Music: undefined
  MusicPlayer: undefined
  SongPlaylist: undefined
};
// Playlist param list for playlistScreen
export type PlaylistsParamList = {
  MusicPlaylist : undefined
  VideoPlaylist : undefined
};
// AlbumSongParamList For PlaylistParam
export type AlbumSongParamList = {
  AlbumSongScreen: undefined
  MusicPlayer: undefined
  SongPlaylist: undefined
};
// AlbumVideoParamList For PlaylistParam
export type AlbumVideoParamList = {
  AlbumVideoScreen: undefined
  VideoPlayer: undefined
  VideoPlaylists: undefined
}
// VideoParamlist for video screen
export type VideoParamList = {
  Video : undefined
  VideoPlayer: undefined
  VideoPlaylists: undefined
}
// Create Stack for all screens 
const DrawerStack = createDrawerNavigator<PrimaryParamList>();
const MusicStack  = createNativeStackNavigator<MusicParamList>();
const PlaylistsStack = createMaterialTopTabNavigator<PlaylistsParamList>();
const AlbumSongStack  = createNativeStackNavigator<AlbumSongParamList>();
const AlbumVideoStack = createNativeStackNavigator<AlbumVideoParamList>();
const VideoStack  = createNativeStackNavigator<VideoParamList>();
// Albumsong
function AlbumSong () {
  return (
    <AlbumSongStack.Navigator
    screenOptions = {{
      headerShown : false
    }}
    >
      <AlbumSongStack.Screen name = "AlbumSongScreen" component = {AlbumSongScreen}/>
      <AlbumSongStack.Screen name = "SongPlaylist" component = {SongPlaylistScreen}/>
      <AlbumSongStack.Screen name = "MusicPlayer" component = {MusicPlayerScreen}/>
    </AlbumSongStack.Navigator>
  )
}
// AlbumVideo
function AlbumVideo () {
  return (
    <AlbumVideoStack.Navigator
    screenOptions = {{
      headerShown : false
    }}
    >
      <AlbumVideoStack.Screen name = "AlbumVideoScreen" component = {AlbumVideoScreen}/>
      <AlbumVideoStack.Screen name = "VideoPlayer" component = {VideoPlayerScreen}/>
      <AlbumVideoStack.Screen name = "VideoPlaylists" component = {VideoPlaylistScreen}/>
    </AlbumVideoStack.Navigator>
  )
}

// Music Stack
function Music () {
  return (
     <MusicStack.Navigator
      screenOptions = {{
        headerShown : false
      }}
     >
       <MusicStack.Screen 
       name = "Music" component = {MusicScreen} />
       <MusicStack.Screen name = "MusicPlayer" component = {MusicPlayerScreen} />
       <MusicStack.Screen name = "SongPlaylist" component = {SongPlaylistScreen} />
     </MusicStack.Navigator>
  )
}
// Playlist 
function Playlists () {
  return (
     <PlaylistsStack.Navigator
    >
       <PlaylistsStack.Screen name = "MusicPlaylist" component = {AlbumSong} />
       <PlaylistsStack.Screen name = "VideoPlaylist" component = {AlbumVideo} />
     </PlaylistsStack.Navigator>
  )
}
// Video 
function Video () {
  return (
    <VideoStack.Navigator
      initialRouteName = "Video"
    >
        <VideoStack.Screen name = "Video" component = {VideoScreen}/>
        <VideoStack.Screen name = "VideoPlayer" component = {VideoPlayerScreen}/>
        <VideoStack.Screen name = "VideoPlaylists" component = {VideoPlaylistScreen}/>
    </VideoStack.Navigator>
  )
}
// Export Function which contain all
export function PrimaryNavigator() {
  return (
    <DrawerStack.Navigator
        screenOptions={{
         gestureEnabled: true,
         swipeEnabled: false
          // header : {{visible: false}}
      }}
      drawerContentOptions = {{
        style: {
          flex: 1,
          backgroundColor: color.palette.bluePurple
        }
      }}
      initialRouteName = "Music"
      backBehavior = "order"
      drawerType = "front"
      >
      <DrawerStack.Screen
      options = {
        { 
          drawerIcon: ({focused, size}) => (
            <IconFontAweSome name= "music" size= {25} color =  {focused ? "#00BFFF" : "#808080"}/>
          ),
        }
      }
      
      name = "Music" component = {Music} />
      <DrawerStack.Screen 
      options = {
        {
          title: "Playlists",
          drawerIcon: ({focused, size}) => {
            console.log(`focused + ${focused}`)
            return (
            <IconMaterial name = "playlist-music" size = {25} color =  {focused ? "#00BFFF" : "#808080"}/>
            )
          }
        }
      }
      name = "Playlists" component = {Playlists} />
      <DrawerStack.Screen 
        options = {
          {
            title: "Video",
            drawerIcon: ({focused, size}) => (
              <IconMaterial name = "video" size = {25} color =  {focused ? "#00BFFF" : "#808080"}/>
            )
          }
        }
      name = "Video" component = {Video} />
      <DrawerStack.Screen 
        options = {
          {
            title: "Settings",
            drawerIcon: ({focused, size}) => (
              <IconIoniCons name = "md-settings-sharp" size = {25} color =  {focused ? "#00BFFF" : "#808080"}/>
            )
          }
        }
      name = "Settings" component = {SettingsScreen} />    
    </DrawerStack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
