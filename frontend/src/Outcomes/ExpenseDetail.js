import React from 'react';
import 'whatwg-fetch';
import Navbar from '../Index/Navbar';
import ExpenseForm from './ExpenseForm';


class BodyPageDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            expense: null,
            doneLoading: false
        }
    }


    render() {
        const {expense} = this.props;
        console.log(expense)
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <i className="fa fa-bell fa-fw"></i> {expense}
                </div>
                <div className="panel-body">
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-comment fa-fw"></i> New Comment
                            <span className="pull-right text-muted small"><em>4 minutes ago</em>
                            </span>
                        </a>    
                    </div>
                </div>
            </div>          
        )
    }
}


class ExpenseDetail extends React.Component {

    constructor(props){
        super(props);
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

    render() {
        const {expense} = this.state;
        const {doneLoading} = this.state;
        console.log(expense, 'detail page')
        return(
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Έξοδα</h1>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            {doneLoading === true ?
                                <BodyPageDetail expense={expense.title} />
                            : <BodyPageDetail  />
                            }
                        </div>
                        <div className="col-lg-6">
                            {doneLoading === true ?
                                <ExpenseForm   />
                                : <ExpenseForm />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default ExpenseDetail