import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Dimensions, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from "react-native"
import { Screen, Text, TextField, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
// import { color } from "../../theme"
import { color } from "../../theme/color"
import { heightDeviceScreen, widthDeviceScreen } from "../../utils/common/definition"



const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const LoginScreen: Component = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  const rootStore = useStores()
  
  // Pull in navigation via hook
  // const navigation = useNavigation()

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
        <TextField style = {{width: widthDeviceScreen * 70 / 100, height: heightDeviceScreen * 15 / 100, marginLeft: widthDeviceScreen * 15 / 100
        , marginRight: widthDeviceScreen * 15 / 100, marginTop: heightDeviceScreen* 7 / 100}} labelTx = {"Username"} inputStyle = {{color: color.palette.offWhite }} />
        <TextField style = {{width: widthDeviceScreen * 70 / 100, height: heightDeviceScreen * 15 / 100, marginLeft: widthDeviceScreen * 15 / 100
        , marginRight: widthDeviceScreen * 15 / 100, marginTop: -heightDeviceScreen* 7/ 100}} labelTx = {"Password"} inputStyle = {{color: color.palette.offWhite }}
        />
        <Button textStyle = {{color: color.palette.gray08DP, fontSize : 18}} text = {"Đăng nhập"} style = {{width: widthDeviceScreen * 40 / 100, height: heightDeviceScreen * 5 / 100, 
           backgroundColor: "blue", marginTop: -heightDeviceScreen* 3/ 100, alignSelf: 'center'}}
           onPress = {() => {
              if (rootStore != null) {
                rootStore.Navigation.setIsLogin("isLogin", true)
              } 
           }}>

        </Button>
        </View>
        </TouchableWithoutFeedback>
        </View>
    </Screen>
  )
})
