/***** IMPORTS *****/
import React, { FC } from 'react';


/***** INTERFACES *****/
interface SpinnerProps {

};


/***** COMPONENT-FUNCTION *****/
const Spinner: FC<SpinnerProps> = (): JSX.Element => {

    /** return statement */
    return (
        <div>
            Loading...
        </div>
    );
};

/***** EXPORTS *****/
export default Spinner;