import React, {useEffect, useReducer} from 'react';
import {isEmpty} from 'lodash';
import {getCharacter, getEpisode, getLocation} from 'rickmortyapi';
import './Profile.scss';

import {fetchData, fetchReducer} from '../../utilities/fetchData';
import {getIdFromUrl} from '../../utilities/util';

import Spinner from '../common/Spinner';
import Accordion from '../common/Accordion';

import Character from './Character';
import OriginAndLocation from './OriginAndLocation';
import Chapter from './Chapter';

import * as Types from '../Types';
import {CharacterProps, CharacterSchema} from '../Types';
import Error from "../common/Error";

const initialData = {
    info: {
        count: 0,
        pages: 0,
        next: "",
        prev: ""
    },
    results: []
};


const renderCharacter = (data: CharacterSchema) => {
    if(isEmpty(data.results)) {
        return <div>No records found</div>
    }
    return <div className="profile-wrapper">
            {data.results.map((character: CharacterProps) => {
                const getOriginId = getIdFromUrl(character.origin.url);
                const getLocationId = getIdFromUrl(character.location.url);
                const originId = getOriginId ? [getOriginId] : [];
                const locationId = getLocationId ? [getLocationId] : [];
                const chapterIds = character.episode.map((episode: string) => getIdFromUrl(episode));
                return (
                    <div key={character.id} className="profile">
                        <img alt={character.name} src={character.image} />
                        <h2>{character.name}</h2>
                        <div className="profile-details">
                            <Accordion title="Character" initialData={character}
                                       render={(data: Types.CharacterProps) => <Character {...data} />} />
                            <Accordion title="Origin" ids={originId} getData={getLocation}
                                       render={(data: Types.LocationProps) => <OriginAndLocation {...data} />} />
                            <Accordion title="Location" ids={locationId} getData={getLocation}
                                       render={(data: Types.LocationProps) => <OriginAndLocation {...data} />} />
                            <Accordion title="Chapters" ids={chapterIds} getData={getEpisode}
                                       render={(data: Array<Types.ChapterProps> | Types.ChapterProps) => {
                                           const chapters = data instanceof Array ? [...data] : [data];
                                           return chapters.map((chapter) => <ul key={chapter.id}><Chapter {...chapter} /></ul>);
                                       }} />
                        </div>
                    </div>
                );
            })}
    </div>
};

const Profile: React.FC = () => {
    const initialState: Types.State = { loading: false, data: initialData, error: undefined };
    const [{ data, loading, error }, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        fetchData([], getCharacter, dispatch);
    }, []);

    return (
        <>
            {loading
                ? <Spinner/>
                : error
                    ? <Error/>
                    : data && renderCharacter(data)
            }

        </>
    );
};


export default Profile;
