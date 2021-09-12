import React, { useState, useEffect } from 'react'
import { View, TouchableHighlight, TextInput, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient';
import { useConfigContext } from '../../contexts';

export default function TTS() {

    const [text, setText] = useState("")
    const context = useConfigContext()

    function changeText(text) {
        setText(text)
    }

    function clearText() {
        setText("")
    }

    async function SpeechText(e) {
        try {
            Speech.stop();
            Speech.speak(text, { language: context.language, pitch: eval(context.pitch), rate: eval(context.rate) })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <LinearGradient style={styles.container} colors={['#26d6f6', '#3797f6']} start={[0, 1]} end={[1, 0]}>
            <Feather onPress={clearText} style={styles.containerBtnRemoveText} name="trash" size={24} color="black" />
            <TextInput value={text} onChangeText={changeText} style={styles.input} multiline={true} placeholder="Digite o que deseja falar!" placeholderTextColor={"white"}  />
            <TouchableHighlight style={styles.containerBtn} onPress={SpeechText}>
                <View>
                    <Feather style={styles.icon} name="play" size={24} color="black" />
                </View>
            </TouchableHighlight>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#26d6f6",
        borderRadius: 15,
        marginRight: '5%',
        marginLeft: '5%',
        height: 150,
        padding: '5%',
        position: 'relative',
        elevation: 3,
    },
    input: {
        fontSize: 18,
        fontFamily: 'sans-serif',
        color: "white",
        padding: 5,
        height: 75,
        zIndex: 999998
    },
    containerBtn: {
        position: 'absolute',
        left: '50%',
        bottom: -25,
        borderRadius: 100,
        backgroundColor: '#eaf6ff',
        height: 48,
        width: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        shadowColor: "black",
        shadowRadius: 10,
        borderRadius: 20,
        elevation: 2,
        zIndex: 9999999
    },
    icon: {
        color: "#1d1e22"
    },
    containerBtnRemoveText: {
        position: 'absolute',
        right: 0,
        top: '10%',
        color: 'white',
        zIndex: 999999,
        width: 36,
        height: 36,
        borderRadius: 50
    }
});