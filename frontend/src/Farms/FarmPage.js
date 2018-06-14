import React from 'react';
import Navbar from '../Index/Navbar';
import FarmsTable from './Farms';




class FarmPage extends React.Component {


    render() {
        return (
            <div id="wrapper">
            <Navbar />
            <FarmsTable />
        </div> 
        )
    }
}


export default FarmPage