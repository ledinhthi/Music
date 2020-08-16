/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app or storybook.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect, useRef, FunctionComponent as Component } from "react"
import {View, Dimensions, StyleSheet, PanResponder, Animated, StatusBar, Platform} from "react-native"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context"
import * as storage from "./utils/storage"
import {Player} from "./navigation/primary-navigator"
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigation"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import {widthDeviceScreen, heightDeviceScreen} from  "./utils/common/definition"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import { transform } from "@babel/core"
import { translate } from "./i18n"
import { onSnapshot } from "mobx-state-tree"
enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */

const App: Component<{}> = () => {
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>()
  
  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )
  // Use panresponder for Player screen
  const pan = useRef(new Animated.Value(0)).current;
  let   isMovedFromTop = useRef(false).current;
  let   lastPosition = useRef(0).current;
  const inputRef = useRef(null);
  pan.addListener((panValue) => {
    lastPosition = panValue.value;
    console.log(`panValue.value : ${lastPosition} `)
  })
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        console.log(`onMoveShouldSetPanResponder gestureState.dy ${gestureState.dy} + gestureState.moveY ${gestureState.moveY}`)
        if (lastPosition == 0) {
          isMovedFromTop = true;
       }
       else if (lastPosition <= heightDeviceScreen - 60) {
          isMovedFromTop = false;
       }
        if ((isMovedFromTop && gestureState.dy < 10)) {
              return false
        }
        if (!isMovedFromTop &&  (-10 <= gestureState.dy  && gestureState.dy <= 10))
        {
          return false
        }
        return true
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => 
        false,

      onPanResponderGrant: (evt, gestureState) => {
        console.log(`PanResponderGrant ${gestureState.dy} + lastposition ${lastPosition}`)
        pan.setOffset(lastPosition)
        pan.setValue(0)
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log(`moveY : ${gestureState.moveY} dy: ${gestureState.dy} y0: ${gestureState.y0}`)
        // if (gestureState.moveY < 300) {
        //   return false;
        // }
        // else if ( gestureState.moveY > heightDeviceScreen - 60) {
        //   return false;
        // }
        // else {
         
        // }
        if (isMovedFromTop && (gestureState.dy < 0)) {
            return false;
        }
        else if ((!isMovedFromTop) && (gestureState.dy > 0)) {
            return false;
        }
        pan.setValue(gestureState.dy)
      },

      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        console.log(`onReleased GestureState.dy ${gestureState.dy} + GestureState.moveY + ${gestureState.moveY}`)
        if (isMovedFromTop) {
          //  bottomPosition = heightDeviceScreen - 60;
          lastPosition = heightDeviceScreen - 60
          pan.setValue(lastPosition)
        }
        else {
          lastPosition = 0
          pan.setOffset(lastPosition)
          pan.setValue(lastPosition)
        }
        pan.flattenOffset()
      },
      onPanResponderTerminate: (evt, gestureEvent)  => {
         true
      }
    })
  ).current
  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)
    })()
    const width = Dimensions.get("window").width
    const height = Dimensions.get("window").height
    const widthScreen = Dimensions.get("screen").width
    const heightScreen = Dimensions.get("screen").height
    console.log(`widthScreenWindow : ${width} + heightScreenWindow : ${height} + widthScreenScreen : ${widthScreen} + heightScreenScreen : ${heightScreen}`)
    inputRef.current.onShare
    return () => {
       console.log("Unmounted screen")
       pan.removeAllListeners();
    }
  },[lastPosition])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <View style = {{flex: 1}}>
      <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets} >
        <RootNavigator
          ref={navigationRef}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      </SafeAreaProvider>
      </View>
      <Animated.View style = {[{flex: 1, ...StyleSheet.absoluteFillObject}, {transform: [{translateY: pan}]}]}
       {...panResponder.panHandlers}>
        <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
            <Player ref = {inputRef}/>      
        </SafeAreaProvider>
      </Animated.View>
    </RootStoreProvider>
  )
}

export default App
