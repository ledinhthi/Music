import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Text, Image, FlatList } from "react-native"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import { color } from "../../theme"
import {YouTubeStandaloneAndroid, YouTubeStandaloneIOS} from "react-native-youtube"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.bluePowder ,
}

export const VideoPlaylistScreen: Component = observer(function VideoPlaylistScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <View style= {{flex: 1, backgroundColor: 'red'}}>
        <Text>
            THiiiiiiiiiii
        </Text>
      </View>
      {/* <Text preset="header" tx="VideoPlaylistScreen.header" /> */}
    </Screen>
  )
})
