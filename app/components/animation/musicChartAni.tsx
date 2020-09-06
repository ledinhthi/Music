import React, {Component, useState, useRef, useEffect} from 'react'
import {View, Animated, StyleSheet, Easing} from 'react-native'

export function  MusicChartAnimation (prop) {
    const [size, setSize] = useState({
        width: 0,
        height: 0
    });
    const xHeight = new Animated.Value(0);
    const yHeight = new Animated.Value(0);
    const zHeight = new Animated.Value(0);
    const stopAnimation = () => {
        Animated.sequence ([
            Animated.timing(xHeight, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear
            }),
            Animated.timing(yHeight, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear
            }),
            Animated.timing(zHeight, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear
            })
        ]).stop()
    }
  
    const animationUp = () => {
        Animated.sequence ([
            Animated.timing(xHeight, {
                toValue: 15,
                duration: 100,
                easing: Easing.linear
            }),
            Animated.timing(yHeight, {
                toValue: 30,
                duration: 100,
                easing: Easing.linear
            }),
            Animated.timing(zHeight, {
                toValue: 15,
                duration: 100,
                easing: Easing.linear
            })
        ]).start(() => {
            animationBack()
        })
    }
    const animationBack = () => {
        Animated.sequence ([
            Animated.timing(xHeight, {
                toValue: 25,
                duration: 100,
                easing: Easing.linear
            }),
            Animated.timing(yHeight, {
                toValue: 15,
                duration: 100,
                easing: Easing.linear
            }),
            Animated.timing(zHeight, {
                toValue: 10,
                duration: 100,
                easing: Easing.linear
            })
        ]).start(() => {
            animationUp()
        })
    }
    useEffect (() => {
        console.log("OnChartAni")
        if (prop.isChose) {
            animationUp();
        }
    })
    useEffect (() => {
     return () => {
      console.log("unmounted")
      stopAnimation();
         }
    }, [])
    return (
        <View style = {{width: prop.style.width, height: prop.style.height, ...StyleSheet.absoluteFillObject}}>
            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', paddingLeft: 10 }} >
                {/* X */}
                <Animated.View style = {{width: prop.style.width * 20 / 100, height: xHeight, backgroundColor: "white", marginRight: 3}}>
                </Animated.View>
                {/* Y */}
                <Animated.View style = {{width: prop.style.width * 20 / 100, height: yHeight, backgroundColor: "white", marginRight: 3}}>
                </Animated.View>
                {/* Z */}
                <Animated.View style = {{width: prop.style.width * 20 / 100, height: zHeight, backgroundColor: "white"}}>
                </Animated.View>
            </View>
        </View>
    )
}