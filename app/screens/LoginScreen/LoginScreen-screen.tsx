import React, { FunctionComponent as Component, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Dimensions, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, 
  TextInput, StyleSheet, Alert, Modal } from "react-native"
import { Screen, Text, TextField, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
// import { color } from "../../theme"
import { color } from "../../theme/color"
import { heightDeviceScreen, widthDeviceScreen } from "../../utils/common/definition"
import NetInfo from "@react-native-community/netinfo"
import * as Progress from "react-native-progress"
import {firebase} from "../../config/firebase"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

const TIME_OUT = 10000;
const ShowAlert = (title, message) => {
  Alert.alert(title, message,
  [
    {
      text: "OK"
    },
    {
      style : "cancel",
      text: "Cancel"
    }
  ])
}

export const LoginScreen: Component = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  let onlineSongs : any
  let isOnline : Boolean = false
  const rootStore = useStores()
  const [isLoginWithState, setIsLoginWithState] = useState(false)
  // Pull in navigation via hook
  // const navigation = useNavigation()
  // NetInfo
  const subScribe = () =>  {
    NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    if (!state.isConnected) {
        isOnline = false
        ShowAlert("Thông báo!!", "Kiểm tra lại kết nối mạng")
        setTimeout(() => {
          console.log("OK")
          setIsLoginWithState(false)
          ShowAlert("Kiểm tra", "Thông tin đăng nhập!!")
        }, TIME_OUT)
    }
    else {
      isOnline = true
    }
  })};
  useEffect (() => {
    subScribe()
    return () => {
      console.log('Unmounted login')
    }
  }, [])
  const signInFireBase = () => {
    if (isOnline) {
        firebase.auth()
        .signInWithEmailAndPassword("ledinhthi11@gmail.com", "dananhchi1")
        .then((response) => {
            console.log("response", response)
            const usersRef = firebase.firestore().collection('Music')
            usersRef
                .doc("MusicPlaylist")
                .get()
                .then((data) => {
                  if (data != null) {
                    onlineSongs = data.data().Playlists;
                    if (rootStore != null) {
                      rootStore.Playlist.setListAlbum(onlineSongs)
                      setIsLoginWithState(false)
                      rootStore.Navigation.setIsLogin("isLogin", true)
                    }
                    else {
                      console.log("rootStore is null can not setData")
                    }
                  }
                })
                .catch((error) => {
                  console.log(error)
                });
        })
        .catch((Error) => {
            Alert.alert("Signin Error", Error)
        })
      }
} 
  return (
    <Screen style={ROOT} preset="fixed">
        <View style ={{flex: 1}}>
        <TouchableWithoutFeedback onPress = {() => {
          Keyboard.dismiss()
      }}>
         <View style ={{flex: 1}}>
        <Image style = {{width: widthDeviceScreen * 35 / 100, height: heightDeviceScreen * 15 / 100, marginLeft: widthDeviceScreen * 32.5 / 100,
           marginRight:  widthDeviceScreen * 32.5 / 100, marginTop: heightDeviceScreen* 10 / 100, borderRadius: 10, resizeMode: 'contain', aspectRatio: 1}}

           source = {require("../../../assets/images/song.png")}>
        </Image> 
        <TextInput style = {{width: widthDeviceScreen * 70 / 100, height: heightDeviceScreen * 6 / 100, marginLeft: widthDeviceScreen * 15 / 100, borderRadius: 20
        , marginRight: widthDeviceScreen * 15 / 100, paddingLeft: 10, marginTop: heightDeviceScreen* 7 / 100, backgroundColor: color.palette.gray16DP, color: color.palette.offWhite,
        }} placeholder = {"Username"}  placeholderTextColor = {color.palette.lighterGrey}
         />
        <TextInput style = {{width: widthDeviceScreen * 70 / 100, height: heightDeviceScreen * 6 / 100, marginLeft: widthDeviceScreen * 15 / 100, borderRadius: 20
        , marginRight: widthDeviceScreen * 15 / 100, paddingLeft: 10, marginTop: heightDeviceScreen* 3/ 100, backgroundColor: color.palette.gray16DP, color: color.palette.offWhite}} 
        secureTextEntry = {true} placeholder = {"Password"} placeholderTextColor = {color.palette.lighterGrey} 
        />
        <Button textStyle = {{color: color.palette.purple, fontSize : 18}} text = {"Đăng nhập"} style = {{width: widthDeviceScreen * 40 / 100, height: heightDeviceScreen * 6 / 100, 
           backgroundColor: "blue", marginTop: heightDeviceScreen* 4 / 100, alignSelf: 'center', borderRadius: 20}}
           onPress = {() => {
              if (rootStore != null) {
                setIsLoginWithState(true)
                signInFireBase()                
              } 
           }}>
        </Button>
        {isLoginWithState &&
          <Progress.CircleSnail  color = {['red', 'green', 'blue']} size = {55} thickness = {5} duration = {1000} 
          style = {{justifyContent: 'center' ,alignItems: 'center', ...StyleSheet.absoluteFillObject}} >
          </Progress.CircleSnail>
        }
        </View>
        </TouchableWithoutFeedback>
        </View>
    </Screen>
  )
})
