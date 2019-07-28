import { getIdFromUrl} from "./util";

describe('utils', () => {
    it(' should get id from provided url', () => {
        const url = 'https://rickandmortyapi.com/api/location/20';
        const id = getIdFromUrl(url);

        expect(id).toEqual(20);
    });

    it(' should return NaN if from provided url is empty', () => {
        const url = '';
        const id = getIdFromUrl(url);

        expect(id).toEqual(NaN);
    });
});
