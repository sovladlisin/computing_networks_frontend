import { CREATE_MARKUP_PERSON, CREATE_MARKUP_SYSTEM, CREATE_PERSON, CREATE_SYSTEM, DELETE_MARKUP_PERSON, DELETE_MARKUP_SYSTEM, DELETE_PERSON, DELETE_SYSTEM, GET_LISTS, GET_MARKUP_PEOPLE, GET_MARKUP_SYSTEMS, GET_PEOPLE, GET_SYSTEMS, modelsDispatchTypes, TList, TMarkupPerson, TMarkupSystem, TPerson, TSystem } from "../actions/types"

interface IDefaultState {
    lists: TList[],
    people: TPerson[],
    systems: TSystem[],

    peopleMarkups: TMarkupPerson[],
    systemMarkups: TMarkupSystem[]
}
const defaultState: IDefaultState = {
    lists: [],
    people: [],
    systems: [],

    peopleMarkups: [],
    systemMarkups: []
}

const modelReducer = (state: IDefaultState = defaultState, action: modelsDispatchTypes): IDefaultState => {
    switch (action.type) {
        case GET_LISTS:
            return {
                ...state,
                lists: action.payload
            }
        case GET_PEOPLE:
            return {
                ...state,
                people: action.payload
            }
        case CREATE_PERSON:
            return {
                ...state,
                people: [...state.people, action.payload]
            }
        case DELETE_PERSON:
            return {
                ...state,
                people: state.people.filter(p => p.id != action.payload)
            }
        case GET_SYSTEMS:
            return {
                ...state,
                systems: action.payload
            }
        case CREATE_SYSTEM:
            return {
                ...state,
                systems: [...state.systems, action.payload]
            }
        case DELETE_SYSTEM:
            return {
                ...state,
                systems: state.systems.filter(s => s.id != action.payload)
            }
        case GET_MARKUP_PEOPLE:
            return {
                ...state,
                peopleMarkups: action.payload
            }
        case CREATE_MARKUP_PERSON:
            return {
                ...state,
                peopleMarkups: [...state.peopleMarkups, action.payload]
            }
        case DELETE_MARKUP_PERSON:
            return {
                ...state,
                peopleMarkups: state.peopleMarkups.filter(p => p.id != action.payload)
            }

        case GET_MARKUP_SYSTEMS:
            return {
                ...state,
                systemMarkups: action.payload
            }
        case CREATE_MARKUP_SYSTEM:
            return {
                ...state,
                systemMarkups: [...state.systemMarkups, action.payload]
            }
        case DELETE_MARKUP_SYSTEM:
            return {
                ...state,
                systemMarkups: state.systemMarkups.filter(p => p.id != action.payload)
            }

        default:
            return state;
    }
}

export default modelReducer