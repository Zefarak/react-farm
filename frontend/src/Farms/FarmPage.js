import React from 'react';
import Navbar from "../Index/Navbar";
import FarmDetail from "./FarmDetail";


class FarmPage extends React.Component {

    render() {
        return (
            <div id="wrapper">
                <Navbar />
                <FarmDetail />
            </div>
        )

    }
}

export default FarmPage