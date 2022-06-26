import { Formik } from 'formik';
import * as axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Component } from 'react';
import { withRouter } from "react-router";



class pw extends Component{

    constructor(props){
        super(props);
        this.state={
            errorMessage:'',
            created:false,
            token:''
        }
    }

    componentDidMount() {
        this.setState({token:this.props.match.params.token});
    }

    submit = (values, actions) =>{
        axios.post('http://127.0.0.1:5001/user/mdp',{token:this.state.token, PW:values.mail})
        .then(response => {
            this.setState({created: true});
        })
        .catch( err => { 
                console.log(err);
                this.setState({errorMessage:err.response.data.error});
        })
        actions.setSubmitting(false);
    }

    validate(values){
        let errors={};
        if(values.mail && values.mail.length < 6){
            errors.PW='Mot de passe trop court';
        }
        return errors;
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
                    isSubmitting,
                    errors
                }) => (
                    <form onSubmit={ handleSubmit }>
                        <div className='d-flex flex-column align-items-center justify-content-center flex-fill'>
                            <div className='d-flex w-80 p-15 border flex-column'>
                                <div className="title d-flex w-100 justify-content-center">
                                    <h2>Changement de mot de passe</h2>
                                </div>
                                <div className='d-flex flex-column mt-auto'>
                                    <label for="mail" className=""><h3>Nouveau mot de passe :</h3></label>
                                    <div className='d-flex flex-row w-100 justify-content-center'>
                                        <input type="password" name="mail" values={values.mail} onChange={handleChange} onBlur={handleBlur} className="shadow w-100 row"></input>
                                    </div>
                                </div>
                                <div className='d-flex flex-column mt-auto'>
                                    <div className='d-flex flex-row w-100 justify-content-center'>
                                        <button type="submit" className="btn_c shadow w-90" value="Se connecter" disabled={ isSubmitting }>Changer mon mot de passe</button>
                                    </div>
                                </div>
                                {errors.PW ? (
                                            <div className="danger d-flex justify-content-center">{ errors.PW }</div>
                                        ) : null}
                                {this.state.errorMessage ? (
                                            <div className="danger d-flex justify-content-center">{ this.state.errorMessage }</div>
                                        ) : null}
                                {this.state.created ? (
                                            <Redirect to={{ pathname:'/userValid', state:{title:'Mot de passe changé ✅',msg: 'Un mail de récupération de mot de passe vous a été envoyé, veuillez le consulter svp' }}}/>
                                        ) : null}                                                      
                            </div>
                        </div>
                    </form>
                ) }
            </Formik>
        )
    }
}

export default withRouter(pw);