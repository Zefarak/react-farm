import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from '../index/Navbar';
import {Link} from 'react-router-dom';
import PayrollForm from './PayrollForm'
import moment from 'moment'


class PayrollDetail extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            payroll: null,
            crops: [],
            categories: [],
            doneLoading:false
        }

    }

    loadData(id){
        const endpointCate = '/api/payroll/category/';
        const endpointCrop = '/api/crops/';
        const endpointPayroll = `/api/payroll/${id}/`;
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
                payroll: responseData,
                doneLoading: true
            })
        }).catch(function(error){
            console.log('income error', error)
        })
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.loadData(id);


    }

    render(){
        const {doneLoading} = this.state;
        const {payroll} = this.state;
        const {crops} =  this.state;
        const {categories} = this.state;
        console.log(payroll);
        return (
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                            {doneLoading === true ?
                                <h1 className="page-header">{payroll.title}</h1>
                            : <h1 className="page-header">No Data</h1>
                            }

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            {doneLoading === true && payroll !== undefined ?
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <i className="fa fa-bell fa-fw"></i> Πληροφορίες
                                    </div>
                                    <div className="panel-body">
                                        <div className="list-group">
                                            <a href="#" class="list-group-item">
                                                <i className="fa fa-comment fa-fw"></i> {payroll.tag_crop_related}
                                                <span className="pull-right text-muted small"><em>Καλλιέργια</em>
                                                </span>
                                            </a>
                                        </div>
                                        <div className="list-group">
                                            <a href="#" class="list-group-item">
                                                <i className="fa fa-euro fa-fw"></i> {payroll.date_created}
                                                <span className="pull-right text-muted small"><em>Ημερομηνία</em>
                                                </span>
                                            </a>
                                        </div>
                                        <div className="list-group">
                                            <a href="#" class="list-group-item">
                                                <i className="fa fa-euro fa-fw"></i> {payroll.final_value}
                                                <span className="pull-right text-muted small"><em>Aξία</em>
                                                </span>
                                            </a>
                                        </div>
                                        <div className="list-group">
                                            <a href="#" class="list-group-item">
                                                <i className="fa fa-paypal fa-fw"></i> {payroll.tag_paid} - {payroll.tag_taxes}
                                                <span className="pull-right text-muted small"><em>Είναι Πληρωμένο- Ενημερωνει Φπα</em>
                                                </span>
                                            </a>
                                        </div>
                                        <div className="list-group">
                                            <a href="#" class="list-group-item">
                                                <i className="fa fa-comment fa-fw"></i> {payroll.tag_category}

                                                <span className="pull-right text-muted small"><em>Κατηγορία</em>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            : <p>No data</p>
                            }
                        </div>
                        <div className="col-lg-6">
                            {doneLoading === true && payroll !== null ?
                                <PayrollForm crops={crops}  categories={categories}  />
                                : <p>No Data</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default PayrollDetail