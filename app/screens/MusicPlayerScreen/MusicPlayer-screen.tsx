import React,{useState, useRef, FunctionComponent as Component, useEffect} from "react"
import { observer } from "mobx-react-lite"
import { Animated, ViewStyle, Text, View, StyleSheet, Dimensions, Platform, ImageBackground,
  TextInput, Image, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, FlatList, PanResponder} from "react-native"
import { Screen, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import Icon from "react-native-vector-icons/Feather"
import IconIonicons from "react-native-vector-icons/Ionicons"
import IconOcticons from "react-native-vector-icons/Octicons"
import IconMaterial from "react-native-vector-icons/MaterialIcons"
import * as ProgressBar from "react-native-progress"


const ROOT: ViewStyle = {
  backgroundColor: color.palette.purple,
}
const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;

export const MusicPlayerScreen: Component = observer(function MusicPlayerScreen() {
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

  // create panResponsder
  const pan = useRef(new Animated.ValueXY()).current
  const panResponder = useRef(
    PanResponder.create({
     
      onPanResponderGrant: (event, gesture) => {
        console.log(`onPanResponderGrant event: ${event} + gesture : ${gesture}`)
        // pan.setOffset({
        //   x: pan.x,
        //   y: pan.y
        // });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
       
      ),
      onPanResponderRelease: (event, gesture) => {    
        console.log(`onRelease event: + ${event} + gesture : ${gesture}`)
        Animated.spring(
          pan, // Auto-multiplexed
          { toValue: { x: 0, y: 0 } } // Back to zero
        ).start();
      },
      
    })
  ).current;

  return (
    
    <Screen style={ROOT} preset="fixed">
      <View style = {styles.container}> 
            {/* Image backgorund */}
          {/* <ImageBackground>

          </ImageBackground> */}
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
              <View style = {{flex: 1, margin: 10, backgroundColor: color.palette.purple, borderRadius: 20}}>
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
              <View style = {{flex: 1, backgroundColor: color.palette.purple,  marginTop: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                {/* Play,Pause,Prev,next button */}
                <View style = {{flex: 3, flexDirection: 'row', marginTop: 30,
                alignItems: 'center'}}>
                    <IconMaterial name = "skip-previous" size = {60} color = {color.palette.offWhite} style = {{marginLeft: 50, marginRight: 50}}/>
                    <IconIonicons name = "play" size = {65} color = {color.palette.offWhite}/>
                    <IconMaterial name = "skip-next" size = {60} color = {color.palette.offWhite} style = {{marginLeft: 50, marginRight: 50}}/>
                </View>
                {/* Progressbar */}
                <View style = {{flex: 2, flexDirection:'column', justifyContent: 'center'}}>
                    {/* Progresss */}
                    <View style = {{ height: 3 , backgroundColor: 'white', margin: 20}}  >
                      {/* <Animated.View  style={{
                        transform: [{ translateX: pan.x, translateY: pan.y }]
                      }}
                       {...panResponder.panHandlers} > */}
                        <Animated.View   {...panResponder.panHandlers} style = {[pan.getLayout(), {width: 10, height: 10, position: 'absolute', top: -4, zIndex: 2, borderRadius: 5, backgroundColor: 'white'}
                        ]}
                   />
                      {/* </Animated.View> */}
                    </View>
                    {/* Information on progress */}
                    <View>

                    </View>
                </View>
                {/* Other features */}
                <View style = {{flex: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <IconIonicons name = "repeat-outline" size = {30} color = {color.palette.offWhite} />
                    <IconIonicons name = "play" size = {30} color = {color.palette.offWhite} />
                    <IconMaterial name = "skip-next" size = {30} color = {color.palette.offWhite} />
                    <IconMaterial name = "skip-next" size = {30} color = {color.palette.offWhite} />
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
     fontSize: 30,
     fontWeight: '800',
  },

  playlistStyle: {
     flex: 9,
     marginTop: 2
  }
})
