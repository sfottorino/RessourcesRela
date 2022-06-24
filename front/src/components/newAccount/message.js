import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';



class message extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            back:false
        }
    }

    handleClick = () =>{
        this.setState({back:true});
    }


    render(){
        return(
            <div className='d-flex flex-column flex-fill border align-items-center'>
                <h3 className='mt-15'>Pensez à consulter vos mails ! ✉</h3>
                <p className='mt-15'>Vous avez reçu un mail pour vérifier votre compte sur votre adresse mail !</p>
                <button type="button" className='btn_v mt-15' onClick={this.handleClick}>
                    Menu
                </button>
                { this.state.back ? (
                    <Redirect to="/"/>
                ) : null}
            </div>
        )
    }
}

export default message;