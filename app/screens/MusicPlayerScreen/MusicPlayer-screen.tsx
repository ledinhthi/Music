import React,{useState, useRef, FunctionComponent as Component, useEffect} from "react"
import { observer } from "mobx-react-lite"
import { Animated, ViewStyle, Text, View, StyleSheet, Dimensions, Platform, ImageBackground,
  TextInput, Image, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, FlatList, PanResponder, Slider} from "react-native"
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


const ROOT: ViewStyle = {
  backgroundColor: color.palette.black12DP,
}
const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;



export const MusicPlayerScreen: Component = observer(function MusicPlayerScreen(props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  // Pull in navigation via hook
  const navigation = useNavigation();
  
  function onPressToSmallScreen () {
    // make small screen
     navigation.goBack()
    //  console.log(`${navigation.}`)
  }
  const parent = useRef(null);

  // create panResponsder to use pan for life cycle
  const pan = useRef(new Animated.Value(0)).current
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
    pan.addListener((value) => {  
        panLastPosition = value.value
    })
  // const [panOffsetX, setPanOffSetX] = useRef(new Animated.vale);
  const panResponder = useRef( 
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
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
        // Release slider pan
        // slider.flattenOffset();
      },
      // onPanResponderRelease: Animated.event([
      //   null,
      //   {dx: pan},
      // ]),
    })
  ).current;
    // slider
    const sliderResponder = useRef( 
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (event, gesture) => {
          // Progress bar
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
        // onPanResponderRelease: Animated.event([
        //   null,
        //   {dx: pan},
        // ]),
      })
    ).current;
  
  return (
    <Screen style={ROOT} preset="fixed">
            {/* Image backgorund */}
          <ImageBackground style = {styles.container} source = {{uri: "https://m.media-amazon.com/images/M/     MV5BMGU5YTRjMTUtZDU4Mi00NjFlLWExYTAtMjVkN2JmOTE1Y2Q2XkEyXkFqcGdeQXVyNjE0ODc0MDc@._V1_UY268_CR43,0,182,268_AL_.jpg"}}
          >
          {/* <Animated.View style = {[{flex: 1}, {transform: [{translateY: slider}]}]}
                       {...sliderResponder.panHandlers}> */}
          <View style = {{flex: 1}}>
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
                      {"Perfect"}
                  </Text>
                  <Text style = {[styles.textStyle, {marginTop: 5, fontSize: 15, fontWeight:'normal', color: 'gray'}]}>
                      {"Edsharen"}
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
                        source = {{uri: "https://m.media-amazon.com/images/M/MV5BMGU5YTRjMTUtZDU4Mi00NjFlLWExYTAtMjVkN2JmOTE1Y2Q2XkEyXkFqcGdeQXVyNjE0ODc0MDc@._V1_UY268_CR43,0,182,268_AL_.jpg"}}
                      >
                    </Image>
                    </View>
                    <View style = {{flex: 1, flexDirection: 'column', height: 50, marginLeft: 20, marginRight: 30, justifyContent: 'center'}}>
                        <Text style = {[styles.textStyle, {fontSize: 15}]}>
                          {"Perfect"}
                      </Text>
                      <Text style = {[styles.textStyle, {marginTop: 5, fontSize: 10, fontWeight:'normal', color: 'gray'}]}>
                          {"Edsharen"}
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
                    
                    <TouchableOpacity onPress = {() => {
                        console.log(`On Skip previous`)
                    }}>  
                      <IconMaterial name = "skip-previous" size = {60} color = {color.palette.offWhite} style = {{marginLeft: 50, marginRight: 50}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        console.log(`On play`)
                    }}>  
                      <IconIonicons name = "play" size = {60} color = {color.palette.offWhite}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        console.log(`On skip next`)
                    }}>    
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
                {/* Other features */}
                <View style = {{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <TouchableWithoutFeedback onPress = {() => {
                        console.log(`On Repeat`)
                    }}>  
                    <IconIonicons name = "repeat-outline" size = {35} color = {color.palette.offWhite} />
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress = {() => {
                        console.log(`On Share Button`)
                    }}> 
                    <IconFeather name = "download" size = {30} color = {color.palette.offWhite} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => {
                        console.log(`On download`)
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
        {/* </Animated.View>      */}
      </ImageBackground>
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
