import React from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from '../../components/header'
import TTS  from '../../components/tts'
import TTSList from '../../components/ttslist'

export default function Home({ navigation }){
    return (
        <View style={styles.page}>
            <StatusBar style="light" />
            <Header hideConfiguration={false} navigation={navigation}/>
            <TTS/>
            <TTSList/>
        </View>
    )
}

const styles = StyleSheet.create({
    page:{
        flex:1,
        display: 'flex',
        backgroundColor: "#1d1e22"
    }
});