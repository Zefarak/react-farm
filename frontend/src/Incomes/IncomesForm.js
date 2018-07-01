import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import moment from 'moment';

import {callEndpoint, sentEndpoint} from '../Index/MyComponent';


class IncomeForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHaveTaxes = this.handleHaveTaxes.bind(this);
        this.handleIsPaid = this.handleIsPaid.bind(this);
        this.state = {
            crops: [],
            categories: [],
            doneLoading: false,
            title: null,
            is_paid: false,
            category: null,
            crop_related: null,
            final_value: 0,
            have_taxes: false,
            timestamp: moment(new Date()).format('YYYY-MM-DD')
        }
    }

    loadCrop(){
        let result = callEndpoint('/api/crops/')
        console.log('crop result', result)
        if (result !== null){
            this.setState({
                crops: result
            })
        }
    }

    loadCategories(){
        let result = callEndpoint('/api/incomes/invoices-category/')
        if (result !== null){
            this.setState({
                categories: result
            })
        }
    }

    postData(data){
        let result = sentEndpoint('/api/incomes/invoices/', 'POST', data)
        if (result !== null){
            console.log('works!')
        }
    }


    handleIsPaid(event) {
        this.setState({
            is_paid: !this.state.is_paid
          })
    }

    handleHaveTaxes(event){
        this.setState({
            have_taxes: !this.state.have_taxes
          })
    }

    handleChange(event) {
        event.preventDefault();
        let key = event.target.key;
        let value = event.target.value;
        this.setState({
            [key]: value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let data = this.state;
        this.postData(data)
    }

    componentDidMount() {
        this.setState({
            crops: [],
            categories: []
        })
        this.loadCrop();
        this.loadCategories()
        this.setState({
            doneLoading: true
        })
    }

    render() {
        const {income} = this.props;
        const {crops} = this.state;
        const {categories} = this.state;
        const {doneLoading} = this.state;
        const state = this.state;

        return(
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
                            value={state.timestamp} 
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
                            value={state.title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Αξία Παραστατικού</label>
                        <input onChange={this.handleChange} name="final_value" type="number" value={state.final_value} className="form-control" />

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
                        <input type='checkbox' checked={state.is_paid} name='is_paid' value={state.is_paid}  onChange={this.handleIsPaid}/>
                    </div>
                    <div className='form-control'>
                        <label>Ενημερώνει ΦΠΑ</label>
                        <input type='checkbox' checked={state.have_taxes} name='have_taxes' value={state.have_taxes}  onChange={this.handleHaveTaxes}/>
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

    export default IncomeForm;