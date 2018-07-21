import React from 'react'
import 'whatwg-fetch';
import cookie from 'react-cookies';
import moment from 'moment';


class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxInput = this.handleCheckboxInput.bind(this);
        this.handleCheckbox_Input = this.handleCheckbox_Input.bind(this);
        this.state = {
            date_created: moment(new Date()).format('YYYY-MM-DD'),
            title: '',
            final_value: 0,
            crops_related: null,
            category: null,
            is_paid: false,
            is_taxes: false,
            crops: [],
            expenses_cate:[],
            doneLoading: false
        }
    }

    loadCrops() {
        const endpoint = '/api/crops/';
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                thisComp.setState({
                    crops: responseData
                })
        }).catch(function (error) {
            console.log('crops error', error)
        })
    }

    loadCategories() {
        const endpoint = '/api/expense/category/';
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                thisComp.setState({
                    expenses_cate: responseData
                })
        }).catch(function (error) {
            console.log('crops error', error)
        })
    }

    updateExpense(data) {
        const {expense} = this.props;
        const endpoint = `/api/expenses/${expense.id}/`
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
            thisComp.props.updateExpense()
        })
        .catch(function(error){
            console.log('error updata', error)
        })
    }

    createExpense(data){
        const endpoint = '/api/expenses/';
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
                thisComp.props.updateExpenses()
        }).catch(function (error) {
            console.log('create expense error', error)
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
    handleCheckbox_Input(event) {
        this.setState({
            is_taxes: !this.state.is_taxes
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
        const {expense} = this.props;
        console.log('handle', expense)
        if (expense !== undefined) {
            this.updateExpense(data)
        } else {
        this.createExpense(data);
        }
    }

    componentDidMount(){
        const {expense} = this.props;
        if (expense !== undefined) {
            this.setState({
                date_created: moment(expense.date_created).format('YYYY-MM-DD'),
                title: expense.title,
                final_value: expense.final_value,
                crops_related: expense.crops_related,
                category: expense.category,
                is_paid: expense.is_paid,
                is_taxes: expense.is_taxes,
                crops: [],
                expenses_cate:[],
                doneLoading: false
                
            })
        } else {
            this.setState({
                date_created: moment(new Date()).format('YYYY-MM-DD'),
                title: '',
                final_value: 0,
                crops_related: null,
                category: null,
                is_paid: false,
                is_taxes: false,
                crops: [],
                expenses_cate:[],
                doneLoading: false
            })
        }
        this.loadCrops();
        this.loadCategories();
        this.loadDone();
    }

    render() {
        const {expenses_cate} = this.state;
        const {crops} = this.state;
        const {doneLoading} = this.state;
        const {title} = this.state;
        const {date_created} = this.state;
        const {is_paid} = this.state;
        const {is_taxes} = this.state;
        const {final_value} = this.state
        const {expense} = this.props;
        console.log(is_paid, is_taxes, 'rg')
        return (
                <div className="ui segment">
                <form onSubmit={this.handleSubmit} className="ui form" role="form">
                    <div className="form-group">
                        <label>Ημερομηνία</label>
                        <input 
                            onChange={this.handleDate} 
                            name="date_created" 
                            type="date" 
                            value={date_created} 
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
                            {expense !== undefined ? 
                                <option value={expense.crop_related}>{expense.tag_crop_related}</option>
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
                            {expense !== undefined ? 
                                <option value={expense.category}>{expense.tag_category}</option>
                            :<option value>Επιλογή</option>
                            }               
                            {doneLoading === true && expenses_cate.length > 0 ?
                                expenses_cate.map((cate, index)=>{
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
                        <input type='checkbox' checked={is_taxes} name='is_taxes' value={is_taxes}  onChange={this.handleCheckbox_Input}/>
                    </div>
                   
                    <br /><br />
                    <button onClick={this.handleSubmit} type="submit" className="ui green icon button"><i className='save icon' /> Αποθήκευση</button>
                    
                </form>
            </div>

        )
    }
}

export  default ExpenseForm;