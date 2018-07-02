import React from 'react'
import 'whatwg-fetch';
import cookie from 'react-cookies';
import moment from 'moment';
import {callEndpoint} from '../Index/MyComponent';

class IncomeForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxInput = this.handleCheckboxInput.bind(this);
        this.handleTaxesInput = this.handleTaxesInput.bind(this);
        this.state = {
            timestamp: moment(new Date()).format('YYYY-MM-DD'),
            title: '',
            final_value: 0,
            crops_related: null,
            category: null,
            is_paid: false,
            have_taxes: false,
            crops: [],
            categories:[],
            doneLoading: false
        }
    }

    loadCrops() {
        callEndpoint('/api/crops/', this, 'crops');
    }
        
    loadCategories() {
        callEndpoint('/api/incomes/invoices-category/', this, 'categories');
    }

    updateIncome(data) {
        const {income} = this.props;
        const endpoint = `/api/incomes/${income.id}/`
        const csrfToken = cookie.load('csrftoken');
        const thisComp = this;
        let lookupOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }
        
        fetch(endpoint, lookupOptions)
        .then(function(respose) {
            return respose.json()
        }).then(function(resposeData){
            thisComp.props.updateIncomes()
        })
        .catch(function(error){
            console.log('error updata', error)
        })
    }

    createIncome(data){
        const endpoint = '/api/incomes/invoices/';
        const csrfToken = cookie.load('csrftoken');
        const thisComp = this;
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        };

        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                thisComp.props.updateIncomes()
        }).catch(function (error) {
            console.log('create income error', error)
        })
    }
    

    loadDone(){
        this.setState({
            doneLoading: true
        })
    }

    handleDate(event){
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: moment(value).format('YYYY-MM-DD')
        })
        console.log(this.state)
    }

    handleCheckboxInput(event) {
        this.setState({
            is_paid: !this.state.is_paid
          })
        
    }

    handleTaxesInput(event) {
        this.setState({
            have_taxes: !this.state.have_taxes
          })
        
    }

    handleChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        let data = this.state;
        const {income} = this.props;
        console.log('handle', income)
        if (income !== undefined) {
            this.updateIncome(data)
        } else {
        this.createIncome(data);
        }
    }

    componentDidMount(){
        const {income} = this.props;
        if (income !== undefined && income !== null) {
            this.setState({
                timestamp: moment(income.date_created).format('YYYY-MM-DD'),
                title: income.title,
                final_value: income.final_value,
                crop_related: income.crop_related,
                category: income.category,
                is_paid: income.is_paid,
                have_taxes: income.have_taxes,
                crops: [],
                categories:[],
                doneLoading: false
                
            })
        } else {
            this.setState({
                timestamp: moment(new Date()).format('YYYY-MM-DD'),
                title: '',
                final_value: 0,
                crop_related: null,
                category: null,
                is_paid: false,
                have_taxes: false,
                crops: [],
                categories:[],
                doneLoading: false
            })
        }
        this.loadCrops();
        this.loadCategories();
        this.loadDone();
    }

    render() {
        const {categories} = this.state;
        const {crops} = this.state;
        const {doneLoading} = this.state;
        const {title} = this.state;
        const {timestamp} = this.state;
        const {is_paid} = this.state;
        const {have_taxes} = this.state;
        const {final_value} = this.state
        const {income} = this.props;
        console.log('props', income)
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Δημιουργία Παραστατικού </div>
                <div className="panel-body">
                <form onSubmit={this.handleSubmit} className="form" role="form">
                    <div className="form-group">
                        <label>Ημερομηνία</label>
                        <input 
                            onChange={this.handleDate} 
                            name="timestamp" 
                            type="date" 
                            value={timestamp} 
                            className="form-control" 
                        />
                    </div>
                    <div className="form-group">
                        <label className='control-label'>Τίτλος</label>
                        <input
                            onChange={this.handleChange}
                            name="title"
                            className="form-control"
                            type="text"
                            value={title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Αξία Παραστατικού</label>
                        <input onChange={this.handleChange} name="final_value" type="number" value={final_value} className="form-control" />

                    </div>
                    <div className="form-group">
                        <label>Καλλιέργια</label>
                        <select onChange={this.handleChange} name='crop_related' className="form-control">
                            {income !== undefined ? 
                                <option value={income.crop_related}>{income.tag_crop_related}</option>
                                :<option value>Επιλογή</option>
                            }
                            {doneLoading === true ?
                                crops.map((crop, index)=>{
                                return (
                                    <option value={crop.id}>{crop.tag_name}</option>
                                )
                                })
                                : <option value>No data</option>
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Κατηγορία</label>
                        <select name="category" onChange={this.handleChange} className="form-control">
                            {income !== undefined ? 
                                <option value={income.category}>{income.tag_category}</option>
                            :<option value>Επιλογή</option>
                            }               
                            {doneLoading === true && categories.length > 0 ?
                                categories.map((cate, index)=>{
                                    return (
                                        <option value={cate.id}>{cate.title}</option>
                                    )
                            })
                                :<option value>No data</option>
                            }
                        </select>
                    </div>
                    <div className='form-control'>
                        <label>Πληρωμένο</label>
                        <input type='checkbox' checked={is_paid} name='is_paid' value={is_paid}  onChange={this.handleCheckboxInput}/>
                    </div>
                    <div className='form-control'>
                        <label>Ενημερώνει ΦΠΑ</label>
                        <input type='checkbox' checked={have_taxes} name='have_taxes' value={have_taxes}  onChange={this.handleTaxesInput}/>
                    </div>
                   
                    <br /><br />
                    <button onClick={this.handleSubmit} type="submit" className="btn btn-default">Submit Button</button>
                    <button type="reset" className="btn btn-default">Reset Button</button>
                </form>
                </div>
            </div>
        )
    }
}

export  default IncomeForm;