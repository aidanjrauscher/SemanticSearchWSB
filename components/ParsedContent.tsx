import Link from "next/link";
import React from "react";


interface ParsedContentProps {
  text: string;
}

export default function ParsedContent({text}: ParsedContentProps){
  const linkRegex = /(\[.*?\]\(.*?\))/g
  const matchRegex = /\[(.*?)\]\((.*?)\)/
  
  // split the text into an array of strings and components
  const parts = text.split(linkRegex);
  const result: React.ReactNode[] = [];
  // iterate over the array, rendering each item as a string or a Next.js link
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    if (matchRegex.test(part)) {
      // if the part matches the link regex, render it as a Next.js link
      const match = matchRegex.exec(part) || ""
      const text = match[1];
      const href = match[2];
      result.push(
        <Link 
          href={href} 
          key={i}
          rel="noopener noreferrer" 
          target="_blank"
          className="text-reddit-yellow underline hover:cursor-pointer "
        >
          {text}
        </Link>
      );
      linkRegex.lastIndex = 0;
    } else {
      // remove zero-width space character code
      part = part.replace(/&#x200B;/g, "")
      //remo
      result.push(part);
    }
  }
  // return the result as a single React element
  return <p>{result}</p>;
}