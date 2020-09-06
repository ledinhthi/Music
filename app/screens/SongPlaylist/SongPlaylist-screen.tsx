import React,{useState, useRef, FunctionComponent as Component, useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, View, StyleSheet, Dimensions, Platform, ImageBackground,
  TextInput, Image, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, FlatList, StatusBar, PanResponder, Animated} from "react-native"
import { Screen, Button } from "../../components"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import Icon from "react-native-vector-icons/Feather"
import IconIonicons from "react-native-vector-icons/Ionicons"
import IconOcticons from "react-native-vector-icons/Octicons"
import { MusicPlayerScreen } from "../MusicPlayerScreen/MusicPlayer-screen"
import Swipeout from "react-native-swipeout"
import { widthDeviceScreen, heightDeviceScreen } from "../../utils/common/definition"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black12DP,
}
const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;
// Make Song PlaylistFlatList
const SongListItem = ({item, navigation}) => {
  return (
    <Swipeout style = {{flex : 1}} backgroundColor = {color.palette.transparent}
    right = {
      [
      {
       text: "Delete",
       type: "delete",
      }
     ]}
   > 
    <TouchableOpacity onPress = {() => {
       const imageInfo = {
          name: item.title,
          author: item.author,
          duration: item.duration
       }
       navigation.push("MusicPlayer", imageInfo)
    }}>
 
    <View style = {{flex: 1, flexDirection: 'row', width: widthScreen, height: 60}}>
        {/* Image */}
        <View style = {{width: 50, height: 50, backgroundColor: color.palette.white, borderRadius: 25}}>
            <Image style = {{width : 50, height: 50, borderRadius: 50/2,  resizeMode: 'cover'}}
              source = {{uri: item.urlImage}}
            >
            </Image>
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
          <Text style = {[styles.textStyle, {fontSize: 15}]}> 
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
export const SongPlaylistScreen: Component = observer(function SongPlaylistScreen() {
   // Create state
   const [isChoseAlbum, setIsChoseAlbum] = useState(false);
   const [choseAlbumn, setChoseAlbumn] = useState({});
    // slider
    const slider = useRef(new Animated.Value(0)).current
  
    let panLastPosition = useRef(0).current
    let sliderLastPosition = useRef(0).current
    let newPosition = useRef(0).current
    
    // button 
    const [favoriteColor, setFavoriteColor] = useState(false);
     slider.addListener((valueChanged) => {
         console.log(`Slider position :${valueChanged.value}`)
         sliderLastPosition = valueChanged.value
      })
     
    const sliderResponder = useRef( 
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => {
          console.log("onStart")
          const { dx, dy } = gestureState
          return (dx > 2 || dx < -2 || dy > 2 || dy < -2)
        },
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          return !(gestureState.dx === 0 && gestureState.dy === 0) 
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (event, gesture) => {
          // Progress bar
          console.log("OnTouch grant")
          slider.setOffset(sliderLastPosition)
          slider.setValue(0)    
        },
      
        onPanResponderMove: Animated.event([
          null,
          {dy: slider}
        ]),
        onPanResponderRelease: (event, gesture) => {    
          slider.flattenOffset();
          // Release slider pan
          // slider.flattenOffset();
        },
        onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
        onPanResponderTerminate: (evt, gestureState) => true,
        // onPanResponderRelease: Animated.event([
        //   null,
        //   {dx: pan},
        // ]),
      })
    ).current;
   // Pull in one of our MST stores
   const rootStore = useStores();
   const navigation = useNavigation();
   const params = useRoute().params;
   useEffect(()=> {
    console.log("route", params["currentAlbum"])
    if (rootStore != null){
      let currentAlbum = rootStore.Playlist.getAlbumByName(params["currentAlbum"]);
      setChoseAlbumn(currentAlbum)
    }
    return () => {
      console.log(`Unmount songplaylist`)
    }
   }, [])
   function onBackButton() {
      navigation.goBack()
   }
   return (
     <Screen style={ROOT} preset="fixed" unsafe = {true}>
       {/* <Text preset="header" tx="HomeScreen" /> */}
       <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
       <View style = {styles.container}>
         <View style = {{width: widthDeviceScreen, height: heightDeviceScreen, 
          position: 'absolute'}}> 
          <Image style= {{flex: 1, marginBottom: heightDeviceScreen * 42 / 100,resizeMode: 'cover'}}
            source = {{uri: choseAlbumn["AlbumArt"]}}
            >
          </Image>
       </View>
       <View style = {[styles.header, {margin: 10}]}>
            <View style = {{flexDirection: 'row'}}>
              <TouchableOpacity onPress = {onBackButton}>
                <View style = {styles.menuButton}>
                    <IconIonicons size = {20}
                      color = "#FFFFFF"
                      name = "ios-chevron-back">
                    </IconIonicons>
                </View>
              </TouchableOpacity>
                <View style = {{flex : 1 ,flexDirection: "row", marginLeft: 100, alignItems: 'center'}}>
                <TextInput  style = {styles.textInputStyle}
                    placeholder = {"Search Here!!"}
                    placeholderTextColor = {color.palette.white70Percent}>                  
                  </TextInput>
                    <IconOcticons size = {20}
                        color = "#FFFFFF"
                        name = "search"
                        style = {{position: 'absolute', top: 14, left: 7}}
                        >
                   </IconOcticons>
                   
                </View>  
            </View>
        </View>  
        <View style = {styles.songArea}>
             {/* Name Album song */}
              <View>
                <Text style = {[styles.textStyle, {marginLeft: 10, translateY: 90}]}> 
                  {choseAlbumn["AlbumName"]}
                </Text>
                <Text style = {[styles.textStyle, {marginLeft: 10, translateY: 96, fontSize: 15}]}> 
                  {"My Songs"}
                </Text>
             </View>
              <View style = {{flex: 1, marginTop: 150, backgroundColor: color.palette.gray16DP , borderTopLeftRadius: 80}}>
              <View style = {{flex: 1, marginTop: 35, backgroundColor: color.palette.black12DP, borderTopLeftRadius: 70}}>
                <FlatList
                  showsVerticalScrollIndicator = {false}
                  style = {{marginTop: 15, paddingLeft: 30}}
                  bounces = {false}
                  horizontal = {false}
                  data ={choseAlbumn["Songs"]}
                  renderItem = {({item}) => (
                      <SongListItem item = {item} navigation = {navigation}/>
                    )
                  }
                  keyExtractor = {(item) => {
                    return item.title
                  }}
                />
              </View>
            </View>
        </View>
         {/* <View style = {{width: widthScreen, height: heightScreen}}>
          <Animated.View style = {[{flex: 1}, {transform: [{translateY: slider}]}]}
           {...sliderResponder.panHandlers}>
          <MusicPlayerScreen >

          </MusicPlayerScreen>
          </Animated.View>     
        </View> */}
        </View>
      </TouchableWithoutFeedback>
        {/* <View style = {{width: widthScreen, height: Platform.OS === "ios" ? heightScreen : heightScreen - 50,  position: 'absolute'}}>
          <Animated.View style = {[{...StyleSheet.absoluteFillObject}, {transform: [{translateY: slider}]}]}
           {...sliderResponder.panHandlers}
          >
          <MusicPlayerScreen >
          </MusicPlayerScreen>
          </Animated.View>     
        </View> */}
     </Screen>
   )
})
const styles = StyleSheet.create({
  container : {
     flex: 1,
  },
  header : {
    flex : 1.5,
    color: 'red',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  songArea : {
    flex: 8.5,
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
    backgroundColor: color.palette.gray16DP,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    color: color.palette.offWhite
  },
  textStyle : {
     color: color.palette.offWhite,
     fontSize: 30,
     fontWeight: '800',
  },

  playlistStyle: {
     flex: 9,
     marginTop: 2
  }
})