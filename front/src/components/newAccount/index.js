import { Formik } from 'formik';
import * as axios from 'axios';

const { Component } = require("react");


class create extends Component{

    test={};

    submit = (values, actions) =>{
        axios.post('http://127.0.0.1:5001/user/add',values)
        .then(response => {
            console.log(response);
        })
        .catch( err => { 
            if(err.response.status=="400"){
                console.log(err);
                let test={};
                test.msg="Utilisateur déjà existant";
                console.log(test.msg);
            }
        })
        actions.setSubmitting(false);
    }

    validate(values){
        let errors={};
        if(values.PW && values.PW.length < 6){
            errors.PW='Mot de passe trop court';
        }
        if(!values.firstName){
            errors.firstName='Veuillez entrer un prénom svp'
        }
        if(!values.PW){
            errors.PW='Veuillez entrer un mot de passe svp'
        }
        if(!values.lastName){
            errors.lastName='Veuillez entrer un nom svp'
        }
        if(!values.mail){
            errors.mail='Veuillez entrer une adresse mail svp'
        }
        return errors;
    }

    render(){
        return(
            <Formik
                onSubmit={ this.submit }
                initialValues={ {lastName:'', firstName:'', mail:'', PW:''} }
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
                                    <h2>Créer son compte</h2>
                                </div>
                                <div className='d-flex flex-column mt-auto'>
                                    <label for="firstName" className=""><h3>Prénom :</h3></label>
                                    <div className='d-flex flex-row w-100 justify-content-center'>
                                        <input type="text" name="firstName" values={values.firstName} onChange={handleChange} onBlur={handleBlur} className="shadow w-100 row"></input>
                                    </div>
                                </div>
                                <div className='d-flex flex-column mt-auto'>
                                    <label for="lastName" className=""><h3>Nom :</h3></label>
                                    <div className='d-flex flex-row w-100 justify-content-center'>
                                        <input type="text" name="lastName" values={values.lastName} onChange={handleChange} onBlur={handleBlur} className="shadow w-100 row"></input>
                                    </div>
                                </div>
                                <div className='d-flex flex-column mt-auto'>
                                    <label for="mail" className=""><h3>Adresse mail :</h3></label>
                                    <div className='d-flex flex-row w-100 justify-content-center'>
                                        <input type="email" name="mail" values={values.mail} onChange={handleChange} onBlur={handleBlur} className="shadow w-100 row"></input>
                                    </div>
                                </div>
                                <div className='d-flex flex-column mt-auto'>
                                    <label for="mail" className=""><h3>Mot de passe :</h3></label>
                                    <div className='d-flex flex-row w-100 justify-content-center'>
                                    <input type="password" name="PW" values={values.PW} onChange={handleChange} onBlur={handleBlur} className="shadow w-100 row"></input>
                                    </div>
                                </div>
                                <div className='d-flex flex-column mt-auto'>
                                    <div className='d-flex flex-row w-100 justify-content-center'>
                                        <button type="submit" className="btn_c shadow w-90" value="Se connecter" disabled={ isSubmitting }>Créer mon compte</button>
                                    </div>
                                </div>
                                {errors.PW ? (
                                            <div className="danger d-flex justify-content-center">{ errors.PW }</div>
                                        ) : null}
                                {errors.firstName ? (
                                            <div className="danger d-flex justify-content-center">{ errors.firstName }</div>
                                        ) : null}
                                {errors.lastName ? (
                                            <div className="danger d-flex justify-content-center">{ errors.lastName }</div>
                                        ) : null}
                                {errors.mail ? (
                                            <div className="danger d-flex justify-content-center">{ errors.mail }</div>
                                        ) : null}                        
                            </div>
                        </div>
                    </form>
                ) }
            </Formik>
        )
    }
}

export default create;