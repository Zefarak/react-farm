import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from '../index/Navbar';
import NavbarInside from '../Index/NavbarInside';
import IncomeForm from './IncomesForm'
import {Link} from 'react-router-dom';
import {getDataResults} from '../Index/MyComponent';


class BodyIncomes extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {incomes} = this.props;
        console.log('props', incomes)
        return (
            
                <div className='ui segment'>
                        <table className="ui table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Τίτλος</th>
                                    <th>Καλλιέργια</th>
                                    <th>Κατηγορία</th>
                                    <th>Εισπράκτηκε</th>
                                    <th>Αξία</th>
                                    <th>Actions</th>
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
                                        }}><button className='ui blue icon button'><i className='edit icon' /></button>
                                        </Link>
                                    </td>
                                </tr>    
                                )
                                }):<p>No incomes</p>
                                }
                            </tbody>
                        </table>
                </div>
                )
            }
    }


class IncomesPage extends React.Component {

    constructor(props) {
        super(props);
        this.updateIncomes = this.updateIncomes.bind(this);
        this.state = {
            incomes: [],
            doneLoading: false
        }
    }

    loadIncomes(){
        const endpoint = '/api/incomes/invoices/';
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
                incomes: responseData.results,
                doneLoading: true
            })
        }).catch(function(error){
            console.log('error incomes', error)
        })
    }

    updateIncomes(){
        this.loadIncomes()
    }

    componentDidMount(){
        this.setState({
            doneLoading: false,
            incomes: []
        });
        this.loadIncomes()
    }

    render(){
        const {doneLoading} = this.state;
        const {incomes} = this.state;
        console.log('state', incomes, doneLoading);
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
                <div className="ui three column stackable grid">
                    <div className='column'>
                        {doneLoading === true ?
                                <BodyIncomes incomes={incomes} />
                            :<p>No data</p>
                        }
                    </div>
                    <div className='column'>
                    <form method='GET' className="ui form">
                        <div className="field">
                            <label>Αναζήτηση</label>
                            <input type="text" name="search" placeholder="Αναζήτηση" />
                        </div>
                        <div className="field">
                            <label>Φάρμες</label>
                            <div class="ui selection dropdown">
                                <input type="hidden" name="card[type]" />
                                <div class="default text">Type</div>
                                <i class="dropdown icon"></i>
                                <div class="menu">
                                    <div class="item" data-value="visa">
                                            <i class="visa icon" />
                                            Visa
                                            </div>
                                            <div class="item" data-value="amex">
                                            <i class="amex icon" />
                                            American Express
                                            </div>
                                    <div class="item" data-value="discover">
                                        <i class="discover icon" />
                                        Discover
                                     </div>
                                </div>
                            </div>
                        </div>
                        <div class="two fields">
                            <div class="field">
                                <label>Ημερομηνία Έναρξης</label>
                                <input type="date" name="date_start" maxlength="3" placeholder="CVC" />
                            </div>
                            <div class="field">
                                <label>Ημερομηνία Λήξης</label>
                                <input type="date" name="date_end" maxlength="3" placeholder="CVC" />
                            </div>
                        </div>
                        <button class="ui button" type="submit">Αποθήκευση</button>
                    </form>
                    </div>
                    <div className='column'>
                        <div className='ui raised segment'>
                        <IncomeForm updateIncomes={this.updateIncomes} />
                        </div>
                    </div>
                </div>
            </div>
      

            
        )
    }
}

export default IncomesPage