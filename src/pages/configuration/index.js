import React, { useState, useEffect, useContext} from 'react'
import { View, StyleSheet, TextInput, Text, TouchableHighlight, Alert} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from '../../components/header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { useConfigContext } from '../../contexts';

export default function Configuration({ navigation }) {

    const context = useConfigContext();
    const [data, setData] = useState({ pitch: context.pitch, rate: context.rate, language: context.language });

    async function saveConfiguration(){
        context.setConfiguration(data);
        Alert.alert(
            "Sucesso",
            "Configurações salvas com sucesso!")
    }

    function onChangeText(text, value){
        setData({...data, [value] : text})
    }

    return (
        <View style={styles.page}>
            <StatusBar style="light" />
            <Header navigation={navigation} hideConfiguration={true} />
            <View style={styles.container}>
                <Text style={styles.label}>Língua:</Text>
                <TextInput onChangeText={e => onChangeText(e, "language")} value={data.language} style={styles.input} multiline={false} placeholder="Informe a língua" />
                <Text style={styles.label}>Valocidade da pronúncia:</Text>
                <TextInput onChangeText={e => onChangeText(e, "rate")} value={data.rate} style={styles.input} keyboardType='numeric' maxLength={3} multiline={false} placeholder="Informe a velocidade de pronuncia" />
                <Text style={styles.label}>Tom de voz:</Text>
                <TextInput onChangeText={e => onChangeText(e, "pitch")} value={data.pitch} style={styles.input} keyboardType='numeric' maxLength={3} multiline={false} placeholder="Informe o tom de voz" />

                <Text style={styles.label}>Desenvolvedor:</Text>
                <Text style={styles.label}>Gabriel Maia - gabriel_more@hotmail.com</Text>
                <Text style={styles.label}>Versão</Text>
                <Text style={styles.label}>1.0.2</Text>

                <TouchableHighlight onPress={saveConfiguration} underlayColor={""} style={styles.btnSave}>
                    <View style={styles.btnContainer}>
                        <AntDesign style={styles.icon} name="save" size={24} color="black" />
                        <Text style={styles.textBtn}>Salvar</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        display: 'flex',
        backgroundColor: "#1d1e22"
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: 35
    },
    label: {
        color:'white',
        marginTop: 10,
        fontFamily: 'sans-serif',
        fontSize: 14,
        fontWeight: 'bold'
    },
    input: {
        marginTop: 10,
        backgroundColor: "white",
        height: 45,
        width: '100%',
        borderRadius: 15,
        padding: 5,
        paddingLeft: 15,
        fontFamily: "sans-serif",
        color: "#666"
    },
    btnContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },  
    btnSave: {
        backgroundColor: '#26d6f6',
        width: '100%',
        height: 45,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    textBtn:{
        fontSize: 16,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 5   
    },
    icon: {
        fontSize: 24,
        color: "white"
    }
});