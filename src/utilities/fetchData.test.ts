import { fetchData, fetchReducer } from './fetchData';

describe('fetch data', () => {
    const initialState  = {
        loading: false,
        data: undefined,
        error: undefined
    };

    const dispatch = jest.fn();
    const getData = jest.fn();

    it('should return the initial state if type is not matched', () => {
        const state = fetchReducer(initialState, { type: 'ANY', data: {}});
        expect(state).toEqual(initialState);
    });

    it('should return state with loading true if type is LOADING', () => {
        const state = fetchReducer(initialState, { type: 'LOADING', data: {} });
        expect(state.loading).toEqual(true);
        expect(state.data).toEqual(undefined);
        expect(state.error).toEqual(undefined);
    });

    it('should return state with loading false and with provided data if type is SUCCESS', () => {
        const data = {
            id: '1'
        };
        const state = fetchReducer(initialState, { type: 'SUCCESS', data });
        expect(state.loading).toEqual(false);
        expect(state.data).toEqual(data);
        expect(state.error).toEqual(undefined);
    });

    it('should return state with loading false and with error if type is FAILURE', () => {
        const data = {
            error: {
                status: '500'
            }
        };

        const state = fetchReducer(initialState, { type: 'FAILURE', data });
        expect(state.loading).toEqual(false);
        expect(state.data).toEqual(undefined);
        expect(state.error).toEqual(data);
    });

    it('should call dispatch with type SUCCESS and fetched data while fetching data', async () => {
        const data = { id: '1' };
        getData.mockResolvedValue(data);

        await fetchData([], getData, dispatch);

        expect(getData).toHaveBeenCalledWith([]);
        expect(dispatch).toBeCalledWith({ type: 'LOADING'});
        expect(dispatch).toHaveBeenCalledWith({ type: 'SUCCESS', data});
    });

    it('should call dispatch with failure if some error occurred while fetching data', async () => {
        const error = {
            status: '500'
        };
        getData.mockRejectedValue(error);

        await fetchData([], getData, dispatch);

        expect(getData).toHaveBeenCalledWith([]);
        expect(dispatch).toBeCalledWith({ type: 'LOADING' });
        expect(dispatch).toHaveBeenCalledWith({ type: 'FAILURE', data: error });
    });

});
