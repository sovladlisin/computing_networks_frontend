export const GET_LISTS = 'GET_LISTS'
export const CREATE_LIST = 'CREATE_LIST'
export const DELETE_LIST = 'DELETE_LIST'
export const UPDATE_LIST = 'UPDATE_LIST'

export const GET_SYSTEMS = 'GET_SYSTEMS'
export const CREATE_SYSTEM = 'CREATE_SYSTEM'
export const DELETE_SYSTEM = 'DELETE_SYSTEM'
export const UPDATE_SYSTEM = 'UPDATE_SYSTEM'

export const GET_PEOPLE = 'GET_PEOPLE'
export const CREATE_PERSON = 'CREATE_PERSON'
export const DELETE_PERSON = 'DELETE_PERSON'
export const UPDATE_PERSON = 'UPDATE_PERSON'

export const GET_MARKUP_SYSTEMS = 'GET_MARKUP_SYSTEMS'
export const CREATE_MARKUP_SYSTEM = 'CREATE_MARKUP_SYSTEM'
export const DELETE_MARKUP_SYSTEM = 'DELETE_MARKUP_SYSTEM'
export const UPDATE_MARKUP_SYSTEM = 'UPDATE_MARKUP_SYSTEM'

export const GET_MARKUP_PEOPLE = 'GET_MARKUP_PEOPLE'
export const CREATE_MARKUP_PERSON = 'CREATE_MARKUP_PERSON'
export const DELETE_MARKUP_PERSON = 'DELETE_MARKUP_PERSON'
export const UPDATE_MARKUP_PERSON = 'UPDATE_MARKUP_PERSON'

export type TList = {
    id?: number,
    master: number | null,
    name: string,
    text: string
}

export type TSystem = {
    id?: number,
    name: string,
    description: string
}

export type TPerson = {
    id?: number,
    name: string,
    description?: string
}

export type TMarkupSystem = {
    id?: number,
    start: number,
    end: number,
    list: number,
    system: number
}

export type TMarkupPerson = {
    id?: number,
    start: number,
    end: number,
    list: number,
    person: number
}


// --------------------------- LISTS

export interface IGetLists {
    type: typeof GET_LISTS
    payload: TList[]
}

export interface ICreateList {
    type: typeof CREATE_LIST
    payload: TList
}

export interface IUpdateList {
    type: typeof UPDATE_LIST
    payload: TList
}

export interface IDeleteList {
    type: typeof DELETE_LIST
    payload: number
}

// --------------------------- SYSTEMS

export interface IGetSystems {
    type: typeof GET_SYSTEMS
    payload: TSystem[]
}

export interface ICreateSystem {
    type: typeof CREATE_SYSTEM
    payload: TSystem
}

export interface IUpdateSystem {
    type: typeof UPDATE_SYSTEM
    payload: TSystem
}

export interface IDeleteSystem {
    type: typeof DELETE_SYSTEM
    payload: number
}

// --------------------------- People

export interface IGetPeople {
    type: typeof GET_PEOPLE
    payload: TPerson[]
}

export interface ICreatePerson {
    type: typeof CREATE_PERSON
    payload: TPerson
}

export interface IUpdatePerson {
    type: typeof UPDATE_PERSON
    payload: TPerson
}

export interface IDeletePerson {
    type: typeof DELETE_PERSON
    payload: number
}

// --------------------------- System markup

export interface IGetMarkupSystems {
    type: typeof GET_MARKUP_SYSTEMS
    payload: TMarkupSystem[]
}

export interface ICreateMarkupSystem {
    type: typeof CREATE_MARKUP_SYSTEM
    payload: TMarkupSystem
}

export interface IDeleteMarkupSystem {
    type: typeof DELETE_MARKUP_SYSTEM
    payload: number
}

// --------------------------- LISTS

export interface IGetMarkupPeople {
    type: typeof GET_MARKUP_PEOPLE
    payload: TMarkupPerson[]
}

export interface ICreateMarkupPerson {
    type: typeof CREATE_MARKUP_PERSON
    payload: TMarkupPerson
}


export interface IDeleteMarkupPerson {
    type: typeof DELETE_MARKUP_PERSON
    payload: number
}

export type modelsDispatchTypes = IGetLists | ICreateList | IUpdateList | IDeleteList | IGetSystems | ICreateSystem | IUpdateSystem | IDeleteSystem | IGetPeople | ICreatePerson | IUpdatePerson | IDeletePerson | IGetMarkupSystems | ICreateMarkupSystem | IDeleteMarkupSystem | IGetMarkupPeople | ICreateMarkupPerson | IDeleteMarkupPerson