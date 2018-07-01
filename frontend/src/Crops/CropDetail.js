import React from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';
import Navbar from "../Index/Navbar";
import CropBody from "./detail/CropBody";
import BodyExpense from "./detail/CropExpense";
import BodyIncome from "./detail/CropIncome";



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
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        {doneLoading === true ?
                        <div className="col-lg-12">
                            <h1 className="page-header">{crop.tag_title}</h1>
                        </div>
                        :<div className="col-lg-12">
                            <h1 className="page-header">No Data</h1>
                        </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            {doneLoading === true ?
                                <CropBody crop={crop} />
                                :<p>No data</p>
                            }   
                            {doneLoading === true ?
                                <BodyExpense expenses={expenses} />
                            :<p>No data</p>
                            }     
                        </div>
                        <div className="col-lg-6">
                            {doneLoading === true ?
                            <BodyIncome reports={reports} />    
                        
                            :<p>Something goes wrong! Try again later</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default CropDetail;