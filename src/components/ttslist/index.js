import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import * as Speech from 'expo-speech';
import { useConfigContext } from '../../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TTSList() {
    const context = useConfigContext();
    const favoriteRef = useRef();
    const [data, setData] = useState([]);
    const [favoriteText, setFavoriteText] = useState("");
    const truncate = (input) => input && input.length > 30 ? `${input.substring(0, 30)}...` : input;
    
    async function getItens() {
        const itens = JSON.parse(await AsyncStorage.getItem("@ARRAYLIST"));

        if (itens) {
            setData(itens);
        } else {
            setData([])
        }
    }

    async function addFavorite() {
        if (favoriteText) {
            const item = { id: uuid.v4(), speak: favoriteText };
            const itens = JSON.parse(await AsyncStorage.getItem("@ARRAYLIST"));

            if (itens && itens.length > 0) {
                itens.push(item);
                await AsyncStorage.setItem("@ARRAYLIST", JSON.stringify(itens));
            } else {
                await AsyncStorage.setItem("@ARRAYLIST", JSON.stringify([item]));
            }
            getItens();
            setFavoriteText("");

            favoriteRef.current.blur()
        }
    }

    async function removeFavorite(favorite) {
        const itens = JSON.parse(await AsyncStorage.getItem("@ARRAYLIST"));
        if (itens && itens.length > 0) {
            const newList = itens.filter(i => i.id !== favorite.id);

            await AsyncStorage.setItem("@ARRAYLIST", JSON.stringify(newList));
            getItens();
        }
    }

    function changeText(text) {
        setFavoriteText(text);
    }

    async function speakFavorite(favorite) {
        try {
            Speech.stop();
            Speech.speak(favorite.speak, {language : context.language, pitch: eval(context.pitch), rate: eval(context.rate)})
        } catch (e) {
            console.log(e)
        }
    }

    function renderItem({ item }) {
        return (
            <TouchableHighlight underlayColor={"#rgba(0,0,0,0)"} onPress={e => speakFavorite(item)}>
                <View style={styles.listItem}>
                    <Text style={styles.textItem} numberOfLines={1} ellipsizeMode='clip'>{truncate(item.speak)}</Text>
                    <TouchableHighlight style={styles.btnRemoveTTS} onPress={e => removeFavorite(item)}>
                        <Feather style={styles.icon} name="trash" size={24} color="black" />
                    </TouchableHighlight>
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <View>
                    <Text style={styles.logoList}>Favoritos</Text>
                </View>
                <View style={styles.containerAddTSS}>
                    <TextInput ref={favoriteRef} value={favoriteText} onChangeText={changeText} style={styles.input} placeholder="Adicionar favorito" placeholderTextColor={"#444751"} multiline={false} />
                    <TouchableHighlight style={styles.btnAddNewTTS} onPress={addFavorite}>
                        <Ionicons style={styles.iconBtnAddNewTTS} name="add-outline" size={24} color="black" />
                    </TouchableHighlight>
                </View>
            </View>
            {data.length > 0 ? (<FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id} />) : <Text style={styles.infoMessage}>Não possui nenhum favorito</Text>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2d2f3a",
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: '15%',
        padding: 20,
        elevation: 3,
        flex: 1,
    },
    btnAddNewTTS: {
        backgroundColor: "#26d6f6",
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 45,
        height: 45
    },
    input: {
        flex:1,
        backgroundColor: "white",
        borderRadius: 15,
        paddingLeft: 25,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        fontFamily: "sans-serif",
        fontSize: 15,
        fontWeight: '400'
    },
    containerAddTSS: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBtnAddNewTTS: {
        color: "white"
    },
    containerLogo: {
        backgroundColor: '#444751',
        padding: 20,
        borderRadius: 15,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center'
    },
    logoList: {
        color: "white",
        fontFamily: 'sans-serif',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "left"
    },
    listItem: {
        backgroundColor: "#444751",
        borderRadius: 10,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginTop: 10,
        position: 'relative'
    },
    textItem:{
        color:'white',
        fontSize: 16,
        fontFamily: "sans-serif",
        fontWeight: '400'
    },
    icon: {
        color: "#B51F3B"
    },
    btnRemoveTTS: {
        backgroundColor: "white",
        width: 36,
        height: 36,
        borderRadius: 50,
        elevation: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: '5%'
    },
    infoMessage: {
        textAlign: "center",
        color: "#666",
        fontSize: 16,
        fontFamily: "sans-serif",
    }
})