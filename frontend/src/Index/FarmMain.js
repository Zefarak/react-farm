import React from 'react';
import 'whatwg-fetch'
import Navbar from '../Index/Navbar';
import  { Link } from 'react-router-dom';




class FarmMain extends React.Component{

    constructor(props){
        super(props)
    }


    render(){
        return(
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Δεδομένα</h1>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                       
                            <div className="col-lg-4">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                    Δέντρα
                                    </div>
                                    <div className="panel-body">
                                        <p>Δημιούργία, επεξεργασία, διαγραφή</p>
                                    </div>
                                    <div className="panel-footer">
                                        <Link to={{
                                            pathname: `/δέντρα/`

                                        }}>
                                            <button className='btn btn-primary'>Δέντρα</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                    Καλλιέργιες
                                    </div>
                                    <div className="panel-body">
                                        <p>Δημιούργία, επεξεργασία, διαγραφή</p>
                                    </div>
                                    <div className="panel-footer">
                                        <Link to={{
                                            pathname: `/καλλιέργιες/`

                                        }}>
                                            <button className='btn btn-primary'>Καλλιέργιες</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                    Χωράφια
                                    </div>
                                    <div className="panel-body">
                                        <p>Δημιούργία, επεξεργασία, διαγραφή</p>
                                    </div>
                                    <div className="panel-footer">
                                        <Link to={{
                                            pathname: `/χωράφια/`

                                        }}>
                                            <button className='btn btn-primary'>Χωράφια</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                         </div>
                        </div>
                        
                    </div>
                </div>
            
        )
    }
}

export default FarmMain;