import React, {useEffect, useReducer, useRef, useState} from 'react';
import {isEmpty, isEqual} from 'lodash';

import Spinner from './Spinner';
import {fetchData, fetchReducer} from '../../utilities/fetchData';
import {CharacterProps, GetData, State} from '../Types';
import Error from './Error';
import './Accordion.scss';

type Props = {
    title: string,
    render: (data: any) => React.ReactElement | Array<React.ReactElement>
    initialData?: CharacterProps,
    ids?: Array<number>,
    getData?: GetData
}

const Accordion: React.FC<Props> = ({ title, render, ids = [], getData, initialData }: Props) => {
    const initialState: State = { loading: false, data: initialData, error: undefined };
    const [active, setActive] = useState(initialData ? "active" : "");
    const [{ data, loading, error }, dispatch] = useReducer(fetchReducer, initialState);
    const initialIdsRef: number[] = [];
    const prevIdsRef = useRef(initialIdsRef);
    const prevIds = prevIdsRef.current;

    const toggleActive = () => {
        setActive(active === "" ? "active" : "");
    };

    useEffect(() => {
        if (active === "active" && (ids.length !== 0) && getData && !isEqual(prevIds, ids)) {
            fetchData(ids, getData, dispatch);
            prevIdsRef.current = ids;
        }
    }, [active, ids, getData, prevIds]);

    return (
        <>
            <div className={`character-information accordion-header ${active}`} onClick={toggleActive}>
                {title}
                <span></span>
            </div>
            <div className="accordion-body">
                {loading
                    ? <Spinner spinnerClass="accordion-spinner" />
                    : error
                        ? <Error/>
                        : !isEmpty(data)
                            ? render(data)
                            : <div>No records found</div>
                }
            </div>
        </>
    );
}

export default Accordion;
