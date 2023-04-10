import { StringLiteral } from "typescript";

export type Post = {
    id: string;
    url: string;
    title: string;
    content: string; 
    createdat: StringLiteral;
    timestamp: string;
}

export type PostEmbedding = {
    id: string;
    url: string;
    title: string;
    content: string; 
    createdat: StringLiteral;
    timestamp: string;
    embedding: Number[];
}
