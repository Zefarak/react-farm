import React from 'react';
import Navbar from '../Index/Navbar';
import NavbarInside  from '../Index/NavbarInside';
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

            <div>
                <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarInside />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">
                            Reports
                        </h1>
                        <h2>Do whatever you want when you want to.</h2>
                        <div className="ui huge primary button">Get Started <i className="right arrow icon"/></div>
                    </div>
                </div>
                <div className="ui center aligned header">Δεδομένα</div>
                <div className="ui two column stackable grid">
                    <div className="column">
                        <div className="ui raised segment">
                            <h2 className="ui header">
                              <i className="list icon" />
                              <div className="content">
                               Χωράφια
                              </div>
                            </h2>
                            {doneLoading === true && farm_data !== null ?
                            <div className="ui raised segments">
                                <div className="ui segment">
                                    <p>Συνολικά Στρέμματα {farm_data.area}</p>
                                </div>
                                <div className="ui segment">
                                    <p>Χωράφια {farm_data.count}</p>
                                </div>
                                <div className="ui green segment">
                                    <div className="ui tiny statistics">
                                        <div className="small statistic">
                                            <div className="value">{farm_data.incomes}</div>
                                            <div className="label">Έσοδα</div>
                                        </div>
                                        <div className="small statistic">
                                            <div className="value">{farm_data.incomes_avg}</div>
                                            <div className="label">Ανα χωράφι</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui red segment">
                                    <div className="ui small statistics">
                                        <div className="statistic">
                                            <div className="value">{farm_data.expenses}</div>
                                            <div className="label">Έξοδα</div>
                                        </div>
                                        <div className="statistic">
                                            <div className="value">{farm_data.payroll_avg}</div>
                                            <div className="label">Ανα χωράφι</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui segment">
                                    <Link to={{
                                        pathname: '/reports/balance-sheet/'
                                    }}>
                                        <button className="ui teal  button">Λεπτομέριες</button>
                                    </Link>
                                </div>

                            </div>
                            :
                            <p>No data</p>
                            }
                        </div>
                    </div>

                    <div className="column">
                        <div className="ui raised segment">
                            <h2 className="ui header">
                              <i className="list icon" />
                              <div className="content">
                               Καλλιέργιες
                              </div>
                            </h2>
                            {doneLoading === true && crops_data !== null ?
                                <div className="ui raised segments">
                                <div className="ui segment">
                                    <p>Καλλιεργήσιμα Στρέμματα {crops_data.area}</p>
                                </div>
                                <div className="ui segment">
                                    <p>Συνολικά Δέντρα {crops_data.trees}</p>
                                </div>
                                <div className="ui green segment">
                                    <div className="ui tiny statistics">
                                        <div className="small statistic">
                                            <div className="value">{farm_data.incomes}</div>
                                            <div className="label">Έσοδα</div>
                                        </div>
                                        <div className="small statistic">
                                            <div className="value">{farm_data.incomes_avg}</div>
                                            <div className="label">Ανα χωράφι</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui segment">
                                    <Link to={{
                                        pathname: '/reports/balance-sheet/'
                                    }}>
                                        <button className="ui teal  button">Λεπτομέριες</button>
                                    </Link>
                                </div>

                            </div>
                                :
                                <p>No data</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    }

export default ReportPage;