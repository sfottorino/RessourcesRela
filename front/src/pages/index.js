import React, {useState} from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import HeroSection from '../components/heroSection'
import routes from './routes'

const Home = () => {

    const[isOpen, setIsOpen]= useState(false);
    
    const toggle = () => {
     setIsOpen(!isOpen)

    }

    const toto = async () => {
        const t = new routes();
        var ttt;
        t.getUsers()
        .then(function(response) {
            ttt = response;
            console.log(ttt);
        });

        t.getNewUser("aaa", "bbb", "aaa.bbb@ccc.fr", "aaa")
        .then(function(response) {
            ttt = response;
            console.log(ttt);
        });

        t.getConnect("admin@admin.admin","admin")
        .then(function(response) {
            ttt = response;
            console.log(ttt);
        });
        
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle}/>   
            <Navbar toggle={toggle}/>
            {/* <button onClick={toto}>totot</button> */}
        </>
    )
}

export default Home
