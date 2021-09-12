import React, { useState, useEffect, createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ConfigContext = createContext({ language: 'pt-BR', rate: '1', pitch: '1', setConfiguration : null, loadConfiguration: null});

export function ConfigProvider({children}) {

    const [data, setData] = useState({ language: 'pt-BR', rate: '1', pitch: '1'  });

    useEffect(() => {
        loadConfiguration();
    }, [])

    async function setConfiguration(data) {
        await AsyncStorage.setItem("@Configuration", JSON.stringify(data));
        setData(data)
    }

    async function loadConfiguration() {
        const item = JSON.parse(await AsyncStorage.getItem("@Configuration"));
        if (item) {
            setData({...item})
        } else {
            setData({...data})
        }
    }

    return <ConfigContext.Provider value={{ ...data, setConfiguration, loadConfiguration }}>{children}</ConfigContext.Provider>
}

export function useConfigContext(){
    const context = useContext(ConfigContext);

    return context;
}