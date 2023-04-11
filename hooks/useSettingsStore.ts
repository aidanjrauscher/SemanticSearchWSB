import { time } from "console";
import {create} from "zustand"

export interface SettingsStoreInterface{
    showSettings: Boolean;
    openSettings: ()=>void;
    closeSettings: ()=>void;
    startTimestamp: string;
    updateStartTimestamp: (timestamp: string)=>void;
    endTimestamp: string;
    updateEndTimestamp: (timestamp: string)=>void;
}

const useSettingsStore = create<SettingsStoreInterface>((set)=>({
    showSettings: false,
    openSettings: ()=>set({showSettings: true}),
    closeSettings: ()=>set({showSettings: false}),
    startTimestamp: "",
    updateStartTimestamp: (timestamp)=>set({startTimestamp: timestamp}),
    endTimestamp: "",
    updateEndTimestamp: (timestamp)=>set({endTimestamp: timestamp}),
})) 


export default useSettingsStore