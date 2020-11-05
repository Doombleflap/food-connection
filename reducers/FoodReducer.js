//initialize empty food state list
const INITIAL_FOOD_STATE = { 
    list: [],
}

//perform action based on food state
const foodReducer = (state = INITIAL_FOOD_STATE, action) => {
    switch (action.type) {
		//if action = SET_FOODS, apply the payload and mutate the list item
        case 'SET_FOODS':
            state = {
                ...state,
                list: action.payload,
            }
            break;
			
		//by default, do nothing
        default:
            break;
    }
    return state;
}

//export module to make globally accessible in program
export default foodReducer;