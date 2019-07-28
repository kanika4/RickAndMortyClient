import React from 'react';
import '@testing-library/react/cleanup-after-each';

import Accordion from './Accordion';
import {getCharacter, getEpisode, getLocation} from 'rickmortyapi';
import {fireEvent, render} from '@testing-library/react';
import Character from "../profile/Character";
import OriginAndLocation from "../profile/OriginAndLocation";
import Chapter from "../profile/Chapter";
import {chapterData, characterData, locationData} from '../../resources/testData';

jest.mock('rickmortyapi', () => ({ getLocation: jest.fn(), getEpisode: jest.fn(), getCharacter: jest.fn() }));

describe('Accordion', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    const renderMock = jest.fn();

    it('should show accordion content if initial data is present', async () => {
        renderMock.mockImplementation(() => <Character {...characterData} />);
        const { getAllByText } = render(<Accordion title={"Character"} render={renderMock} initialData={characterData}/>);
        expect(getAllByText("Name: Rick Sanchez")).toHaveLength(1);
        expect(getAllByText("Status: Alive")).toHaveLength(1);
        expect(getAllByText("Species: Human")).toHaveLength(1);
        expect(getAllByText("Gender: Male")).toHaveLength(1);
    });

    it('should toggle accordion content on click', async () => {
        renderMock.mockImplementation(() => <Character {...characterData} />);
        const { getAllByText, getByText, container } = render(<Accordion title={"Character"} render={renderMock} initialData={characterData}/>);
        expect(container.querySelectorAll(".accordion-header.active")).toHaveLength(1);
        fireEvent.click(getByText('Character'));
        expect(container.querySelectorAll(".accordion-header.active")).toHaveLength(0);
        fireEvent.click(getByText('Character'));
        expect(container.querySelectorAll(".accordion-header.active")).toHaveLength(1);
    });

    it('should fetch data on accordion open if not already fetched', async () => {
        renderMock.mockImplementation(() => <OriginAndLocation {...locationData} />);
        const promise = Promise.resolve(locationData);
        getLocation.mockImplementation(() => promise);
        const {getAllByText, getByText} = render(<Accordion title={"Location"} render={renderMock} ids={[1]} getData={getLocation}/>);
        fireEvent.click(getByText('Location'));
        await promise;
        expect(getAllByText("Name: Earth")).toHaveLength(1);
        expect(getAllByText("Type: Planet")).toHaveLength(1);
        expect(getAllByText("Dimension: Dimension C-137")).toHaveLength(1);
        expect(getAllByText("Amount of Residents: 2")).toHaveLength(1);
    });

    it('should fetch data on chapter accordion open if not already fetched', async () => {
        renderMock.mockImplementation(() => <Chapter {...chapterData} />);
        const promise = Promise.resolve(chapterData);
        getEpisode.mockImplementation(() => promise);
        const {getAllByText, getByText} = render(<Accordion title={"Chapters"} render={renderMock} ids={[1]} getData={getEpisode}/>);
        fireEvent.click(getByText('Chapters'));
        await promise;
        expect(getAllByText("Pilot")).toHaveLength(1);
    });

    it('should show spinner when fetching response', async () => {
        const promise = Promise.resolve(chapterData);
        getEpisode.mockImplementation(() => promise);
        const { getAllByAltText, getByText } = render(<Accordion title={"Chapters"} render={renderMock} ids={[1]} getData={getEpisode}/>);
        fireEvent.click(getByText('Chapters'));
        expect(getAllByAltText("Loading")).toHaveLength(1);
        await promise;
    });

    it('should show no records found for empty response', async () => {
        const promise = Promise.resolve({});
        getLocation.mockImplementation(() => promise);
        const {getAllByText, getByText} = render(<Accordion title={"Origin"} render={jest.fn()} ids={[1]} getData={getLocation}/>);
        fireEvent.click(getByText('Origin'));
        await promise;
        expect(getAllByText("No records found")).toHaveLength(1);
    });

    it('should display error message on receiving error response', async () => {
        const promise = Promise.resolve();
        getLocation.mockRejectedValue(() => promise);
        const {getAllByText, getByText} = render(<Accordion title={"Origin"} render={jest.fn()} ids={[1]} getData={getLocation}/>);
        fireEvent.click(getByText('Origin'));
        await promise;
        expect(getAllByText("Something went wrong. Please try again later.")).toHaveLength(1);
    });

});
