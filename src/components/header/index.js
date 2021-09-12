import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';


export default function Header({ navigation, hideConfiguration }) {
    return (
        <View style={styles.page}>
            <View style={styles.containerLogo}>
                <SimpleLineIcons style={styles.icon} name="volume-2" size={24} color="black" />
                <Text style={styles.logo}>Fala Comigo!</Text>
            </View>
            {hideConfiguration === true ? (null) : (
                <TouchableHighlight underlayColor={"#"} onPress={() => navigation.navigate('Configuration')} >
                    <View style={styles.containerConfiguration}>
                        <SimpleLineIcons style={styles.iconConfiguration} name="settings" size={24} color="black" />
                    </View>
                </TouchableHighlight>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '16%',
    },
    containerLogo: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: "5%"
    },
    containerConfiguration: {
        marginRight: "5%",
        backgroundColor: "white",
        borderRadius: 50,
        width: 36,
        height: 36,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'sans-serif'
    },
    icon: {
        marginRight: 10,
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    iconConfoguration: {
        fontSize: 24,
        color: '#1d1e22',
        fontWeight: 'bold',
    }
})