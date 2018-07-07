import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from '../index/Navbar';
import {Link} from 'react-router-dom';
import moment from 'moment';



class PayrollPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            doneLoading: false,
            crops: [],
            categories: [],
            payroll: []
        }
    }

    loadData(){
        const endpointCate = '';
        const endpointCrop = '';
        const endpointIncomes = '';
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpointCate, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                categories: responseData
            })
        }).catch(function(error){
            console.log('cate error', error)
        })

        fetch(endpointCrop, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                crops: responseData
            })
        }).catch(function(error){
            console.log('crop error', error)
        })

        fetch(endpointIncomes, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                payroll: responseData
            })
        }).catch(function(error){
            console.log('income error', error)
        })
    }

    componentDidMount(){
        this.loadData()
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
                                <table className="table table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Τίτλος</th>
                                            <th scope="col">Καλλιέργια</th>
                                            <th scope="col">Κατηγορία</th>
                                            <th scope="col">Εισπράκτηκε</th>
                                            <th scope="col">Αξία</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {incomes.length > 0 ? incomes.map((income, index)=>{
                                        return(
                                            <tr>
                                                <td>{income.id}</td>
                                                <td>{income.title}</td>
                                                <td>{income.tag_crop_related}</td>
                                                <td>{income.tag_category}</td>
                                                <td>{income.tag_is_paid}</td>
                                                <td>{income.final_value}</td>
                                                <td>
                                                    <Link to={{
                                                        pathname: `/incomes/invoices/${income.id}/`
                                                    }}><button className='btn btn-primary'>Επεξεργασία</button>
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
                            <IncomeForm updateIncomes={this.updateIncomes} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}