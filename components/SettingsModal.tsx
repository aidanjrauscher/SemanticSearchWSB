import useSettingsStore from "@/hooks/useSettingsStore"

export default function SettingsModal(){

    const {
        showSettings,
        closeSettings, 
        startTimestamp, 
        updateStartTimestamp, 
        endTimestamp, 
        updateEndTimestamp
    } = useSettingsStore()

    const handleClear = ()=>{
        updateStartTimestamp("")
        updateEndTimestamp("")
    }

    const handleSave = ()=>{
        closeSettings()
    }

    return (
        <div 
            className={`${showSettings ? "display" : "hidden"} 
            bg-reddit-black bg-opacity-90 fixed inset-0 z-50 flex justify-center items-center`}
        >
            <div className="h-min w-min bg-reddit-gray-dark rounded-md flex flex-col gap-2 items-center p-4">
                <h1 className="text-reddit-black font-semibold text-xl md:text-3xl">Settings</h1>
                <hr className="border-reddit-black border-1 w-10/12 rounded-full"></hr>
                <div className="flex flex-col wrap gap-1 p-2">
                    <h3 className="text-reddit-black font-semibold text-md md:text-xl">From</h3>
                    <input 
                        value={startTimestamp}
                        onChange={(e)=>updateStartTimestamp(e.target.value)}
                        type="date"
                        className="rounded-sm sm:min-w-[12] md:w-[16vw]"
                    />
                </div>
                <div className="flex flex-col wrap gap-1 p-2">
                    <h3 className="text-reddit-black font-semibold text-md md:text-xl">To</h3>
                    <input 
                        value={endTimestamp}
                        onChange={(e)=>updateEndTimestamp(e.target.value)}
                        type="date"
                        className="rounded-sm sm:min-w-[12] md:w-[16vw]"
                    />
                </div>
                <div className="flex flex-row gap-1 justify-center p-4 flex-wrap">
                    <button 
                        onClick={closeSettings}
                        className="text-reddit-white bg-reddit-blue rounded-full px-6 py-1 shadow-reddit-black shadow hover:shadow-none hover:opacity-75 "
                    >
                        Close
                    </button>
                    <button 
                        onClick={handleClear}
                        className="text-reddit-white bg-reddit-orange rounded-full px-6 py-1 shadow-reddit-black shadow hover:shadow-none hover:opacity-75"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    )
}