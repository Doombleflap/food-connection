const INITIAL_USER_STATE = {
    username: "",
    email: "",
    age: 0,
    weight: 0,
    height: 0,
    activityLevel: "",
    race: "",
    major: "",
    foodHistory: [],
    diet: { },
    signUpDate: Date.now(),
}

const userReducer = (state = INITIAL_USER_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            state = action.payload;
            break;
        case 'ADD_FOOD_TO_HISTORY':
            const previousDiet = state.diet;
            const foodEntry = action.payload;
            const newCalories = previousDiet.total - foodEntry.food.calories;
            const newProtein = previousDiet.protein - foodEntry.food.protein * 9;
            const newFat = previousDiet.fat - foodEntry.food.fat * 4;
            const newCarbohydrates = previousDiet.carbohydrates - foodEntry.food.carbs * 4;
            state = {
                ...state,
                foodHistory: [
                    ...state.foodHistory,
                    foodEntry,
                ],
                diet: {
                    total: newCalories,
                    protein: newProtein,
                    fat: newFat,
                    carbohydrates: newCarbohydrates,
                    lastCalculated: previousDiet.lastCalculated,
                }
            }
            break;
        case 'CHANGE_USERNAME':
            state = {
                ...state,
                username: action.payload,
            };
            break;
        case 'CHANGE_AGE':
            state = {
                ...state,
                age: action.payload,
            };
            break;
        case 'CHANGE_EMAIL':
            state = {
                ...state,
                email: action.payload,
            };
            break;
        case 'CHANGE_WEIGHT':
            state = {
                ...state,
                weight: action.payload,
            };
            break;
        case 'CHANGE_HEIGHT':
            state = {
                ...state,
                height: action.payload,
            };
            break;
        case 'CHANGE_ACTIVITY_LEVEL':
            state = {
                ...state,
                activityLevel: action.payload,
            };
            break;
        case 'CHANGE_RACE':
            state = {
                ...state,
                race: action.payload,
            };
            break;
        case 'CHANGE_MAJOR':
            state = {
                ...state,
                major: action.payload,
            };
            break;
        case 'CHANGE_GENDER':
            state = {
                ...state,
                gender: action.payload,
            };
            break;
        case 'CHANGE_DIET':
            state = {
                ...state,
                diet: action.payload,
            };
            break;
        default:
            break;
    }
    return state;
}

export default userReducer;