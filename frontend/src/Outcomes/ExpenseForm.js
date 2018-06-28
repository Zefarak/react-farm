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
        this.state = {
            crops: [],
            expenses_cate:[],
            doneLoading: false,
            date_created: moment(new Date()).format('YYYY-MM-DD'),
            title: null,
            final_price: null,
            crops_related: null,
            category: null
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
                thisComp.props.loadExpenses()
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

    handleChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        });
        console.log(this.state)
    }

    handleSubmit(event){
        event.preventDefault();

        let data = this.state;
        this.createExpense(data);

        console.log('load data', data)
    }

    componentDidMount(){
        this.setState({
            crops: [],
            expenses_cate:[],
            doneLoading: false,
            date_created: moment(new Date()).format('YYYY-MM-DD'),
            title: '',
            final_price: '',
            crops_related: '',
            category: ''

        });
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
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Δημιουργία Παραστατικού </div>
                <div className="panel-body">
                <form onSubmit={this.handleSubmit} className="form" role="form">
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
                        <input onChange={this.handleChange} name="final_value" type="number" className="form-control" />

                    </div>
                    <div className="form-group">
                        <label>Καλλιέργια</label>
                        <select onChange={this.handleChange} name='crop_related' className="form-control">
                            <option value>Επιλογή</option>
                            {doneLoading === true ?
                                crops.map((crop, index)=>{
                                return (
                                    <option value={crop.id}>{crop.crop_slug}</option>
                                )
                                })
                                : <option value>No data</option>
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Κατηγορία</label>
                        <select name="category" onChange={this.handleChange} className="form-control">
                            <option value>Επιλογή</option>
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

                    <button onClick={this.handleSubmit} type="submit" className="btn btn-default">Submit Button</button>
                    <button type="reset" className="btn btn-default">Reset Button</button>
                </form>
                </div>
            </div>
        )
    }
}

export  default ExpenseForm;