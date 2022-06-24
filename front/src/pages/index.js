import React, {useState} from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import routes from './routes'

const Home = () => {

    const[isOpen, setIsOpen]= useState(false);
    
    const toggle = () => {
     setIsOpen(!isOpen)

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
