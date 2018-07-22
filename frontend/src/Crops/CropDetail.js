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
        this.reloadData = this.reloadData.bind(this);
        this.state = {
            expenses: [],
            reports: null,
            incomes: [],
            crop: null,
            doneLoading: false
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({
            crop: null,
            expenses: [],
            doneLoading: false,
            reports: []
        });
        this.loadCrop(id);
        this.loadReport(id);
        this.loadExpenses(id);

    }

    loadExpenses(id){
        const endpoint = `/api/expenses/?category=&crop_related=${id}`;
        const thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

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
        const endpoint = `/api/incomes/invoices/`;
        const thisComp = this;
        const lookupOption = {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

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
        const endpoint = `/api/reports/crops/${id}`;
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
        }).then(function(resposeData){
            thisComp.setState({
                reports: resposeData
            })
        }).catch|(function(error){
            console.log('error report', error)
        })
    }

    loadCrop(id){
        const endpoint = `/api/crops/${id}/`;
        const thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

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


    reloadData(){
        const {id} = this.props.match.params;
        this.loadCrop(id)
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
                        <h2>Έσοδα - Έξοδα, Πληροφορίες</h2>
                        <br />
                    </div>
                </div>

                <h3 className="ui center aligned header">Δεδομένα</h3>
                <div className="ui three column stackable grid">

                    <div className="column">
                        <div className="ui segment">
                        {doneLoading === true ?
                            <div>
                                <CropBody crop={crop} />
                                <BodyExpense expenses={expenses} />
                            </div>
                            :<p>No data</p>
                            }  
                        </div>
                    </div>

                    <div className="column">
                        <div className="ui raised segment">
                        {doneLoading === true ?
                            <BodyIncome reports={reports} />    
                            :<p>Something goes wrong! Try again later</p>
                        }
                        </div>
                    </div>

                    <div className="column">
                        <div className="ui segment">
                            {doneLoading === true && crop !== null ?
                                <CropForm crop={crop} reloadData={this.reloadData} />
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