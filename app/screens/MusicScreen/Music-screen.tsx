import React,{useState, useRef, FunctionComponent as Component, useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, View, StyleSheet, Dimensions, Platform, ImageBackground,
        TextInput, Image, TouchableOpacity, Keyboard,
        TouchableWithoutFeedback, FlatList, KeyboardAvoidingView,
         RefreshControl, ColorPropType, Alert} from "react-native"
import { Screen, MusicChartAnimation } from "../../components"
import { useNavigation, DrawerActions } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import Icon from "react-native-vector-icons/Feather"
import IconOcticons from "react-native-vector-icons/Octicons"
import Swipeout from "react-native-swipeout"
import {firebase} from "../../config/firebase"
import { boolean } from "mobx-state-tree/dist/internal"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black12DP,
}
const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;

// Make PlaylistItem
const PlaylistItem = ({item, navigation}) => {
  // const {width, height} = props;
  const albumArt = item.AlbumArt;
  return (
    <TouchableOpacity onPress = {() => {
      const imageInfo = {
         currentAlbum: item.AlbumName,
      }
       navigation.navigate("SongPlaylist", imageInfo)
     // navigation.goBack()
   }}>
     <View style = {{flex: 1, flexDirection: 'column', width: 150, height: 135, 
     backgroundColor: color.palette.white, borderRadius: 20, marginRight: 20}}
     >
       <Image style = {{flex: 1, resizeMode: 'cover', borderRadius: 20}}
       source = {{uri: albumArt}}>
       </Image>
       <Text style = {{flex: 1, ...StyleSheet.absoluteFillObject,textAlign:'left', paddingLeft: 10, 
       fontSize: 15, color: color.palette.offWhite, fontWeight:'bold' ,paddingTop: Platform.select({
         ios: 150,
         android: 106
       }) }}>
            {item.AlbumName}
        </Text>
     </View>
     </TouchableOpacity>
  )
}
// Make Song PlaylistFlatList
const SongListItem = ({item, rootStore}) => {
  const [isChoseSong, setIsChoseSong] = useState(false);
  return (
    <Swipeout style = {{flex : 1 }}  backgroundColor = {color.palette.transparent} right = {[
      {
        text: "Delete",
        type: "delete",
      }
    ]}> 
    <TouchableOpacity onPress = {() => {
       const songInfo = {
          title: item.title,
          author: item.author,
          urlSong: item.urlSong,
          urlImage: item.urlImage,
          thumbnail_medium: item.thumbnail_medium,
          duration: item.duration,
          content: item.content
       }
       setIsChoseSong(true)
       rootStore.Navigation.setPayload(songInfo)
    }}>
 
    <View style = {{flex: 1, flexDirection: 'row', width: widthScreen, height: 60}}>
        {/* Image */}
       
        <View style = {{width: 50, height: 50, backgroundColor: color.palette.white, borderRadius: 25}}>
            <Image style = {{width : 50, height: 50, borderRadius: 50/2,  resizeMode: 'cover'}}
              source = {{uri: item.urlImage}}
            >
            </Image>
            <MusicChartAnimation style = {{width: 40, height: 40}} isChose = {isChoseSong}/>
           
        </View>
        {/* Content */}
        <View style = {{marginLeft: 15, marginRight: 30,
           width: widthScreen, height: 50, flexDirection: 'column', justifyContent:'space-evenly',
         }}>
          {/* Namssong */}
          <Text style = {[styles.textStyle, {fontSize: 15}]}>
            {item.title}
          </Text>
         
          {/* NameAuthor */}
          <Text style = {[styles.textStyle, {fontSize: 15, color: color.palette.lightGrey, fontWeight: 'normal'}]}> 
          {item.author}
          </Text>
        </View>
        {/* Duration */}
        <View>
        </View>
    </View>
    </TouchableOpacity>
    </Swipeout>
  )
}
// This store includes Playlists, song
export const MusicScreen: Component = observer(function MusicScreen() {
  // Create state
  const [isChoseAlbum, setIsChoseAlbum] = useState(false);
  const [urlChoseAlbum, setUrlChoseAlbum] = useState("");
  const [vietnamAlbum, setVietNameAlbum] = useState([])
  const [mainSongs, setMainSongs] = useState([])
  const rootStore = useStores();
  
  // console.log(`Store + ${rootStore}`)
  // Pull in navigation via hook
  const navigation = useNavigation();

  const onMenuButton = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }
 
  // useEffect conbine willmount, did mount, update
  useEffect(() => {
      // get Api
      // firebase
      // .auth()
      // .signInWithEmailAndPassword("ledinhthi11@gmail.com", "dananhchi1")
      // .then((response) => {
      //   const db = firebase.firestore().collection("Music")
      //   db.doc("MusicID").get().then(musicId => {
      //     if (!musicId.exists) {
      //       Alert.alert("User does not exist anymore.")
      //       return;
      //   }
      //   const user = musicId.data().Items.forEach(item => {
      //     console.log(`item + ${item.Description}`)
      //   })
      //   Alert.alert(user)
      //   })
      //   .catch(e => {
      //     console.log("error" + e)
      //   })
       
      // })
      // .catch(error => {
      //   Alert.alert(error)
      // })
    // const vietnamAlbumName = rootStore.Playlist.AlbumSongPlaylist[0].getAlbumName();
    // const listVietnamSongs = rootStore.Playlist.AlbumSongPlaylist[0].getListSongs();
    // var vietnamAlbumData = {
    //   "AlbumName" : vietnamAlbumName,
    //   "Songs": listVietnamSongs
    // }
    if (rootStore == null) {
        console.log("RootStore is null")
    }
    else {
      const songsPlaylist =  rootStore.Playlist.getListSongAlbum()
      setVietNameAlbum(songsPlaylist)
      // set MainSongs
      console.log("OnMusicScreen" , rootStore.Playlist.getFirstAlbum().Songs)
    }
    return () => {
      console.log("MusicScreen is unmounted")
    }
  }, [])
 
  return (
    <Screen style={ROOT} preset="fixed" unsafe = {true}>
      {/* <Text preset="header" tx="HomeScreen" /> */}
      
      <View style = {styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         {/* 15% for header  */}
        <KeyboardAvoidingView  style= {{flex:1}}>
        <View style = {styles.header}>
            <View style = {{flexDirection: 'row'}}>
              <TouchableOpacity onPress = {onMenuButton}>
                <View style = {styles.menuButton}>
                    <Icon size = {20}
                      color = "#FFFFFF"
                      name = "menu">
                    </Icon>
                </View>
              </TouchableOpacity>
                <View style = {{flex : 1 ,flexDirection: "row", marginLeft: 100, alignItems: 'center'}}>
                    <IconOcticons size = {20}
                        color = "#FFFFFF"
                        name = "search"
                        style = {{position: 'absolute', top: 14, left: 7}}
                        >
                   </IconOcticons>
                  <TextInput style = {styles.textInputStyle}
                    placeholder = {"Search Here!!"}
                    placeholderTextColor = {color.palette.white70Percent}
                  >                  
                  </TextInput>
                </View>  
            </View>
        </View>   
         {/* 15% for Playlist  */}
        <View style = {[styles.playlistArea]}>
           <Text style = {styles.textStyle}> 
              {"Playlists"}
           </Text>
           <FlatList
            showsHorizontalScrollIndicator = {false}
            style = {{marginTop: 10}}
            bounces = {false}
            horizontal = {true}
            data = {vietnamAlbum}
            keyExtractor = {(item) => {
              return item.AlbumName
            }}
  
          renderItem = {({item}) => (
              <PlaylistItem item = {item} navigation = {navigation}/>
          )}
           />
        </View>
        {/* 70% for all the songs */}
        <View style = {styles.songArea}>
        <Text style = {styles.textStyle}> 
              {"Songs"}
           </Text>
           <FlatList
           showsHorizontalScrollIndicator = {false}
           showsVerticalScrollIndicator = {false}
           style = {{flex: 1, marginTop: 10, marginLeft : 10}}
           bounces = {false}
           horizontal = {false}
           data ={rootStore.Playlist.getFirstAlbum().Songs}
           renderItem = {({item}) => (
              <SongListItem item = {item} rootStore = {rootStore}/>
             )
           }
           keyExtractor = {(item) => {
            return item.title
          }}
           />
        </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
      </Screen>
  )
})

const styles = StyleSheet.create({
    container : {
       flex: 1,
       margin: 10
    },
    header : {
      flex : 1.5,
      color: 'red',
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    playlistArea : {
      flex : 2.5,
      justifyContent: 'flex-start',
      marginBottom: 10
    },
    songArea : {
      flex: 6,
      flexDirection: 'column'
    },
    images: {
      flex: 1,
      resizeMode: "cover",
    },
    menuButton: { 
      width: 40, 
      height: 40, 
      borderRadius: 20,
      backgroundColor: color.palette.gray16DP, 
      alignItems: 'center', 
      justifyContent: "center"
    },
    textInputStyle: {
      height: 40,
      paddingLeft: 35,
      width: widthScreen,
      backgroundColor: color.palette.white,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      color: color.palette.offWhite
    },
    textStyle : {
       color: color.palette.offWhite,
       fontSize: 18,
       fontWeight: '800',
    },
  
    playlistStyle: {
       flex: 9,
       marginTop: 2
    }
})