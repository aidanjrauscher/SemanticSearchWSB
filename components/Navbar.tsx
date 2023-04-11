import Image from "next/image"
import Link from "next/link"
import {ArrowRight} from "tabler-icons-react"

export default function Navbar(){
    return (
        <div className="flex flex-row h-fit border-b border-reddit-black p-2 items-center bg-reddit-white justify-between flex-wrap">
            <div className="flex flex-row items-center gap-2">
                <Image src="/wsb.png" alt="WSB logo" width="40" height="40"/>
                <h1 className="text-reddit-black font-bold text-2xl sm:text-lg">Wall Street Bets Search</h1>
            </div>
            <div>
                <Link 
                    href="https://www.reddit.com/r/wallstreetbets/" 
                    className="font-semibold hover:scale-110 hover:text-reddit-orange flex flex-row gap-1 items-center">
                        r/wallstreetbets
                        <ArrowRight size="20"/>
                </Link>
            </div>
        </div>
    )
}