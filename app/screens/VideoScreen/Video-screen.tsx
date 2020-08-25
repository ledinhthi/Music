import React,{useState, useRef, FunctionComponent as Component, useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Text, View, StyleSheet, Dimensions, Platform, ImageBackground,
        TextInput, Image, TouchableOpacity, Keyboard,
        TouchableWithoutFeedback, FlatList, KeyboardAvoidingView, RefreshControl, ColorPropType, ActivityIndicator,
       Alert, Modal} from "react-native"
import { Screen } from "../../components"
import { useNavigation, DrawerActions } from "@react-navigation/native"
import { useStores} from "../../models"
import { color } from "../../theme"
import Icon from "react-native-vector-icons/Feather"
import IconOcticons from "react-native-vector-icons/Octicons"
import Swipeout from "react-native-swipeout"
import { widthDeviceScreen, heightDeviceScreen } from "../../utils/common/definition"
import YouTube, {YouTubeStandaloneAndroid, YouTubeStandaloneIOS} from "react-native-youtube"
import { boolean } from "mobx-state-tree/dist/internal"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black12DP,
}
const widthScreen = Dimensions.get("screen").width;
const heightScreen = Dimensions.get("screen").height;


var DATA = [
  {
    nameAlbum: "My Songs adasdasdasasdasdaasdasdas",
    sourceImage: ""
  },
  {
    nameAlbum: "My Songs1",
    sourceImage: ""
  },
  {
    nameAlbum: "My Songs2dasdsadasdsaasdasdsadsa",
    sourceImage: ""
  },
  {
    nameAlbum: "My Songs3",
    sourceImage: ""
  },
  {
    nameAlbum: "My Songs2",
    sourceImage: ""
  },
  {
    nameAlbum: "My Songs3",
    sourceImage: ""
  }
]
const VideoItem = ({item}) => {
  const [videoId, setVideoId] = useState("")
  const [isShowYoutube, setShowYoutube] = useState(false)
  const url = item.snippet.thumbnails.default.url
  const VideoId = item.id.videoId
  console.log(`props.url + ${url}`)
  return (
    <TouchableOpacity onPress = {() => {
      setVideoId(VideoId)
      setShowYoutube(true)
    }}>
    { isShowYoutube === false ? <View style = {styles.videoContainer}>
      <View style = {{flex : 1}}>
        <Image style = {{
          height: heightDeviceScreen * 15 / 100,zIndex : 10,   width: widthDeviceScreen * 40 /100,  resizeMode: 'cover'}} 
         source = {{uri: url}}
        > 
        </Image>
      </View>
      <View style = {styles.titleContainer}>
        <Text style = {styles.textStyle}
        numberOfLines = {2}
        ellipsizeMode = "tail"
        >
              {item.snippet.title}
        </Text>
        <Text style = {styles.textStyle}
         numberOfLines = {2}
         ellipsizeMode = "tail">
              {item.snippet.description}
        </Text>
      </View>
    </View>
    :
    <View>
      <YouTube
        videoId= {videoId} // The YouTube video ID
        play = {true}
        fullscreen = {true}
        // play // control playback of video with true/false
        // fullscreen // control whether the video should play in fullscreen or inline
        // loop // control whether the video should loop when ended
        // onReady={}
        // onChangeState={e => this.setState({ status: e.state })}
        // onChangeQuality={e => this.setState({ quality: e.quality })}
        // onError={e => this.setState({ error: e.error })}
        style={{ alignSelf: 'stretch', height: 300 }}
      />
    </View> 
    }
    </TouchableOpacity>    
  )
}

export const VideoScreen: Component = observer(function VideoScreen() {
  // Pull in one of our MST stores
  const [youtubeData, setYoutubeData] = useState([]);
  const [keySearch, setKeySearch] = useState("")
  const [doneLoading, setDoneLoading] = useState(false)
  const textInputRef = useRef()
  // const [test, setData] = useState([]);
  // const []
  // OR
  // const rootStore = useStores()
  
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const fetchYoutubeApi = async () => {
    try {
        const data = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=songs&type=video&key=AIzaSyASjZ1jqf_RLPnssm1Ot_3SshfdqC2zNHU`)
        const json = await data.json();
        if (json != null) {
            console.log(`json22 + ${json.items}`)
            setYoutubeData(json.items);
            
        }
    }
    catch (e) {
      console.log(`Error ${e}`)
      Alert.alert("Error Getting Data!!")
    }
  } 
  // const fetchDataWithPromise = (value) => new Promise((resolve, reject) => {
  //    fetchYoutubeApiWithKey(value)
  // });
  const fetchYoutubeApiWithKey =  async (value) => {
    try {
        const data = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${value}&type=video&key=AIzaSyASjZ1jqf_RLPnssm1Ot_3SshfdqC2zNHU`)
        const json = await data.json();
        if (json != null) {
            console.log(`json22 + ${json.items}`)
            setYoutubeData(json.items);
            setDoneLoading(false)      
        }
    }
    catch (e) {
      console.log(`Error ${e}`)
      Alert.alert("Error Getting Data!!")
    }
  } 
  useEffect(() => {
      fetchYoutubeApi();
  }, [])
  useEffect(() => {
    console.log(`Re-render`)
  })
  
  const onChangeText = (text) => {
    setKeySearch(text)
    console.log(`text + ${text}`)
  }
  const onSubmit = () => {
    console.log(`keySearch + ${keySearch}`)
    textInputRef.current.clear()
    setDoneLoading(true)
    fetchYoutubeApiWithKey(keySearch)
  }
  const LoadingComponent = (prop) => {
    console.log(`loading ${prop.loading}`)
    const loading = prop.loading
    // setTimeout()
    return (
      <View style = {{width: 50, height: 50}}>
        <Modal
        visible={loading}
        transparent = {true}
        >
          <ActivityIndicator style = 
          {{flex: 1, ...StyleSheet.absoluteFillObject}}
          size = {"large"}
          
          />
        </Modal>
       </View>
    )
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <KeyboardAvoidingView style = {styles.container}>
      {/* <View > */}
      {/* Youtube api here */}
      {/* Item  */}
       
        <View style = {styles.header}>
            <IconOcticons size = {20}
                color = "#FFFFFF"
                name = "search"
                style = {{flex: 1, paddingLeft: 27, position: 'absolute'}}
            >
            </IconOcticons>
            <TextInput ref = {textInputRef}
            inlineImageLeft='search_icon' style = {styles.textInputStyle}
             placeholder = {"Search Here!!"}
             placeholderTextColor = {color.palette.white70Percent}
             onChangeText = {onChangeText}
             onSubmitEditing = {onSubmit}

             >                  
            </TextInput>
       </View>  

          <FlatList 
            showsHorizontalScrollIndicator = {false}
            style = {styles.content}
            // bounces = {true}
            data = {youtubeData}
            horizontal = {false}
            renderItem = {({item}) => (
              <VideoItem item = {item}/>
            )}
          />
       {doneLoading && <LoadingComponent loading = {doneLoading}/>
        }
      {/* </View> */}
      </KeyboardAvoidingView>
    </Screen>

  )
})
const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10
    },
    videoContainer: {
      width: widthDeviceScreen,
      height: heightDeviceScreen * 15 / 100,
      flexDirection :'row',
      marginVertical: 1
    },
 
    titleContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center'
    },
    textInputStyle: {
      height: 30,
      width: widthDeviceScreen,
      paddingLeft: 35,
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: color.palette.white, 
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      color: color.palette.offWhite
    },
    textStyle : {
      // flex: 1,
      color: color.palette.offWhite,
      fontSize: 18,
      marginTop : 5,
      marginRight: 20,
      // lineHeight: 18
   },
   header : {
    flex : 0.1,
    justifyContent : 'center'
  },
  content : {
    flex : 0.9,
    // marginTop: 10
  },
})
