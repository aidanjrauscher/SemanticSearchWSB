import {create} from "zustand"

export interface SettingsStoreInterface{
    apiKey: string;
    updateApiKey: (apiKey:string)=>void;
    showSettings: Boolean;
    openSettings: ()=>void;
    closeSettings: ()=>void;
}

const useSettingsStore = create<SettingsStoreInterface>((set)=>({
    apiKey: "",
    updateApiKey: (apiKey)=>set({apiKey: apiKey}),
    showSettings: false,
    openSettings: ()=>set({showSettings: true}),
    closeSettings: ()=>set({showSettings: false})
})) 


export default useSettingsStore