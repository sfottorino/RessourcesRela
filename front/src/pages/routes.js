import React from 'react'
class routes extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }

    getUsers = async () => {
        const response = await fetch('http://localhost:5000/users');
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        return myJson;
    }

    getNewUser = async (lastname, fisrtname, email, password) => {
        const response = await fetch('http://localhost:5000/users/insert/'+lastname+'/'+fisrtname+'/'+email+'/'+password);
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        return myJson;
    }

    getConnect = async (email, password) => {
        const response = await fetch('http://localhost:5000/users/connect/'+email+'/'+password);
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        return myJson;
    }
}

export default routes