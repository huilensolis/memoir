import type { JSONContent } from "@tiptap/react";

export type TParsedEntry = {
    title: string;
    content: JSONContent;
    word_count: number;
};

export type TRawEntry = {
    id: string;
    data: string
    iv: string
    created_at: string;
    updated_at: string;
    end_date: string | null;
}

export type TNewEntry = Pick<TRawEntry, "data" | "iv">;
