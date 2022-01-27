const initialState = {
    dogs: [],
    allDogs: [],
    dogsById: {},
    temperaments: [],
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_DOGS':
            state.dogs.length = 0 
            state.allDogs.length= 0
            return {
                ...state,
                dogs: state.dogs.concat(action.payload),
                allDogs: state.allDogs.concat(action.payload)
            }

        case 'GET_DOGS_BY_NAME':
            return {
                ...state,
                dogs: action.payload
            }

        case 'GET_DOG_BY_ID':
            return {
                ...state,
                dogsById: action.payload
            }

        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            }
        
        case 'SORT_BY_WEIGHT':

            const sortWeight = action.payload === 'None' ? state.dogs : action.payload === 'Asc' ? state.dogs.sort(function (a,b) {
                if (a.weight.split(' -')[0] === 'up') {
                    a.weight = a.weight.split('-')[1];
                    if (parseInt(a.weight) > parseInt(b.weight)) {
                        return 1;
                    }
                    if (parseInt(b.weight) > parseInt(a.weight)) {
                        return -1;
                    }
                    return 0;
                } else if (b.weight.split(' -')[0] === 'up') {
                    b.weight = b.weight.split('-')[1];
                    if (parseInt(a.weight) > parseInt(b.weight)) {
                        return 1;
                    }
                    if (parseInt(b.weight) > parseInt(a.weight)) {
                        return -1;
                    }
                    return 0;
                } else {
                    if (parseInt(a.weight) > parseInt(b.weight)) {
                        return 1;
                    }
                    if (parseInt(b.weight) > parseInt(a.weight)) {
                        return -1;
                    }
                    return 0;
                }
            })
            :
            state.dogs.sort(function (a,b) {
                if (a.weight.split(' -')[0] === 'up') {
                    a.weight = a.weight.split('-')[1]; 
                    if (parseInt(a.weight) > parseInt(b.weight)) {
                        return -1;
                    }
                    if (parseInt(b.weight) > parseInt(a.weight)) {
                        return 1;
                    }
                    return 0;
                } else if (b.weight.split(' -')[0] === 'up') {
                    b.weight = b.weight.split('-')[1];
                    if (parseInt(a.weight) > parseInt(b.weight)) {
                        return -1;
                    }
                    if (parseInt(b.weight) > parseInt(a.weight)) {
                        return 1;
                    }
                    return 0;
                } else {
                    if (parseInt(a.weight) > parseInt(b.weight)) {
                        return -1;
                    }
                    if (parseInt(b.weight) > parseInt(a.weight)) {
                        return 1;
                    }
                }
            });
            state.dogs = [];
            return {
                ...state,
                dogs: state.dogs.concat(sortWeight)
            }

        case 'SORT_BY_LETTER': 
            const sortLetter = action.payload === 'None' ? state.dogs : action.payload ===  'Asc' ? state.dogs.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            })
            :
            state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            });
            state.dogs = [];
            return {
                ...state,
                dogs: state.dogs.concat(sortLetter)
            }

        case 'FILTER_BY_CREATED':
            const created = action.payload === 'Cre' ? state.allDogs.filter(e => e.createdInDb) : state.allDogs.filter(e => !e.createdInDb)
            return {
                ...state,
                dogs: action.payload === 'All' ? state.allDogs : created
            }
        
        case 'FILTER_BY_TEMPERAMENTS':
            // const allDogs = state.allDogs;
            let filterOfTemperaments = [];
                for (let i = 0; i < state.allDogs.length; i++) {
                    if (state.allDogs[i].temperaments && state.allDogs[i].temperaments.includes((action.payload).charAt(0).toUpperCase() + (action.payload).slice(1))) {
                        filterOfTemperaments.push(state.allDogs[i])
                    } else
                        continue;
                }
            if (filterOfTemperaments.length === 0) state.dogs = state.allDogs
            else state.dogs.length = 0
            
            return {
                ...state,
                dogs: state.dogs.concat(filterOfTemperaments)
            }

        default:
            return state;
    }
}

export default rootReducer;