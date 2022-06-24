import { Formik } from 'formik';
import * as axios from 'axios';
import { Redirect } from 'react-router-dom';

const { Component } = require("react");


class login extends Component{

    constructor(props){
        this.state={
            clicked:false
        }
    }

    submit = (values, actions) =>{
        axios.post('http://127.0.0.1:5001/user/connect',values)
        .then(response => {
            console.log(response);
        })
        .catch( err => { 
            console.log(err.response.status);
            console.log(err.response.data.error);
        })
        actions.setSubmitting(false);
    }

    oubli = () =>{
        this.setState({clicked:true});
    }

    validate(values){
        let errors={};
        if(values.PW && values.PW.length < 6){
            errors.PW='Mot de passe trop court';
        }
        return errors;
    }

    render(){
        return(
            <Formik
                onSubmit={ this.submit }
                initialValues={ {mail: '', PW:''} }
                validate={ this.validate }
            >
                { ({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    isSubmitting,
                    errors
                }) => (
                    <form onSubmit={ handleSubmit }>
                        <div className="d-flex flex-column align-items-center flex-fill justify-content-center">
                            <div class="d-flex flex-column align-items-center connexion">
                                Connexion
                                <div className="log mt-15">
                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                        <div className="d-flex w-35 flex-end">
                                            <label for="mail" className="">Mail :</label>
                                        </div>
                                        <div className="d-flex w-65 flex-end">
                                            <input type="email" name="mail" values={values.mail} onChange={handleChange} onBlur={handleBlur} className="shadow w-100"></input>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-center mt-15 align-items-center">
                                        <div className="d-flex w-35 flex-end">
                                            <label for="PW">Mot de passe :</label>
                                        </div>
                                        <div className="d-flex w-65 flex-end">
                                            <input type="password" name="PW" values={values.PW} onChange={handleChange} onBlur={handleBlur} className="shadow w-100"></input>
                                        </div>
                                    </div>
                                    <button className='btna mt-15' onClick={this.oubli}>Mot de passe oublié?</button>
                                    {errors.PW ? (
                                            <div className="danger d-flex justify-content-center">{ errors.PW }</div>
                                        ) : null}

                                    {this.state.clicked ? (
                                            <Redirect to="/resetPW"/>
                                        ) : null} 
                                    <div className="d-flex flex-row align-items-center justify-content-center w-100">
                                        <button type="submit" className="btn shadow mt-15" value="Se connecter" disabled={ isSubmitting }>Se connecter</button> 
                                    </div>
                                    
                                </div>            
                            </div>
                        </div>
                    </form>
                ) }
            </Formik>
        )
    }
}

export default login;