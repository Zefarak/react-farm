import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from '../index/Navbar';
import NavbarInside from '../index/NavbarInside';
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
                        <div className='ui segments'>
                            <div className='ui segment'> Καλλιέργια {income.tag_crop_related} </div>
                            <div className='ui segment'> Ημερομηνία {income.timestamp}</div>
                            <div className='ui segment'> Aξία {income.final_value}</div>
                            <div className='ui segment'> Είναι Πληρωμένο- Ενημερωνει Φπα  {income.tag_paid} - {income.have_taxes} </div>
                            <div className='ui segment'> Κατηγορία {income.tag_category}</div>
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
                {doneLoading === true && income !== null ? 
                    <h3 className="ui center aligned header">{income.title}</h3>
                    :<h3 className="ui center aligned header">Stackable Grid</h3>
                } 
                <div className="ui two column stackable grid">
                    <div className='column'>
                    {doneLoading === true ?
                        <BodyIncome income={income} />
                        :<p>No data</p>
                    }
                    </div>
                    <div className='column'>
                        <div className='ui segment'>
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