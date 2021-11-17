// redux action
import { SEARCH_WORD, SEARCH_DATA, FAVORITE_DATA, RESET_SEARCH_DATA, DATA_lOAD_TYPE, ISSUES_DATA, RESET_ISSUES_DATA } from "../action";
import { combineReducers } from 'redux';

// type
import { CardData, IssueData } from './../types/index';

// util
import { getStorage } from '../util/storage';


let SearchWordInit: { word: string } = {
    word: getStorage('SearchWord') as string || ''
}
const SearchWord = (state = SearchWordInit, action: {type: typeof SEARCH_WORD, payload: string}) => {
    switch(action.type) {
        case SEARCH_WORD:
            return {
                ...state,
                word: action.payload
            };
        default:
            return state;
    }
}


let SearchDataInit: { data: CardData[], total_count: number} = {
    data: [],
    total_count: 0
};
const SearchData = (state = SearchDataInit, action: {type: typeof SEARCH_DATA | typeof RESET_SEARCH_DATA, payload: {items: CardData[], total_count: number} }) => {
    switch(action.type) {
        case SEARCH_DATA:
            return {
                ...state,
                data: [...state.data, ...action.payload.items], 
                total_count: action.payload.total_count
            };
        case RESET_SEARCH_DATA:
            return {
                ...state,
                data: [],
                total_count: 0
            };
        default:
            return state;
    }
}


let FavoriteDataInit: { data: CardData[] } = {
    data: getStorage('FavoriteData') as CardData[] || []
}
const FavoriteData = (state = FavoriteDataInit, action: {type: typeof FAVORITE_DATA, payload: CardData[]}) => {
    switch(action.type) {
        case FAVORITE_DATA:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

let DataLoadTypeInit: {type: string} = {
    type: 'click'
}
const DataLoadType = (state = DataLoadTypeInit, action: {type: typeof DATA_lOAD_TYPE, payload: string}) => {
    switch(action.type) {
        case DATA_lOAD_TYPE:
            return {
                ...state,
                type: action.payload
            };
        default:
            return state;
    }
}

let IssuesDataInit: {data: IssueData[]} = {
    data: []
}
const IssuesData = (state = IssuesDataInit, action: {type: typeof ISSUES_DATA | typeof RESET_ISSUES_DATA, payload: IssueData[]}) => {
    switch(action.type) {
        case ISSUES_DATA:
            return {
                ...state,
                data: [...state.data, ...action.payload].sort((x, y) => Number(new Date(y.created_at)) - Number(new Date(x.created_at)))
            };
        case RESET_ISSUES_DATA:
            return {
                ...state,
                data: []
            };
        default:
            return state;
    }
}

const ReducerApp = combineReducers({
    SearchWord, SearchData, FavoriteData, DataLoadType, IssuesData
});

export default ReducerApp;