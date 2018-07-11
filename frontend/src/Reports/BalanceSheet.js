import React from 'react';
import 'whatwg-fetch';
import moment from 'moment';
import Navbar from '../Index/Navbar';

class BalanceSheet extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            incomes: [],
            report_data: null,
            expenses: [],
            payroll: [],
            date_start: moment().startOf('year').format('YYYY-MM-DD'),
            date_end: moment(new Date()).format('YYYY-MM-DD'),
            doneLoading: false
        }
    }

    loadIncomes(){
        const endpoint = '/api/incomes/invoices/'
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                incomes: responseData.result
            })
        })
    }

    loadReport(){
        const endpoint = '/api/reports/incomes/';
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                report_data: responseData
            })
        }).catch(function(error){
            console.log('wtf income report data', error)
        })
    }

    loadExpenses(){
        const endpoint = '/api/expenses/'
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                expenses: responseData.result
            })
        })
    }

    loadPayroll(){
        const endpoint = '/api/payroll/'
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                payroll: responseData.result
            })
        })
    }

    componentDidMount(){
        this.setState({
            incomes: [],
            report_data: null,
            expenses: [],
            payroll: [],
            date_start: moment().startOf('year').format('YYYY-MM-DD'),
            date_end: moment(new Date()).format('YYYY-MM-DD')
        })
        this.loadPayroll();
        this.loadExpenses();
        this.loadIncomes();
        this.loadReport();
        this.setState({
            doneLoading: true
        })
    }

    render(){
        const {incomes} = this.state;
        const {expenses} = this.state;
        const {payroll} = this.state;
        const {report_data} = this.state;
        const {doneLoading} = this.state;

        return(
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Reports</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="col-lg-6">
                                <div className="panel panel-green">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-tasks fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                {doneLoading === true && report_data !== null ?
                                                    <div className="huge">{report_data.total_sells}</div>
                                                    :
                                                    <div className="huge">Oups</div>
                                                    }
                                                
                                                <div>Έσοδα</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        Kitchen Sink
                                    </div>

                                    <div className="panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-bordered table-hover">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Κατηγορία</th>
                                                    <th>Ποσό</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {report_data !== null && doneLoading === true ?
                                                        report_data.sells_per_cate.map((cate)=>{
                                                            return (
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>{cate.category__title}</td>
                                                                    <td>{cate.sells}</td>
                                                                </tr>
                                                            )
                                                        })
                                                        
                                                        :
                                                        <tr>
                                                            <td>No data</td>
                                                        </tr>
                                                    }
                                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="panel panel-red">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-xs-3">
                                                <i className="fa fa-tasks fa-5x"></i>
                                            </div>
                                            <div className="col-xs-9 text-right">
                                                    {doneLoading === true && report_data !== null ?
                                                        <div className="huge">{report_data.total_expenses}</div>
                                                        :
                                                        <div className="huge">12</div>
                                                        }
                                                
                                                <div>'Εξοδα</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        Kitchen Sink
                                    </div>

                                    <div className="panel-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped table-bordered table-hover">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Κατηγορία</th>
                                                    <th>Ποσό</th> 
                                                </tr>
                                                </thead>
                                                <tbody>
                                                    {doneLoading === true && report_data !==null ?
                                                        report_data.expenses_per_cate.map((cate)=>{
                                                            return (
                                                                    <tr>
                                                                        <td>1</td>
                                                                        <td>{cate.category__title}</td>
                                                                        <td>{cate.expenses}</td>
                                                                    </tr>
                                                            )
                                                        })
                                                        :
                                                        <tr>
                                                            <td>No Data</td>
                                                        </tr>
                                                        }
                                                
                                                </tbody>
                                            </table>
                                        </div>
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



export default BalanceSheet