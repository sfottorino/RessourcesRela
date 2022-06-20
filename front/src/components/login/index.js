const { Component } = require("react");


class login extends Component{

    constructor(props){
        super(props);
        this.state={value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        console.log(this.state.value);
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="d-flex flex-column align-items-center flex-fill justify-content-center">
                    <div class="d-flex flex-column align-items-center connexion">
                        Connexion
                        <div className="log mt-15">
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <div className="d-flex w-20 flex-end">
                                    <label for="mail" className="">Mail :</label>
                                </div>
                                <div className="d-flex w-80 flex-end">
                                    <input type="email" name="mail" className="shadow w-100" value={this.state.value} onChange={this.handleChange}></input>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-center mt-15 align-items-center">
                                <div className="d-flex w-20 flex-end">
                                    <label for="PW">Mot de passe :</label>
                                </div>
                                <div className="d-flex w-80 flex-end">
                                    <input type="password" name="PW" className="shadow w-100" value={this.state.value} onChange={this.handleChange}></input>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-center w-100">
                                <input type="submit" className="btn shadow mt-15" value="Se connecter"></input> 
                            </div>
                        </div>            
                    </div>
                </div>
            </form>
        )
    }
}

export default login;