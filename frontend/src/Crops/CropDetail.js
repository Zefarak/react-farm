import React from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';
import Navbar from "../Index/Navbar";
import NavbarInside from '../Index/NavbarInside';
import CropBody from "./detail/CropBody";
import BodyExpense from "./detail/CropExpense";
import BodyIncome from "./detail/CropIncome";
import CropForm from "./CropForm";


class CropDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            reports: null,
            incomes: [],
            crop: null,
            doneLoading: false
        }
    }


    loadExpenses(id){
        const endpoint = `/api/expenses/?category=&crop_related=${id}`
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
                expenses: responseData
            })
        }).catch(function(error){
            console.log('error', error)
        })
    }

    loadIncomes(id) {
        const endpoint = `/api/incomes/invoices/`
        const thisComp = this;
        const lookupOption = {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOption)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                incomes: responseData
            })
        }).catch(function(error){
            console.log('error load income', error)
        })
    }

    loadReport(id){
        const endpoint = `/api/reports/crops/${id}`
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
        }).then(function(resposeData){
            thisComp.setState({
                reports: resposeData
            })
        }).catch|(function(error){
            console.log('error report', error)
        })
    }

    loadCrop(id){
        const endpoint = `/api/crops/${id}/`
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
                crop: responseData,
                doneLoading: true
            })
            
        }).catch(function(error){
            console.log('error', error)
        })
    }


    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({
            crop: null,
            expenses: [],
            doneLoading: false,
            reports: []
        })
        this.loadCrop(id);
        this.loadReport(id);
        this.loadExpenses(id);
        
    }

    render() {
        const {crop} = this.state;
        const {expenses} = this.state;
        const {doneLoading} = this.state;
        const {reports} = this.state;
        return (
            <div>
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarInside />
                    </div>
                    <div className="ui text container">
                        {doneLoading === true ?
                            <h1 className="ui inverted header">
                                {crop.tag_title}
                            </h1>
                            :<h1 className="ui inverted header">oups</h1>
                        }
                        <h2>Do whatever you want when you want to.</h2>
                        <div className="ui huge primary button">Get Started <i class="right arrow icon"/></div>
                    </div>
                </div>
                <h3 class="ui center aligned header">Καλλιέργιες</h3>

                <div class="ui three column stackable grid">

                    <div class="column">
                        <div class="ui segment">
                        {doneLoading === true ?
                            <div>
                                <CropBody crop={crop} />
                                <BodyExpense expenses={expenses} />
                            </div>
                            :<p>No data</p>
                            }  
                        </div>
                    </div>

                    <div class="column">
                        <div class="ui segment">
                        {doneLoading === true ?
                            <BodyIncome reports={reports} />    
                            :<p>Something goes wrong! Try again later</p>
                        }
                        </div>
                    </div>

                    <div class="column">
                        <div class="ui segment">
                            {doneLoading === true ? 
                                <CropForm crop={crop} />
                            :<p>ht</p>
                            }   
                        </div>
                    </div>                
                </div>
            </div>
        )

    }
}

export default CropDetail;