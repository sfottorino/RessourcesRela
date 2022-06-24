import * as axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

function Validate() {
    let history = useHistory();
    const { token }=useParams();
    useEffect(() => {
        axios.post('http://127.0.0.1:5001/user/validate/'+token)
        .then(() => {
            console.log('Succès');
        })
        .catch(error => {
            console.log(error);
            history.push("/")
        })
    }, [token])  

    function handleClick() {
        history.push("/signin");
    }

    return (
        <div className='d-flex flex-column flex-fill border align-items-center'>
            <h3 className='mt-15'>Bienvenue sur Ressources Relationnelle 😊</h3>
            <p className='mt-15'>Vous pouvez désormais vous connecter à votre compte !</p>
            <button type="button" className='btn_v mt-15' onClick={handleClick}>
                Se connecter
            </button>
        </div>
    );
}

export default Validate;