import * as axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const { Component } = require("react");


class validate extends Component{

    constructor(props){
        const token=useParams();
        axios.post('http://127.0.0.1:5001/user/verif/'+token)
        .then()
        .catch(() => {
            const history = useHistory();
            history.push("/")
        })
    }

    handleOnClick = () => useHistory().push("/signup");

    render(){
        return(
            <div>
                <h3>ça marche</h3>
                <button onClick={handleClick}>Se connecter</button>
            </div>
        )
    }
}

export default validate;