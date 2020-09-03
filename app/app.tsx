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
import React, { useState, useEffect, useCallback, useRef,useMemo, FunctionComponent as Component } from "react"
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
import { RootStore, RootStoreProvider, setupRootStore, useStores } from "./models"
import {widthDeviceScreen, heightDeviceScreen} from  "./utils/common/definition"

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import { transform } from "@babel/core"
import { translate } from "./i18n"
import { onSnapshot } from "mobx-state-tree"
import { LoginScreen } from "./screens/LoginScreen/LoginScreen-screen"
import { observer } from "mobx-react-lite"
enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */

const App: Component<{}> = observer(() => {
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>()
  const [isLogin, setIsLogin] = useState(false);

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

 const customHeight = Platform.select({
  ios:  heightDeviceScreen - 70,
  android: heightDeviceScreen - 60 - 48
 })
    ;
  // Use panresponder for Player screen
  const pan = useRef(new Animated.Value(customHeight)).current;
  let   isMovedFromTop = useRef(false).current;
  let   lastPosition = useRef(customHeight).current;
  const [tempPosition, setTempPosition] = useState(lastPosition);
  const inputRef = useRef();
  pan.addListener((panValue) => {
    lastPosition = panValue.value;
    setTempPosition(panValue.value)
  })
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
  
        if (lastPosition == 0) {
          isMovedFromTop = true;
       }
       else if (lastPosition <= customHeight) {
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
       
        pan.setOffset(lastPosition)
        pan.setValue(0)
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
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
        
        if (isMovedFromTop) {
          //  bottomPosition = heightDeviceScreen - 60;
          lastPosition = customHeight
          setTempPosition(customHeight)
          pan.setValue(lastPosition)
        }
        else {
          lastPosition = 0
          setTempPosition(0)
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
  // const lastPositionRef = useCallback(node => {
  //   if (node !== null) {
  //     // lastPosition.
  //     console.log("node is not null")

  //   }
  // }, [lastPosition]);
  // const memoFunction = () => {
  //   console.log(lastPosition, "memo called");
  //   // Do something that will take a lot of processing ...
  // };
  // useMemo(memoFunction, [lastPosition]);
  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      try {
        const rootStore = await setupRootStore();
        if (rootStore != null) {
            // do nothing
        }
        setRootStore(rootStore)
      }
      catch (error) {
        console.log(`error + ${error}`)
      }
    })()
  
    return () => {
       console.log("Unmounted screen")
       pan.removeAllListeners();
    }
  },[inputRef])
  
  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null
  
  // otherwise, we're ready to render the app
  return (
   
    <RootStoreProvider value={rootStore}>
     {rootStore.Navigation.getIsLogin() ?
       <View style = {{flex: 1}}>
        <View style = {{flex: 1}}>
        <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets} >
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </SafeAreaProvider>
        </View>
        <Animated.View style = {[{flex: 1, borderTopLeftRadius: 15,
        borderTopRightRadius: 15, ...StyleSheet.absoluteFillObject}, {transform: [{translateY: pan}]}]}
        {...panResponder.panHandlers}>
          <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
              <Player  lastPosition = {tempPosition}/>      
          </SafeAreaProvider>
        </Animated.View>
        </View>
      : 
       <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
           <LoginScreen/>   
        </SafeAreaProvider>
      } 
    </RootStoreProvider>
  )
})

export default App
