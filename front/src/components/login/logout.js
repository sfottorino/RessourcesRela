import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import logOut from '../../services/logOut';

function Deco() {

    const histo = useHistory()

    useEffect(() => {
        logOut();
        histo.push('/');
        window.location.reload();
    }, [])

    return (
        <div>
        </div>
    );
}

export default Deco;