import React,{useState, useRef, FunctionComponent as Component, useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, View, StyleSheet, Dimensions, Platform, ImageBackground, Button} from "react-native"
import { Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

export const AlbumSongScreen: Component = observer(function AlbumSongScreen() {
  // Create state
  const [isChoseAlbum, setIsChoseAlbum] = useState(false);
  const [urlChoseAlbum, setUrlChoseAlbum] = useState("");
  // useEffect(() => {
  //   // get url image from chose Album
  //   console.log("useEffect")
  // })
  // Pull in one of our MST stores
  const rootStore = useStores();
  // console.log(`Store + ${rootStore}`)
  // Pull in navigation via hook
  const navigation = useNavigation();
  console.log(`navigation + ${navigation}`)
  return (
    <Screen style={ROOT} preset="fixed">
      {/* <Text preset="header" tx="HomeScreen" /> */}
      <View style = {styles.container}>
        <TouchableOpacity onPress = {()=> {
          navigation.goBack()
        }}>
           <Text>
             {"aaaaaaa"}
           </Text>
        </TouchableOpacity>
  
      </View>
      
    </Screen>
  )
})
const styles = StyleSheet.create({
  container : {
     flex: 1,
  },
  images: {
    flex: 1,
    resizeMode: "cover",
  }
})