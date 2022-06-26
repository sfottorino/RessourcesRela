import axios from 'axios';
import authHeaders from './auth-header';

const adminFunction={};

adminFunction.isAdmin = () => {
    if (localStorage.getItem('user')) {
        axios.get('http://127.0.0.1:5001/user/isadmin', { headers: authHeaders() })
            .then(response => {
                return response.data.message;
            })
            .catch(err => {
                return false;
            });
    }
}

export default adminFunction.isAdmin;