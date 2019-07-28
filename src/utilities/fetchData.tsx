import {GetData, State} from '../components/Types'

const fetchReducer = (state: State, action: {type: string, data: any}) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true };
        case 'SUCCESS':
            return { ...state, loading: false, data: action.data };
        case 'FAILURE':
            return { ...state, loading: false, error: action.data };
        default:
            return state;
    }
};

const fetchData = async (query: Array<number>, getData: GetData, dispatch: Function) => {
    try {
        dispatch({ type: 'LOADING' });
        const data = await getData(query);
        dispatch({ type: 'SUCCESS', data });
    } catch (error) {
        dispatch({ type: 'FAILURE', data: error });
    }
};

export {
    fetchData,
    fetchReducer
};
