import axios from 'axios';

export function getDogs () {
    return async function (dispatch) {
        try {
            let dogs = await axios.get("/dogs")
            return dispatch({
                type: 'GET_DOGS',
                payload: dogs.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export function getDogsByName (name) {
    return async function (dispatch) {
        try {
            let dogsByName = await axios.get(`/dogs?name=${name}`)
            return dispatch({
                type: 'GET_DOGS_BY_NAME',
                payload: dogsByName.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export function getDogById (id) {
    return async function (dispatch) {
        try {
            let dogById = await axios.get(`/dogs/${id}`)
            return dispatch({
                type: 'GET_DOG_BY_ID',
                payload: dogById.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }
}

export function getTemperaments () {
    return async function (dispatch) {
        try {
            let temperaments = await axios.get(`/temperament`)
            return dispatch({
                type: 'GET_TEMPERAMENTS',
                payload: temperaments.data
            })
        }
        catch (err) {
            console.log(err);
        }
    }

}

export function postDog (payload) {
    return function (dispatch) {
        axios.post(`/dog`, payload)
            .then((e) => e)
            .catch((err) => {
                console.log(err);
            })
    }
}

export function sortDogsByWeight(payload) {
    return {
        type: 'SORT_BY_WEIGHT',
        payload: payload
    }
}

export function sortDogsByLetter(payload) {
    return {
        type: 'SORT_BY_LETTER',
        payload: payload
    }
}

export function filterByTemperaments(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENTS',
        payload: payload
    }
}

export function filterCreated (payload) {
    return {
        type: 'FILTER_BY_CREATED',
        payload: payload
    }
}
