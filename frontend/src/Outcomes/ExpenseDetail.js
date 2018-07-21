import React from 'react';
import 'whatwg-fetch';
import Navbar from '../Index/Navbar';
import NavbarInside from '../Index/NavbarInside';
import ExpenseForm from './ExpenseForm';


class BodyPageDetail extends React.Component {

    constructor(props){
        super(props);
        
    }

    render() {
        const {expense} = this.props;

        return (
            <div>
                {expense !== undefined ? 
                    <div className='ui segments'>
                        <div className='segment'>Καλλιέργια {expense.tag_crop_related}</div>
                        <div className='segment'>Ημερομηνία {expense.date_created}</div>
                        <div className='segment'>Aξία {expense.final_value}</div>
                        <div className='segment'>Είναι Πληρωμένο- Ενημερωνει Φπα {expense.tag_paid} - {expense.tag_taxes}</div>
                        <div className='segment'>Κατηγορία {expense.tag_category}</div>
                    </div>  
                :<div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bell fa-fw"></i> Πληροφορίες
                    </div>
                </div>
                }
            </div>
        )
    }
}


class ExpenseDetail extends React.Component {

    constructor(props){
        super(props);
        this.updateExpense = this.updateExpense.bind(this);
        this.state = {
            expense: null,
            doneLoading: false
        }
    }

    loadExpense(id){
        const endpoint = `/api/expenses/${id}/`;
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
                expense: responseData,
                doneLoading: true
            })
        }).catch(function(error){
            console.log('expense error', error)
        })
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.setState({
            expense: null,
            doneLoading: false
        })
        this.loadExpense(id)
        
    }

    updateExpense(){
        const {id} = this.props.match.params;
        this.loadExpense(id);
    }

    render() {
        const {expense} = this.state;
        const {doneLoading} = this.state;
        console.log('status', expense, doneLoading)
        return(
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
                {doneLoading === true ?
                    <h3 className="ui center aligned header">{expense.title}</h3>
                    : <h3 className="ui center aligned header">Stackable Grid</h3>
                }
                
                <div className="ui two column stackable grid">
                    <div className='column'>
                    <div className='segment'>
                        {doneLoading === true && expense !== undefined ?
                            <BodyPageDetail expense={expense} />
                            : <BodyPageDetail  />
                        }
                    </div>
                    </div>

                    <div className='column'>
                    {doneLoading === true && expense !== null ?
                        <ExpenseForm updateExpense={this.updateExpense} expense={expense} />
                        : <p>No Data</p>
                    }
                    </div>

                </div>
            </div>
        )
        
    }
}

export default ExpenseDetail