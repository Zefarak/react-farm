import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from '../index/Navbar';
import IncomeForm from './IncomesForm'
import {Link} from 'react-router-dom';

class BodyIncomes extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {incomes} = this.props;
        console.log('props', incomes)
        return (
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
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Έσοδα</h1>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            {doneLoading === true ?
                                <BodyIncomes incomes={incomes} />
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

export default IncomesPage