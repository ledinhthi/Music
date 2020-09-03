import React,{useState, useRef, FunctionComponent as Component, useEffect} from "react"
import { observer } from "mobx-react-lite"
import { Animated, ViewStyle, Text, View, StyleSheet, Dimensions, Platform, ImageBackground,
  TextInput, Image, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, FlatList, PanResponder, Slider} from "react-native"
import { Screen, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import {heightDeviceScreen, widthDeviceScreen} from "../../utils/common/definition"
import {IconAwesome, IconEntypo, IconFeather, 
        IconIonicons, IconMaterial,IconOcticons} from "../../utils/common/definition"

export interface playerInfor {
    isPlayingState? : boolean,
    processPlayState?: any
}
export const MiniPlayer : Component =  observer(function MiniPlayer (prop : playerInfor) {

    const [favoriteColor, setFavoriteColor] = useState(false);
    const [isPlayingState, setPlayingState] = useState(false);
    
    useEffect(()=> {
        const isPlaying = prop.isPlayingState;
        setPlayingState(isPlaying)
    })

    return (    
        <View style = {styles.container}>
            <View style = {styles.itemContainer}>
                {/* Favorite Icon */}
                <View style = {styles.favoriteIcon}>
                {/* <TouchableOpacity onPress = {() => {
                        setFavoriteColor(!favoriteColor)
                        console.log(`favoriteColor +${favoriteColor}`)
                      }}> 
                      <IconAwesome name = {"heart"} size = {30} color = {favoriteColor ? color.palette.orange : color.palette.offWhite} />
                </TouchableOpacity> */}
                <View style = {{width:  50 , height : 50,  borderRadius: 25, backgroundColor: color.palette.offWhite }}>
                    
                </View>
               
                </View>
                {/* Content */}
                <View style = {styles.textContent}>
                    {/*  Song */}
                      <Text style = {[styles.textStyle, {fontWeight: '900', marginBottom: 2}]}>
                            Love you like you do
                      </Text>
                      {/* Author */}
                      <Text style = {[styles.textStyle, {fontSize: 15, color: color.palette.white70Percent}]}> 
                            Sharaha
                      </Text>
                </View>
                <View style = {styles.playerButton}>
                    <TouchableOpacity onPress = {prop.processPlayState}>  
                      <IconIonicons name = {isPlayingState ? "play" : "pause"} size = {40} color = {color.palette.offWhite}/>
                    </TouchableOpacity>
                </View>

                {/* Player */}
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,     
        backgroundColor: color.palette.gray16DP
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    favoriteIcon : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    textContent: {
        flex: 5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle : {
        color: color.palette.offWhite,
        fontSize: 18
    },
    playerButton: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 15,
    }
})