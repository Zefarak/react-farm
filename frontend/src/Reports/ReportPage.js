import React from 'react';
import Navbar from '../Index/Navbar';
import {Link} from 'react-router-dom';


class ReportPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            doneLoading: false,
            farm_data : null,
            crops_data: null
        }
        
    }


    loadCropReport(){
        const endpoint = '/api/reports/crops/';
        let thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

        fetch(endpoint, lookupOptions).
        then(function (response) {
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                crops_data: responseData,
            })
        }).catch(function(error){
            console.log("error", error)
        })
    }


    loadFarmReport(){
        const endpoint = '/api/reports/farms/';
        let thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

        fetch(endpoint, lookupOptions).
        then(function (response) {
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                farm_data: responseData,
                doneLoading: true
            })
        }).catch(function(error){
            console.log("error", error)
        })
    }

    componentDidMount(){
        this.setState({
            doneLoading: false,
            farm_data: null,
            crops_data: null
        });
        this.loadCropReport();
        this.loadFarmReport()
    }

    render(){
        const {farm_data} = this.state;
        const {crops_data} = this.state;
        const {doneLoading} = this.state;
        return(
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Reports</h1>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="col-lg-4">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <i v="fa fa-bell fa-fw"></i> Χωράφια
                                    </div>
                                    {doneLoading === true && farm_data !== null ? 
                                    <div className="panel-body">
                                        <div className="list-group">
                                            <a href="#" className="list-group-item">
                                                <i className="fa fa-comment fa-fw"></i> Συνολικά Στρέμματα {farm_data.area}
                                                <span className="pull-right text-muted small"><em>Χωράφια {farm_data.count}</em>
                                                </span>
                                            </a>
                                            <a href="#" className="list-group-item">
                                                <i className="fa fa-comment fa-fw"></i> Έσοδα {farm_data.incomes}
                                                <span className="pull-right text-muted small"><em>{farm_data.incomes_avg} Ανα χωράφι</em>
                                                </span>
                                            </a>
                                            <a href="#" className="list-group-item">
                                                <i className="fa fa-comment fa-fw"></i> Έξοδα {farm_data.expenses}
                                                <span className="pull-right text-muted small"><em>{farm_data.expenses_avg} Ανα χωράφι</em>
                                                </span>
                                            </a>
                                            <a href="#" className="list-group-item">
                                                <i className="fa fa-comment fa-fw"></i> Μισθοδοσία {farm_data.payroll}
                                                <span className="pull-right text-muted small"><em>{farm_data.payroll_avg} Ανα χωράφι</em>
                                                </span>
                                            </a>

                                        </div>
                                        <Link to={{
                                            pathname: '/reports/balance-sheet/'
                                        }}>
                                            <button className="btn btn-default btn-block">Λεπτομέριες</button>
                                        </Link>
                                    </div>
                                    :
                                    <div className="panel-body">
                                        <div className="list-group">
                                            <a href="#" className="list-group-item">
                                                <i className="fa fa-comment fa-fw"></i> No Data
                                                <span className="pull-right text-muted small"><em>4 minutes ago</em>
                                                </span>
                                            </a>
                                            
                                        </div>
                                        <Link to={{
                                            pathname: '/reports/farms/'
                                        }}>
                                            <button className="btn btn-default btn-block">Λεπτομέριες</button>
                                        </Link>
                                    </div>
                                    }
                        
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <i v="fa fa-bell fa-fw"></i> Καλλιέργιες
                                    </div>
                                    {doneLoading === true && crops_data !== null ?
                                    <div className="panel-body">
                                        <div className="list-group">
                                            <a href="#" className="list-group-item">
                                                <i className="fa fa-comment fa-fw"></i> Καλλιεργήσιμα Στρέμματα {crops_data.area}
                                                <span className="pull-right text-muted small">
                                                </span>
                                            </a>
                                            <a href="#" className="list-group-item">
                                                <i className="fa fa-comment fa-fw"></i> Συνολικά Δέντρα {crops_data.trees}
                                                <span className="pull-right text-muted small">
                                                </span>
                                            </a>


                                        </div>
                                        <a href="#" className="btn btn-default btn-block">Λεπτομέριες</a>
                                    </div>
                                    :
                                    <div className="panel-body">
                                        <div className="list-group">
                                            <a href="#" className="list-group-item">
                                                <i className="fa fa-comment fa-fw"></i> No Data
                                                <span className="pull-right text-muted small"><em>4 minutes ago</em>
                                                </span>
                                            </a>

                                        </div>
                                        <a href="#" className="btn btn-default btn-block">Λεπτομέριες</a>
                                    </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportPage;