import React from 'react';
import 'whatwg-fetch';
import Navbar from '../Index/Navbar';
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
            <div className="panel panel-default">
                <div className="panel-heading">
                    <i className="fa fa-bell fa-fw"></i> Πληροφορίες
                </div>
                <div className="panel-body">
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-comment fa-fw"></i> {expense.tag_crop_related}
                            <span className="pull-right text-muted small"><em>Καλλιέργια</em>
                            </span>
                        </a>    
                    </div>
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-euro fa-fw"></i> {expense.date_created}
                            <span className="pull-right text-muted small"><em>Ημερομηνία</em>
                            </span>
                        </a>    
                    </div>
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-euro fa-fw"></i> {expense.final_value}
                            <span className="pull-right text-muted small"><em>Aξία</em>
                            </span>
                        </a>    
                    </div>
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-paypal fa-fw"></i> {expense.tag_paid} - {expense.tag_taxes}
                            <span className="pull-right text-muted small"><em>Είναι Πληρωμένο- Ενημερωνει Φπα</em>
                            </span>
                        </a>    
                    </div>
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-comment fa-fw"></i> {expense.tag_category}
                            
                            <span className="pull-right text-muted small"><em>Κατηγορία</em>
                            </span>
                        </a>    
                    </div>
                </div>
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
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                            {doneLoading === true ?
                                <h1 className="page-header">{expense.title}</h1>
                            : <h1 className="page-header">No Data</h1>
                            }
                            
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            {doneLoading === true && expense !== undefined ?
                                <BodyPageDetail expense={expense} />
                            : <BodyPageDetail  />
                            }
                        </div>
                        <div className="col-lg-6">
                            {doneLoading === true && expense !== null ?
                                <ExpenseForm updateExpense={this.updateExpense} expense={expense} />
                                : <p>No Data</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default ExpenseDetail