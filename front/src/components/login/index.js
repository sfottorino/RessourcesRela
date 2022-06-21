import { Formik } from 'formik';

const { Component } = require("react");


class login extends Component{

    submit = (values, actions) =>{
        // console.log(values);
        // console.log(actions);
        
        actions.setSubmitting(false);
    }

    validate(values){
        console.log({ values });
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
                initialValues={ {name: '', PW:''} }
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
                                    {errors.PW ? (
                                            <div className="danger d-flex justify-content-center">{ errors.PW }</div>
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