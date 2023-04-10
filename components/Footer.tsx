import Link from "next/link";
import { BrandGithub, BrandTwitter } from "tabler-icons-react";

export default function Footer(){
    return (
        <div className="flex flex-row mt-auto h-12 border-t border-reddit-black bg-reddit-white items-center p-2 justify-between">
            <p className="text-reddit-black text-xl sm:text-lg  font-semibold">
                Built by <Link 
                    href="https://aidanjrauscher.notion.site/"
                    className="italic hover:underline hover:scale-110"
                >
                    
                    aidan
                </Link>
            </p>
            <div className="flex flex-row wrap gap-2">
                <Link href="https://github.com/aidanjrauscher">
                    <BrandGithub 
                        className="hover:scale-110 hover:opacity-75 hover:cursor-pointer" 

                    />
                </Link>
                <Link href="https://twitter.com/aidanjrauscher">
                    <BrandTwitter
                        className="hover:scale-110 hover:opacity-75 hover:cursor-pointer" 
                    />
                </Link>
            </div>
        </div>
    )
}