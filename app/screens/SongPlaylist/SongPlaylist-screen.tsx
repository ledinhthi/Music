import React,{useState, useRef, FunctionComponent as Component, useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, View, StyleSheet, Dimensions, Platform, ImageBackground,
  TextInput, Image, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, FlatList, StatusBar, PanResponder, Animated} from "react-native"
import { Screen, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import Icon from "react-native-vector-icons/Feather"
import IconIonicons from "react-native-vector-icons/Ionicons"
import IconOcticons from "react-native-vector-icons/Octicons"
import { MusicPlayerScreen } from "../MusicPlayerScreen/MusicPlayer-screen"
import { NONE } from "apisauce"
import Swipeout from "react-native-swipeout"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black12DP,
}
const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;
//
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

// Make Song PlaylistFlatList
const SongListItem = ({item, navigation}) => {
  console.log(`${navigation}`)

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
          name: item.nameSong,
          author: item.nameAuthor,
          duration: item.duration
       }
       navigation.push("MusicPlayer", imageInfo)
        // navigation.navigate("MusicPlayer", imageInfo)
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
    </Swipeout>
  )
}
export const SongPlaylistScreen: Component = observer(function SongPlaylistScreen() {
   // Create state
   const [isChoseAlbum, setIsChoseAlbum] = useState(false);
   const [urlChoseAlbum, setUrlChoseAlbum] = useState("");
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
   // console.log(`Store + ${rootStore}`)
   // Pull in navigation via hook
   const navigation = useNavigation();
   useEffect(()=> {
     console.log(`screenWidth + ${widthScreen} + heightScreen + ${heightScreen}`)
   })
   function onBackButton() {

      navigation.goBack()
   }
   return (
     <Screen style={ROOT} preset="fixed">
       {/* <Text preset="header" tx="HomeScreen" /> */}
       <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
       <View style = {styles.container}>
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
                  {"My Songs"}
                </Text>
                <Text style = {[styles.textStyle, {marginLeft: 10, translateY: 96, fontSize: 15}]}> 
                  {"My Songs"}
                </Text>
             </View>
              <View style = {{flex: 1, marginTop: 150, backgroundColor: color.palette.white, borderTopLeftRadius: 50}}>
              <View style = {{flex: 1, marginTop: 35, backgroundColor: color.palette.gray16DP, borderTopLeftRadius: 70}}>
                <FlatList
                  showsVerticalScrollIndicator = {false}
                  style = {{marginTop: 15, paddingLeft: 30}}
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
    height: 30,
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