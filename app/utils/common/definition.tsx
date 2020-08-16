import {Dimensions, Platform} from 'react-native'
import React,{useState, useRef, FunctionComponent as Component, useEffect} from "react"
import IconFt from "react-native-vector-icons/Feather"
import IconIon from "react-native-vector-icons/Ionicons"
import IconOct from "react-native-vector-icons/Octicons"
import IconMat from "react-native-vector-icons/MaterialIcons"
import IconAwe from "react-native-vector-icons/FontAwesome"
import IconEnt from "react-native-vector-icons/Entypo"

export const widthDeviceScreen = Platform.select({
    ios: Dimensions.get('screen').width,
    android: Dimensions.get('window').width
})
export const heightDeviceScreen = Platform.select({
    ios: Dimensions.get('screen').height,
    android: Dimensions.get('window').height
})

export const IconFeather = (props) => {
    const name = props.name;
    const size = props.size;
    const color = props.color;
    const styles = props.styles;
    return (
        <IconFt style = {{flex : 1}} name = {name} color = {color} size = {size}/>
    )
}
export const IconIonicons = (props) => {
    const name = props.name;
    const size = props.size;
    const color = props.color;
    const styles = props.styles;
    return (
        <IconIon style = {styles} name = {name} color = {color} size = {size}/>
    )
}
export const IconOcticons = (props) => {
    const name  = props.name;
    const size = props.size;
    const color = props.color;
    const styles = props.styles;
    return (
        <IconOct style = {styles} name = {name} color = {color} size = {size}/>
    )
}
export const IconMaterial = (props) => {
    const name = props.name;
    const size = props.size;
    const color = props.color;
    const styles = props.styles;
    return (
        <IconMat style = {styles} name = {name} color = {color} size = {size}/>
    )
}
export const IconAwesome = (props) => {
    const name = props.name;
    const size = props.size;
    const color = props.color;
    const styles = props.styles;
    return (
        <IconAwe style = {styles} name = {name} color = {color} size = {size}/>
    )
}
export const IconEntypo = (props) => {
    const name = props.name;
    const size = props.size;
    const color = props.color;
    const styles = props.styles;
    return (
        <IconEnt style = {styles} name = {name} color = {color} size = {size}/>
    )
}