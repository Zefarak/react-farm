import React from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom';
import Navbar from '../Index/Navbar';
import ExpenseForm from './ExpenseForm';

class BodyPage extends React.Component {

    constructor(props) {
        super(props);
        this.loadMoreExpenses = this.loadMoreExpenses.bind(this);
        this.updateExpenses = this.updateExpenses.bind(this);
        this.state = {
            doneDownload: false,
            expenses: [],
            next: null,
            previous: null,
            count: 0,
            total_value:0
        }
    }

    loadMoreExpenses(){
        const {next} = this.state;
        if(next !== null || next !== undefined) {
            this.loadExpenses(next)
        }
        }
    
        loadStats(){
            let endpoint = '/api/stats/expenses/';
            const thisComp = this;
            let lookupOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            };
            fetch(endpoint, lookupOptions)
            .then(function(response){
                return response.json()
            }).then(function(responseData){
                console.log(responseData)
                thisComp.setState({
                    total_value: responseData.total_value
                })
            }).catch(function(error){
                console.log('expenses error', error)
            })
        }
    
    loadExpenses(nextEndpoint){
        let endpoint = '/api/expenses/';
        if (nextEndpoint !== undefined){
            endpoint = nextEndpoint
        }
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };
        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            console.log(responseData);
            thisComp.setState({
                expenses: thisComp.state.expenses.concat(responseData.results),
                next: responseData.next,
                previous: responseData.previous,
                count: responseData.count
            })
        }).catch(function(error){
            console.log('expenses error', error)
        })
    }



    loadDownload(){
        this.setState({
            doneDownload: true
        })
    }

    updateExpenses(){
        this.loadMoreExpenses()
    }

    componentDidMount(){
        this.setState({
            doneDownload: false,
            expenses: [],
            next: null,
            previous: null,
            count: 0
        });
        this.loadExpenses();
        this.loadStats();
        this.loadDownload()
    }

    render() {
        const {doneDownload} = this.state;
        const {expenses} = this.state;
        const {count} = this.state;
        const {total_value} = this.state
        const {next} = this.state;
        const {previous}  = this.state;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Ανάλυση Εξόδων Συνολικά Έξοδα {total_value}</div>
                <div className="panel-body">
                    <div id="dataTables-example_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="dataTables_length" id="dataTables-example_length">
                                    <label>Show <select name="dataTables-example_length" aria-controls="dataTables-example" class="form-control input-sm">
                                        <option value="10">10</option><option value="25">25</option>
                                        <option value="50">50</option><option value="100">100</option>
                                        </select> entries
                                    </label>
                                </div>            
                            </div>
                            <div className="col-sm-6">
                                <div id="dataTables-example_filter" className="dataTables_filter">
                                    <label>Search:<input type="search" className="form-control input-sm" placeholder="" aria-controls="dataTables-example" /></label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <table width="100%" className="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" id="dataTables-example" role="grid" aria-describedby="dataTables-example_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting_asc" tabindex="0" aria-controls="dataTables-example" rowspan="1"
                                            colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" 
                                            >Ημερομηνία
                                            </th>
                                            <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" >Τίτλος</th>
                                            <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Κατηγορία</th>
                                            <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending">Καλλιέργεια</th>
                                            <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" >Επηρεάζει Φόρο</th>
                                            <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" >Είναι Πληρωμένο</th>
                                            <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" >Αξία</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doneDownload === true ? expenses.map((expense, index)=> {
                                            return (
                                                <tr className="gradeA odd" role="row">
                                                    <td className="sorting_1">{expense.date_created}</td>
                                                    <td>{expense.title}</td>
                                                    <td>{expense.category_slug}</td>
                                                    <td className="center">{expense.crop_slug}</td>
                                                    <td>{expense.tag_taxes}</td>
                                                    <td>{expense.tag_paid}</td>
                                                    <td className="center">{expense.final_value}</td>
                                                    <td>
                                                        <Link to={{
                                                            pathname: `${expense.id}/`,
                                                            state: {fromDashboard: false}
                                                        }}>
                                                        <button  className="btn btn-default">Λεπτομέριες</button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                            
                                            
                                        :  <tr className="gradeA odd" role="row">
                                                <td className="sorting_1">Gecko</td>
                                                <td>Firefox 1.0</td>
                                                <td>Win 98+ / OSX.2+</td>
                                                <td className="center">1.7</td>
                                                <td className="center">A</td>
                                            </tr>
                                        
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="dataTables_info" id="dataTables-example_info" role="status" aria-live="polite">
                                    Showing 1 to 10 of 57 entries
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="dataTables_paginate paging_simple_numbers" id="dataTables-example_paginate">
                                    <ul className="pagination">
                                        {next !== null ?
                                            <li className="paginate_button next" aria-controls="dataTables-example" tabindex="0" id="dataTables-example_next">
                                                <button onClick={this.loadMoreExpenses}>Load More</button>
                                            </li>
                                            : <li>No more posts</li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class ExpensesPage extends React.Component {

    constructor(props) {
        super(props);
        this.loadExpenses = this.loadExpenses.bind(this);
        this.state = {
            expenses_cate: [],
            expenses: [],
            doneLoading: false
        }
    }

    loadExpenses(){
        const endpoint = '/api/expenses/';
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };
        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                expenses: responseData.results,
                next: responseData.next,
                previous: responseData.previous,
                count: responseData.count
            })
        }).catch(function(error){
            console.log('expenses error', error)
        })
    }

    loadExpensesCate(){
        const endpoint = '/api/expense/category/';
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };
        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                expense_cate: responseData,
                doneLoading: true
            })
        }).catch(function(error){
            console.log('expenses error', error)
        })
    }

    componentDidMount(){
        this.loadExpensesCate();
    }

    render() {
        const {doneLoading} = this.state;
        const {expenses_cate} = this.state;
        return (
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Έξοδα</h1>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            <BodyPage />
                        </div>
                        <div className="col-lg-4">
                            {doneLoading === true ?
                                <ExpenseForm loadExpenses={this.updateExpenses} expenses_cate={expenses_cate} />
                                : <ExpenseForm />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ExpensesPage;