import React from 'react';

import spinnerImg from '../../assets/images/spinner.gif';
import './Spinner.scss';

type Props = {
    spinnerClass?: String
}

const Spinner: React.FC<Props> = ({ spinnerClass }: Props) => {
    const computedSpinnerClass = spinnerClass ? `spinner ${spinnerClass}` : 'spinner';
    return (
        <div className={computedSpinnerClass}>
            <img src={spinnerImg} alt="Loading" />
        </div>
    );
}

export default Spinner;
