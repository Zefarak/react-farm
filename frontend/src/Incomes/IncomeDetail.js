import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from '../index/Navbar';
import IncomeForm from './IncomesForm'
import {Link} from 'react-router-dom';




class BodyIncome extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const {income} = this.props;
        return (
            <div>
            {income !== undefined && income !== null ? 
            <div className="panel panel-default">
                <div className="panel-heading">
                    <i className="fa fa-bell fa-fw"></i> Πληροφορίες
                </div>
                <div className="panel-body">
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-comment fa-fw"></i> {income.tag_crop_related}
                            <span className="pull-right text-muted small"><em>Καλλιέργια</em>
                            </span>
                        </a>    
                    </div>
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-euro fa-fw"></i> {income.timestamp}
                            <span className="pull-right text-muted small"><em>Ημερομηνία</em>
                            </span>
                        </a>    
                    </div>
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-euro fa-fw"></i> {income.final_value}
                            <span className="pull-right text-muted small"><em>Aξία</em>
                            </span>
                        </a>    
                    </div>
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-paypal fa-fw"></i> {income.tag_paid} - {income.have_taxes}
                            <span className="pull-right text-muted small"><em>Είναι Πληρωμένο- Ενημερωνει Φπα</em>
                            </span>
                        </a>    
                    </div>
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-comment fa-fw"></i> {income.tag_category}
                            
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





class IncomeDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            income: null,
            doneLoading: false
        }
    }

    loadIncome(id){
        const endpoint = `/api/incomes/invoices-detail/${id}/`;
        const thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        
        fetch(endpoint, lookupOption)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                income: responseData,
                doneLoading: true
            })
        }).catch(function(error){
            console.log('error', error)
        })
    }


    componentDidMount(){
        this.setState({
            income: null,
            doneLoading: false
        })
        const {id} = this.props.match.params;
        this.loadIncome(id)
        
    }

    render(){
        const {doneLoading} = this.state;
        const {income} = this.state;
        return (
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                        {doneLoading === true && income !== null ? 
                            <h1 className="page-header">{income.title}</h1>
                        :<h1 className="page-header">Oups something is wrong</h1>
                        } 
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            {doneLoading === true ?
                                <BodyIncome income={income} />
                            :<p>No data</p>
                            }
                        </div>
                        <div className="col-lg-4">
                            {doneLoading === true ?
                            <IncomeForm income={income}  />
                            :<p>Oups something wrong with the form!</p>
                            }    
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    
}

export default IncomeDetail;