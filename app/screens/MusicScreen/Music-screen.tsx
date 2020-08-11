import React,{useState, useRef, FunctionComponent as Component, useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, View, StyleSheet, Dimensions, Platform, ImageBackground,
        TextInput, Image, TouchableOpacity, Keyboard,
        TouchableWithoutFeedback, FlatList, KeyboardAvoidingView} from "react-native"
import { Screen } from "../../components"
import { useNavigation, DrawerActions } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import Icon from "react-native-vector-icons/Feather"
import IconOcticons from "react-native-vector-icons/Octicons"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}
const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;
// Fake data
var DATA = [
  {
    nameAlbum: "My Songs",
    sourceImage: ""
  },
  {
    nameAlbum: "My Songs1",
    sourceImage: ""
  },
  {
    nameAlbum: "My Songs2",
    sourceImage: ""
  },
  {
    nameAlbum: "My Songs3",
    sourceImage: ""
  }
]
var SONG_DATA = [
  {
    nameSong: "Perfect",
    nameAuthor: "Edsheeran",
    UrlImage: "",
    Duration: 100
  },
  {
    nameSong: "Love you like You Do",
    nameAuthor: "TaylorSwift",
    UrlImage: "",
    Duration: 100
  },
  {
    nameSong: "LoveYourself",
    nameAuthor: "Justinbieber",
    UrlImage: "",
    Duration: 100
  },
  {
    nameSong: "Photograph",
    nameAuthor: "Edsheeran",
    UrlImage: "",
    Duration: 100
  },
  {
    nameSong: "Photograph",
    nameAuthor: "Edsheeran",
    UrlImage: "",
    Duration: 100
  },
  {
    nameSong: "Photograph",
    nameAuthor: "Edsheeran",
    UrlImage: "",
    Duration: 100
  }
  ,
  {
    nameSong: "Photograph",
    nameAuthor: "Edsheeran",
    UrlImage: "",
    Duration: 100
  }
  ,
  {
    nameSong: "Photograph",
    nameAuthor: "Edsheeran",
    UrlImage: "",
    Duration: 100
  }
]

// Make PlaylistItem
const PlaylistItem = ({item, navigation}) => {
  // const {width, height} = props;
  console.log(`props.nameAlbum + ${item.nameAlbum}`)
  return (
    <TouchableOpacity onPress = {() => {
      const imageInfo = {
         name: item.nameSong,
         author: item.nameAuthor,
         duration: item.duration
      }
       navigation.navigate("SongPlaylist", imageInfo)
     // navigation.goBack()
   }}>
     <View style = {{flex: 1, flexDirection: 'column', width: 150, height: 135, backgroundColor: color.palette.white, borderRadius: 20, marginRight: 20}}>
        <Text style = {{textAlign:'left', paddingLeft: 10, fontSize: 15, color: color.palette.offWhite, paddingTop: 106 }}>
            {item.nameAlbum}
        </Text>
     </View>
     </TouchableOpacity>
  )
}
// Make Song PlaylistFlatList
const SongListItem = ({item, navigation}) => {
  console.log(`${navigation}`)
  return (
    <TouchableOpacity onPress = {() => {
       const imageInfo = {
          name: item.nameSong,
          author: item.nameAuthor,
          duration: item.duration
       }
        navigation.navigate("MusicPlayer", imageInfo)
      // navigation.goBack()
    }}>
    <View style = {{flex: 1, flexDirection: 'row', width: widthScreen, height: 60}}>
        {/* Image */}
        <View style = {{width: 50, height: 50, backgroundColor: color.palette.white, borderRadius: 25}}>
            <Image style = {{width : 50, height: 50, borderRadius: 50/2,  resizeMode: 'cover'}}
              source = {{uri: "https://m.media-amazon.com/images/M/MV5BMGU5YTRjMTUtZDU4Mi00NjFlLWExYTAtMjVkN2JmOTE1Y2Q2XkEyXkFqcGdeQXVyNjE0ODc0MDc@._V1_UY268_CR43,0,182,268_AL_.jpg"}}
            >
            </Image>
        </View>
        {/* Content */}
        <View style = {{marginLeft: 15, marginRight: 30,
           width: widthScreen, height: 50, flexDirection: 'column', justifyContent:'space-evenly',
         }}>
          {/* Namssong */}
          <Text style = {[styles.textStyle, {fontSize: 15}]}>
            {item.nameSong}
          </Text>
         
          {/* NameAuthor */}
          <Text style = {[styles.textStyle, {fontSize: 15}]}> 
          {item.nameAuthor}
          </Text>
        </View>
        {/* Duration */}
        <View>

        </View>
    </View>
    </TouchableOpacity>
  )
}
// This store includes Playlists, song
export const MusicScreen: Component = observer(function MusicScreen() {
  // Create state
  const [isChoseAlbum, setIsChoseAlbum] = useState(false);
  const [urlChoseAlbum, setUrlChoseAlbum] = useState("");
  // useEffect(() => {
  //   // get url image from chose Album
  //   console.log("useEffect")
  // })
  // Pull in one of our MST stores
  const rootStore = useStores();
  // console.log(`Store + ${rootStore}`)
  // Pull in navigation via hook
  const navigation = useNavigation();
  const onMenuButton = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }
  console.log(`navigation + ${navigation}`)
  return (
    <Screen style={ROOT} preset="fixed">
      {/* <Text preset="header" tx="HomeScreen" /> */}
      
      <View style = {styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         {/* 15% for header  */}
         <KeyboardAvoidingView  style= {{flex:1}} behavior="padding" keyboardVerticalOffset = {-1000}>
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
                  <TextInput inlineImageLeft='search_icon' style = {styles.textInputStyle}
                  placeholder = {"Search Here!!"}
                  placeholderTextColor = {color.palette.white70Percent}>                  
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
            data ={DATA}
            keyExtractor = {(item) => {
              return item.nameAlbum
            }}
            //  renderItem = {(data) => {
            //       return (
            //           <PlaylistItem props = {{data}}/>
            //       )
            //  }}()
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
           style = {{marginTop: 10, paddingLeft : 10}}
           bounces = {false}
           horizontal = {false}
           data ={SONG_DATA}
           renderItem = {({item}) => (
              <SongListItem item = {item} navigation = {navigation}/>
             )
           }
           keyExtractor = {(item) => {
            return item.nameSong
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
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems:'flex-start'
    },
    images: {
      flex: 1,
      resizeMode: "cover",
    },
    menuButton: { 
      width: 40, 
      height: 40, 
      borderRadius: 20,
      backgroundColor: color.palette.white, 
      alignItems: 'center', 
      justifyContent: "center"
    },
    textInputStyle: {
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