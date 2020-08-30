import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle,SafeAreaView } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models" 
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black12DP,
}

export const PlaylistScreen: Component = observer(function PlaylistScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <Text preset="header" tx="PlaylistScreen.header" />
    </Screen>
  )
})