import React from 'react';
import { LocationProps } from '../Types';

const OriginAndLocation: React.FC<LocationProps> = ({ name, type, dimension, residents = [] }: LocationProps) => {
    return (
        <>
            <div>Name: {name}</div>
            <div>Type: {type}</div>
            <div>Dimension: {dimension}</div>
            <div>Amount of Residents: {residents.length}</div>
        </>
    );
};

export default OriginAndLocation;
