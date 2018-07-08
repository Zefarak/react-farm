import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from '../index/Navbar';
import {Link} from 'react-router-dom';
import PayrollForm from './PayrollForm'
import moment from 'moment';



class PayrollPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this);

        this.state = {
            doneLoading: false,
            crops: [],
            categories: [],
            payrolls: [],
            next: null,
            previous: null
        }
    }

    loadData(){
        const endpointCate = '/api/payroll/category/';
        const endpointCrop = '/api/crops/';
        const endpointPayroll = '/api/payroll/';
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

        fetch(endpointCate, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                categories: responseData
            })
        }).catch(function(error){
            console.log('cate error', error)
        });

        fetch(endpointCrop, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                crops: responseData
            })
        }).catch(function(error){
            console.log('crop error', error)
        });

        fetch(endpointPayroll, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                payrolls: responseData.results
            })
        }).catch(function(error){
            console.log('income error', error)
        })
    }

    updateData(){
        this.loadData()
    }

    componentDidMount(){
        this.loadData();
        this.setState({
            doneLoading: true
        })
    }

    render(){
        const {doneLoading} = this.state;
        const {state} = this;

        return(
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Μισθοδοσία</h1>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            {doneLoading === true ?
                                <table className="table table-striped table-responsive">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Ημερομηνία</th>
                                            <th scope="col">Τίτλος</th>
                                            <th scope="col">Καλλιέργια</th>
                                            <th scope="col">Κατηγορία</th>
                                            <th scope="col">Πληρώθηκε</th>
                                            <th scope="col">Συμμετέχει στην Φορολογία</th>
                                            <th scope="col">Αξία</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.payrolls.length > 0 ? state.payrolls.map((payroll, index)=>{
                                        return(
                                                <tr>
                                                    <td>{payroll.id}</td>
                                                    <td>{payroll.date_end}</td>
                                                    <td>{payroll.title}</td>
                                                    <td>{payroll.tag_crop_related}</td>
                                                    <td>{payroll.tag_category}</td>
                                                    <td>{payroll.tag_is_paid}</td>
                                                    <td>{payroll.tag_is_taxes}</td>
                                                    <td>{payroll.final_value}</td>
                                                    <td>
                                                        <Link to={{
                                                            pathname: `/payroll/${payroll.id}/`
                                                            }}>
                                                            <button className="btn btn-primary">Λεπτομέριες</button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                            }):<p>No incomes</p>
                                            }
                                    </tbody>
                                </table>
                                :<p>No data</p>
                            }
                        </div>
                        <div className="col-lg-4">
                            {doneLoading === true ?
                                <PayrollForm updateData={this.updateData} crops={state.crops} categories={state.categories} />
                                :<p>Something is wrong</p>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PayrollPage