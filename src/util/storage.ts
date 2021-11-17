// type
import { CardData } from "../types";

export const getStorage = (item: string): string | CardData[] => JSON.parse(window.localStorage.getItem(item) as string);
export const setStorage = (item: string, value: string | CardData[]): void => window.localStorage.setItem(item, JSON.stringify(value));