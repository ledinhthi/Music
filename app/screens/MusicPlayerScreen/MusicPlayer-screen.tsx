import React,{useState, useRef, FunctionComponent as Component, useEffect, ReactElement, ReactChildren, ReactNode, ReactChild} from "react"
import { observer } from "mobx-react-lite"
import { Animated, ViewStyle, Text, View, StyleSheet, Dimensions, Platform, ImageBackground,
  TextInput, Image, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, FlatList, PanResponder, Slider, Share, Alert} from "react-native"
import { Screen, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import IconFeather from "react-native-vector-icons/Feather"
import IconIonicons from "react-native-vector-icons/Ionicons"
import IconOcticons from "react-native-vector-icons/Octicons"
import IconMaterial from "react-native-vector-icons/MaterialIcons"
import IconAwesome from "react-native-vector-icons/FontAwesome"
import IconEntypo from "react-native-vector-icons/Entypo"
import * as ProgressBar from "react-native-progress"
import { transform } from "@babel/core"
import { MiniPlayer } from "./MiniPlayer"
import { widthDeviceScreen } from "../../utils/common/definition"
import TrackPlayer, { STATE_PLAYING, ProgressComponent, STATE_BUFFERING} from "react-native-track-player";
import { TraceMode } from "mobx/lib/internal"
import { State } from "react-powerplug"
import Video from 'react-native-video'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black12DP,

  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
}
const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;
export interface Props {
  name?: String,
  Iconstyles?: any,
  playingState?: boolean,
  lastPosition?: number
}
export interface ParentCompProps {
  lastPosition?: number
}
export const MusicPlayerScreen: Component = observer(function MusicPlayerScreen(props: ParentCompProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  async function setup(trackInfo) {
    await TrackPlayer.setupPlayer({});
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      ]
    });
    var data : string = trackInfo["urlSong"]
    await TrackPlayer.add({
      id: 'trackId',
      url: "https://mp3-s1-zmp3.zadn.vn/276ef4b7d0f039ae60e1/3055462972925438680?authen=exp=1599314241~acl=/276ef4b7d0f039ae60e1/*~hmac=b6bb23d54bed259aed93f2f197e338a6",
      title: trackInfo["title"],
      artist: trackInfo["author"],
      artwork: trackInfo["urlImage"],
      duration: trackInfo["duration"]
    });
  }
  
  const rootStore = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation();
  
  function onPressToSmallScreen () {
    // make small screen
     navigation.goBack()
    //  console.log(`${navigation.}`)
  }
  // create panResponsder to use pan for life cycle
  const pan = useRef(new Animated.Value(0)).current
  
  const sliderPosition = useRef(new Animated.Value(0)).current
  
  const customHeight = Platform.select({
    ios:  heightScreen - 60,
    android: heightScreen - 60 - 48
   })
 
  const opacitySlider = sliderPosition.interpolate({
    inputRange: [0 , customHeight - 100 , customHeight - 50],
    outputRange: [0, 0, 1]
  })
  let panLastPosition = useRef(0).current
  let newPosition = useRef(0).current
  // usestate ß
  const [favoriteColor, setFavoriteColor] = useState(false);
  const [isPlayingState, setPlayingState] = useState(true);
  const [lastPosition, setLastPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackInfo, setTrackInfo] = useState({});
  const [songUrl, setSongUrl] = useState("");
  // let   isPlayingState = useRef(false).current;
  const onShare = async () => {
      try {
        const result = await Share.share({
           message: "Start Share Music!",
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
        
      }
      catch (error) {
         Alert.alert(error.messsage)
         console.log(`${error.messsage}`)
      }
  }
  // Pan change Value change
    pan.addListener((value) => {  
        panLastPosition = value.value
    })
  //
  // const [panOffsetX, setPanOffSetX] = useRef(new Animated.vale);
  const panResponder = useRef( 
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        console.log(`onMoveSetPanResponder x`)
        return (
          true
        )
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (event, gesture) => {
        // Progress bar 
        pan.setOffset(panLastPosition)
        pan.setValue(0)
        console.log(`event.nativeEvent.locationX: + ${event.nativeEvent.locationX} + gesture : ${gesture.dx}
        panLastPosition + ${panLastPosition} `)
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: pan}
      ]),
      onPanResponderRelease: (event, gesture) => {    
        console.log(`onPanResponderRelease event.nativeEvent.locationX: + ${event.nativeEvent.locationX} + gesture : ${gesture.dx}
        + pan + ${pan} + x0 : ${gesture.x0} + moveX + ${gesture.moveX} + newPosition: ${newPosition}`)
        pan.flattenOffset();
      },
      // on
    })
  ).current;
  // UseEffect
  useEffect(() => {
    //Set up track player
    const trackInforTemp = rootStore.Navigation.getPayload()
    console.log("trackInfor", trackInforTemp.urlSong)
    setTrackInfo(trackInforTemp);
    setSongUrl(trackInforTemp.urlSong)
    setup(trackInforTemp)
    // TrackPlayer.getDuration().then((duration) => {
    //   setDuration(duration)
    //   // 0.980392156862745
    //   console.log(`Current duration + ${duration}`)
    // })
    // TrackPlayer.getPosition().then((position) => {
    //   // setDuration(duration)
    //   // 0.980392156862745
    //   console.log(`position + ${position}`)
    // })
   
  
    return () => {
      console.log(`Unmounted MusicPlayer-screen`)
      pan.removeAllListeners()
    }
  }, []) 

  useEffect(() => {
      // setLastPosition()
     sliderPosition.setValue(props.lastPosition);
  }, [props.lastPosition])


  // Player 
  const processPlayState = () => {
    let playState = "";
    TrackPlayer.getState().then((state) => {
        console.log(`State + ${state}`)
       
        console.log(`State + ${playState} +  STATE_PLAYING + ${STATE_PLAYING}`)
        if (state == STATE_PLAYING) {
          console.log(`Playstate`)
           onPause().then(() => {
             setPlayingState(true)
           })
        }
        else {
           onPlay().then(() => {
            setPlayingState(false)
           })
        }
    }).catch(error => {
       console.log(`Error`)
    })
   
  }
  // 
  async function onNext() {
    console.log(`Skip to next`)
    await TrackPlayer.skipToNext();
  }
  async function onPrevious() {
    console.log(`Skip to Previous`)
    await TrackPlayer.skipToPrevious();
  }
  async function onPause() {
      console.log(`onPause`)
      await TrackPlayer.pause();
  }
  async function onPlay () {
      console.log(`onPlay`)
      await TrackPlayer.play();
  }
  return (
    <Screen style={ROOT} preset="fixed">
            {/* Image backgorund */}
        <View style = {styles.container}>
          <TouchableOpacity style = {{flex : 1}} onPress = {() => {
            console.log("OnPress on miniPlayer")
          }}>
          <Animated.View style = {{flex :1, opacity: opacitySlider}}>
          
          <MiniPlayer   
          {...{isPlayingState : isPlayingState,
               processPlayState: processPlayState}}>
          </MiniPlayer>
          </Animated.View>
          </TouchableOpacity>
          <View style = {[styles.header, {marginLeft: 10}]}>
          <TouchableOpacity onPress = {onPressToSmallScreen}>
                <View style = {styles.menuButton}>
                    <IconIonicons size = {20}
                      color = "#FFFFFF"
                      name = "ios-chevron-down">
                    </IconIonicons>
                </View>
          </TouchableOpacity>
          </View>
          <View style = {styles.playerArea}>
            {/*  Content */}
            <View style = {{flex: 4 }}>
              <View style = {{flex: 1, alignItems: 'center', marginTop: 180}}>
                  <Text style = {[styles.textStyle, {fontSize: 20}]}>
                      {trackInfo["title"]}
                  </Text>
                  <Text style = {[styles.textStyle, {marginTop: 5, fontSize: 15, fontWeight:'normal', color: 'gray'}]}>
                      {trackInfo["author"]}
                  </Text>
              </View>
            </View>
            {/* InformAtion bar */}
            <View style = {{flex: 1.5}}>
              <View style = {{flex: 1, margin: 10, backgroundColor: color.palette.gray1DP, borderRadius: 20}}>
                  <View  style = {{flex: 1, flexDirection: 'row', marginLeft: 15, marginRight: 15, 
                  marginTop: 20, marginBottom: 20, alignItems: 'center'}}>
                    {/* Image */}
                    <View style = {{width: 50 , height : 50, borderRadius: 25, backgroundColor: color.palette.white}}>
                    <Image style = {{width : 50, height: 50, borderRadius: 50/2,  resizeMode: 'cover'}}
                        source = {{uri: trackInfo["urlImage"]}}
                      >
                    </Image>
                    </View>
                    <View style = {{flex: 1, flexDirection: 'column', height: 50, marginLeft: 20, marginRight: 30, justifyContent: 'center'}}>
                        <Text style = {[styles.textStyle, {fontSize: 15}]}>
                          {trackInfo["title"]}
                      </Text>
                      <Text style = {[styles.textStyle, {marginTop: 5, fontSize: 10, fontWeight:'normal', color: 'gray'}]}>
                          {trackInfo["author"]}
                      </Text>
                    </View>
                  </View>
              </View>
            </View >
            {/* control bar */}
            <View style = {{flex: 4}}>
              <View style = {{flex: 1, backgroundColor: color.palette.gray1DP,  marginTop: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                {/* Play,Pause,Prev,next button */}
                <View style = {{flex: 3, flexDirection: 'row', marginTop: 30,
                alignItems: 'center'}}>
                    <TouchableOpacity onPress = {onPrevious}>  
                      <IconMaterial name = "skip-previous" size = {60} color = {color.palette.offWhite} style = {{marginLeft: 50, marginRight: 50}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {processPlayState}>  
                      <IconIonicons name = {isPlayingState ? "play" : "pause"} size = {60} color = {color.palette.offWhite}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {onNext}>    
                      <IconMaterial name = "skip-next" size = {60} color = {color.palette.offWhite} 
                      style = {{marginLeft: 50, marginRight: 50}}/>
                    </TouchableOpacity>  
                </View>
                {/* Progressbar */}
                <View style = {{flex: 2, flexDirection:'column', justifyContent: 'center'}}>
                    {/* Progresss */}
                    <View style = {{ height: 3 , backgroundColor: 'white', margin: 20}}  >
                    <Animated.View  style = {[{flex: 1}, {transform: [{translateX: pan}]}]}
                       {...panResponder.panHandlers} 
                    > 
                  
                    <View style = {{width: 10, height: 10, position: 'absolute', top: -4, zIndex: 2,
                      borderRadius: 5, backgroundColor: 'white'}}>
                  
                    </View>
                    </Animated.View>
                      {/* </Animated.View> */}
                    </View>
                
                    {/* Information on progress */}
                    <View>

                    </View>
                </View>
                {/* https://api.soundcloud.com/tracks/137422827/stream?clien_id=MS6eQWZ2N3pzqid7M5U6rpiwvPzYqaNF */}
                {/* Other features */}
             

                <View style = {{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                {/* <Video source={{uri: "https://zingmp3.vn/album/Top-100-Bai-Hat-Nhac-Tre-Hay-Nhat-Various-Artists/ZWZB969E.html"}}
                      //  ref="audio"
                       volume={1.0}
                       muted={false}
                       paused = {false}
                       onError = {(error) => {
                         console.log(error)
                       }}
                      //  paused={paused}
                       playInBackground={true}
                       playWhenInactive={true}
                      //  onProgress={this.onPlayProgress}
                      //  onEnd={this.onPlayEnd}
                       resizeMode="cover"
                       repeat={false}

                       /> */}
                    <TouchableOpacity onPress = {() => {
                        console.log(`On Repeat`)
                    }}>  
                    <IconIonicons name = "repeat-outline" size = {35} color = {color.palette.offWhite} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        console.log(`On Download Button`)
                    }}> 
                    <IconFeather name = "download" size = {30} color = {color.palette.offWhite} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        onShare()
                        console.log(`On Share`)
                    }}> 
                    <IconEntypo name = "share" size = {30} color = {color.palette.offWhite} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        setFavoriteColor(!favoriteColor)
                        console.log(`favoriteColor +${favoriteColor}`)
                      }}> 
                      <IconAwesome name = "heart" size = {30} color = {favoriteColor ? color.palette.orange : color.palette.offWhite} />
                    </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>          
        </View>
    </Screen>
  )
})
const styles = StyleSheet.create({
  container : {
     flex: 1,
     borderTopLeftRadius: 15,
     borderTopRightRadius: 15
  },
  header : {
    flex : 1.5,
    color: 'red',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  playerArea : {
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
    paddingLeft: 35,
    width: widthScreen,
    backgroundColor: color.palette.white,
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
