import React from 'react';
import Navbar from './Navbar';
import Homepage from './Homepage';


class Index extends React.Component {

    render() {
        return(
            <div id="wrapper">
                <Navbar />
                <Homepage />
            </div> 
        )
    }
}

export default Index