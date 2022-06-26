import React from 'react';
import getCurrentId from '../../services/getCurrentId';
import axios from 'axios';
import authHeaders from '../../services/auth-header';
import SideMenu from './sideMenu';

const { Component } = require("react");


class accueil extends Component{

    constructor(props){
        super(props);
        this.state={
            admin:false
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:5001/user/isadmin', { headers: authHeaders() })
            .then(response => {
                if(response.data.message){
                    this.setState({admin:true});
                }
            })
            .catch(err => {
                return false;
            });  
    }


    render(){
        return(
            <div className='d-flex flex-row row-nowrap flex-fill border'>
                <div className='d-flex flex-column w-20'>
                    <SideMenu id={getCurrentId()}/>
                </div>
                <div className='d-flex flex-column align-items-center flex-fill'>
                    <h3 className='mt-15'>Bienvenue sur l'accueil 😊</h3>
                    <p className='mt-15'>Prenez vos aises !</p>

                    {this.state.admin === true? (
                        <h1>Admin</h1>
                    ):(
                        <h1>Pas admin</h1>
                    )}
                </div>   
            </div>
        )
    }
}

export default accueil;