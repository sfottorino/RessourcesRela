import { Formik } from 'formik';
import * as axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Component } from 'react';



class reset extends Component{

    constructor(props){
        super(props);
        this.state={
            errorMessage:'',
            created:false
        }
    }

    submit = (values, actions) =>{
        axios.post('http://127.0.0.1:5001/user/recup',values)
        .then(response => {
            this.setState({created: true});
        })
        .catch( err => { 
                console.log(err);
                this.setState({errorMessage:err.response.data.error});
        })
        actions.setSubmitting(false);
    }

    render(){
        return(
            <Formik
                onSubmit={ this.submit }
                initialValues={ { mail:''} }
                validate={ this.validate }
            >
                { ({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    isSubmitting
                }) => (
                    <form onSubmit={ handleSubmit }>
                        <div className='d-flex flex-column align-items-center justify-content-center flex-fill'>
                            <div className='d-flex w-80 p-15 border flex-column'>
                                <div className="title d-flex w-100 justify-content-center">
                                    <h2>Mot de passe oublié</h2>
                                </div>
                                <div className='d-flex flex-column mt-auto'>
                                    <label for="mail" className=""><h3>Adresse mail :</h3></label>
                                    <div className='d-flex flex-row w-100 justify-content-center'>
                                        <input type="email" name="mail" values={values.mail} onChange={handleChange} onBlur={handleBlur} className="shadow w-100 row"></input>
                                    </div>
                                </div>
                                <div className='d-flex flex-column mt-auto'>
                                    <div className='d-flex flex-row w-100 justify-content-center'>
                                        <button type="submit" className="btn_c shadow w-90" value="Se connecter" disabled={ isSubmitting }>Récupérer mon mot de passe</button>
                                    </div>
                                </div>
                                {this.state.errorMessage ? (
                                            <div className="danger d-flex justify-content-center">{ this.state.errorMessage }</div>
                                        ) : null}
                                {this.state.created ? (
                                            <Redirect to={{ pathname:'/userValid', state:{msg: 'Un mail de récupération de mot de passe vous a été envoyé, veuillez le consulter svp' }}}/>
                                        ) : null}                                                      
                            </div>
                        </div>
                    </form>
                ) }
            </Formik>
        )
    }
}

export default reset;