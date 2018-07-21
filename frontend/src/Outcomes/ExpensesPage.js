import React from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom';
import Navbar from '../Index/Navbar';
import NavbarInside from '../Index/NavbarInside'
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
                <div className="ui segment">
                    <table className="ui table">
                        <thead>
                            <tr>
                                <th>Ημερομηνία</th>
                                <th>Τίτλος</th>
                                <th>Κατηγορία</th>
                                <th>Καλλιέργεια</th>
                                <th>Επηρεάζει Φόρο</th>
                                <th>Είναι Πληρωμένο</th>
                                <th>Αξία</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {doneDownload === true ? expenses.map((expense, index)=> {
                                return (
                                    <tr>
                                        <td>{expense.date_created}</td>
                                        <td>{expense.title}</td>
                                        <td>{expense.category_slug}</td>
                                        <td>{expense.tag_crop_related}</td>
                                        <td>{expense.tag_taxes}</td>
                                        <td>{expense.tag_paid}</td>
                                        <td>{expense.final_value}</td>
                                        <td>
                                            <Link to={{
                                                pathname: `${expense.id}/`,
                                                state: {fromDashboard: false}
                                            }}>
                                            <button  className="ui blue icon button"><i classname='edit icon' /></button>
                                            </Link>
                                        </td>
                                    </tr>
                                    )
                                })
                                :  <tr>
                                        <td>Gecko</td>
                                        <td>Firefox 1.0</td>
                                        <td>Win 98+ / OSX.2+</td>
                                        <td className="center">1.7</td>
                                        <td className="center">A</td>
                                    </tr>
                                  }
                        </tbody>
                    </table>
                    <ul className="pagination">
                        {next !== null ?
                            <li className="paginate_button next" aria-controls="dataTables-example" tabindex="0" id="dataTables-example_next">
                            <button onClick={this.loadMoreExpenses}>Load More</button>
                            </li>
                        : <li>No more posts</li>
                        }
                    </ul>
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
            <div>
                <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarInside />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">
                            Imagine-a-Company
                        </h1>
                        <h2>Do whatever you want when you want to.</h2>
                        <div className="ui huge primary button">Get Started <i class="right arrow icon"/></div>
                    </div>
                </div>
                <h3 className="ui center aligned header">Stackable Grid</h3>
                <div className="ui two column stackable grid">
                    <div className='column'>
                        <BodyPage />
                    </div>
                    <div className='column'>
                        {doneLoading === true ?
                            <ExpenseForm updateExpenses={this.updateExpenses} expenses_cate={expenses_cate} />
                            : <ExpenseForm />
                        }
                    </div>
                </div>
            </div> 
        )
    }
}

export default ExpensesPage;