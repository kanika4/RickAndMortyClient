import React from 'react';
import { CharacterProps } from '../Types';

const Character: React.FC<CharacterProps> = ({ name, species, status, gender }: CharacterProps) => {
    return (
        <>
            <div>Name: {name}</div>
            <div>Species: {species}</div>
            <div>Status: {status}</div>
            <div>Gender: {gender}</div>
        </>
    );
};

export default Character;
