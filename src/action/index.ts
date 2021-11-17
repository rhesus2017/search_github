// interface
import { CardData, IssueData } from "../types";

// action
export const SEARCH_WORD = 'SEARCH_WORD' as const;
export const SEARCH_DATA = 'SEARCH_DATA' as const;
export const RESET_SEARCH_DATA = 'RESET_SEARCH_DATA' as const;
export const FAVORITE_DATA = 'FAVORITE_DATA' as const;
export const DATA_lOAD_TYPE = 'DATA_lOAD_TYPE' as const;
export const ISSUES_DATA = 'ISSUES_DATA' as const;
export const RESET_ISSUES_DATA = 'RESET_ISSUES_DATA' as const;


export function SearchWord(word: string) {
    return {
        type: SEARCH_WORD,
        payload: word
    }
}

export function SearchData(data: CardData[]) {
    return {
        type: SEARCH_DATA,
        payload: data
    }
}

export function ResetSearchData() {
    return {
        type: RESET_SEARCH_DATA
    }
}

export function FavoriteData(data: CardData[]) {
    return {
        type: FAVORITE_DATA,
        payload: data
    }
}

export function DataLoadType(type: string) {
    return {
        type: DATA_lOAD_TYPE,
        payload: type
    }
}

export function IssuesData(data: IssueData[]) {
    return {
        type: ISSUES_DATA,
        payload: data
    }
}

export function ResetIssuesData() {
    return {
        type: RESET_ISSUES_DATA
    }
}