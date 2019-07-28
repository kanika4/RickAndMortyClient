import React from 'react';
import '@testing-library/react/cleanup-after-each';

import Profile from './Profile';
import {getCharacter, getEpisode, getLocation} from 'rickmortyapi';
import {fireEvent, render} from '@testing-library/react'
import {
    chapterData,
    data,
    emptyOriginLocationData,
    locationData,
    locationDataWithoutResidents
} from '../../resources/testData';

jest.mock('rickmortyapi', () => ({ getLocation: jest.fn(), getEpisode: jest.fn(), getCharacter: jest.fn() }));

describe('Profile', () => {

    beforeEach(() => {
       jest.resetAllMocks();
    });

    it('should show spinner when fetching character response', async () => {
        const promise = Promise.resolve(data);
        getCharacter.mockImplementation(() => promise);
        const { getAllByAltText } = render(<Profile/>);
        expect(getAllByAltText("Loading")).toHaveLength(1);
        await promise;
    });

    it('should show all accordions', async () => {
        const promise = Promise.resolve(data);
        getCharacter.mockImplementation(() => promise);
        const {getAllByText} = render(<Profile/>);
        await promise;
        expect(getAllByText("Character")).toHaveLength(1);
        expect(getAllByText("Origin")).toHaveLength(1);
        expect(getAllByText("Location")).toHaveLength(1);
        expect(getAllByText("Chapters")).toHaveLength(1);
    });

    it('should show no record found for empty origin and/or location', async () => {
        const promise = Promise.resolve(emptyOriginLocationData);
        getCharacter.mockImplementation(() => promise);
        const {getAllByText} = render(<Profile/>);
        await promise;
        expect(getAllByText("Character")).toHaveLength(1);
        expect(getAllByText("Origin")).toHaveLength(1);
        expect(getAllByText("Location")).toHaveLength(1);
        expect(getAllByText("Chapters")).toHaveLength(1);
        expect(getAllByText("No records found")).toHaveLength(3);
    });

    it('should open location accordion', async () => {
        const promise = Promise.resolve(data);
        getCharacter.mockImplementation(() => promise);
        const locationPromise = Promise.resolve(locationData);
        getLocation.mockImplementation(() => locationPromise);
        const {getAllByText, getByText} = render(<Profile/>);
        await promise;
        expect(getAllByText("Location")).toHaveLength(1);
        fireEvent.click(getByText('Location'));
        await locationPromise;
        expect(getAllByText("Name: Earth")).toHaveLength(1);
    });

    it('should open origin accordion', async () => {
        const promise = Promise.resolve(data);
        getCharacter.mockImplementation(() => promise);
        const locationPromise = Promise.resolve(locationDataWithoutResidents    );
        getLocation.mockImplementation(() => locationPromise);
        const {getAllByText, getByText} = render(<Profile/>);
        await promise;
        expect(getAllByText("Origin")).toHaveLength(1);
        fireEvent.click(getByText('Origin'));
        await locationPromise;
        expect(getAllByText("Name: Earth")).toHaveLength(1);
    });

    it('should open chapter accordion', async () => {
        const promise = Promise.resolve(data);
        getCharacter.mockImplementation(() => promise);
        const chapterPromise = Promise.resolve(chapterData);
        getEpisode.mockImplementation(() => chapterPromise);
        const {getAllByText, getByText} = render(<Profile/>);
        await promise;
        expect(getAllByText("Chapters")).toHaveLength(1);
        fireEvent.click(getByText('Chapters'));
        await chapterPromise;
        expect(getAllByText("Pilot")).toHaveLength(1);
    });

    it('should open chapter accordion for multiple episodes', async () => {
        const promise = Promise.resolve(data);
        getCharacter.mockImplementation(() => promise);
        const chapterPromise = Promise.resolve([chapterData]);
        getEpisode.mockImplementation(() => chapterPromise);
        const {getAllByText, getByText} = render(<Profile/>);
        await promise;
        expect(getAllByText("Chapters")).toHaveLength(1);
        fireEvent.click(getByText('Chapters'));
        await chapterPromise;
        expect(getAllByText("Pilot")).toHaveLength(1);
    });

    it('should show no records found for empty response', async () => {
        const promise = Promise.resolve({});
        getCharacter.mockImplementation(() => promise);
        const {getAllByText} = render(<Profile/>);
        await promise;
        expect(getAllByText("No records found")).toHaveLength(1);

    });

    it('should display error message on receiving error response', async () => {
        const promise = Promise.resolve();
        getCharacter.mockRejectedValue(() => promise);
        const {getAllByText} = render(<Profile/>);
        await promise;
        expect(getAllByText("Something went wrong. Please try again later.")).toHaveLength(1);
    });

});
