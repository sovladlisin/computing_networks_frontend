import { Dispatch } from "react";
import { CREATE_MARKUP_PERSON, CREATE_MARKUP_SYSTEM, CREATE_PERSON, CREATE_SYSTEM, DELETE_MARKUP_PERSON, DELETE_MARKUP_SYSTEM, DELETE_PERSON, DELETE_SYSTEM, GET_LISTS, GET_MARKUP_PEOPLE, GET_MARKUP_SYSTEMS, GET_PEOPLE, GET_SYSTEMS, modelsDispatchTypes, TList, TMarkupPerson, TMarkupSystem, TPerson, TSystem } from "./types";
import axios from 'axios';
import { SERVER_URL } from "../utils";

// -------------------- LISTS 

export const getLists = () => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.get(SERVER_URL + 'api/lists/').then(res => {
        dispatch({
            type: GET_LISTS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

// -------------------- SYSTEMS 

export const getSystems = () => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.get(SERVER_URL + 'api/systems/').then(res => {
        dispatch({
            type: GET_SYSTEMS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

export const createSystem = (system: TSystem) => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.post(SERVER_URL + 'api/systems/', system).then(res => {
        dispatch({
            type: CREATE_SYSTEM,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}
export const deleteSystem = (id: number) => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.delete(SERVER_URL + `api/systems/${id}/`).then(res => {
        dispatch({
            type: DELETE_SYSTEM,
            payload: id
        });
    }).catch((err) => {
        console.log(err)
    });
}


// -------------------- PEOPLE 

export const getPeople = () => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.get(SERVER_URL + 'api/people/').then(res => {
        dispatch({
            type: GET_PEOPLE,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

export const createPerson = (person: TPerson) => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.post(SERVER_URL + 'api/people/', person).then(res => {
        dispatch({
            type: CREATE_PERSON,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}
export const deletePerson = (id: number) => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.delete(SERVER_URL + `api/people/${id}/`).then(res => {
        dispatch({
            type: DELETE_PERSON,
            payload: id
        });
    }).catch((err) => {
        console.log(err)
    });
}

// -------------------- PEOPLE MARKUPS

export const getPeopleMarkups = () => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.get(SERVER_URL + 'api/markup_person/').then(res => {
        dispatch({
            type: GET_MARKUP_PEOPLE,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

export const createPeopleMarkup = (markup: TMarkupPerson) => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.post(SERVER_URL + 'api/markup_person/', markup).then(res => {
        dispatch({
            type: CREATE_MARKUP_PERSON,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}
export const deletePeopleMarkup = (id: number) => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.delete(SERVER_URL + `api/markup_person/${id}/`).then(res => {
        dispatch({
            type: DELETE_MARKUP_PERSON,
            payload: id
        });
    }).catch((err) => {
        console.log(err)
    });
}


// -------------------- SYSTEM MARKUPS

export const getSystemMarkups = () => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.get(SERVER_URL + 'api/markup_system/').then(res => {
        dispatch({
            type: GET_MARKUP_SYSTEMS,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}

export const createSystemMarkup = (markup: TMarkupSystem) => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.post(SERVER_URL + 'api/markup_system/', markup).then(res => {
        dispatch({
            type: CREATE_MARKUP_SYSTEM,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err)
    });
}
export const deleteSystemMarkup = (id: number) => (dispatch: Dispatch<modelsDispatchTypes>) => {
    axios.delete(SERVER_URL + `api/markup_system/${id}/`).then(res => {
        dispatch({
            type: DELETE_MARKUP_SYSTEM,
            payload: id
        });
    }).catch((err) => {
        console.log(err)
    });
}
