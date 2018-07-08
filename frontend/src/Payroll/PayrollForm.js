import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import moment from 'moment'


class PayrollForm extends React.Component{

    constructor(props){
        super(props);
        this.handleCheckboxInput = this.handleCheckboxInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);

        this.state = {
            date_end: moment(new Date()).format('YYYY-MM-DD'),
            title: null,
            final_value:0,
            is_paid: false,
            crop_related: null,
            is_taxes: false,
            category: null,
            doneLoading:false
        }
    }

    createPayroll(data){
        const endpoint = '/api/payroll/';
        const csrfToken = cookie.load('csrftoken');
        const thisComp = this;
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify(data)
        };

        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                thisComp.props.updateData()
        }).catch(function (error) {
            console.log('create error', error)

        })
    }

    updatePayroll(data){
        const {payroll} = this.props;
        const endpoint = `/api/payroll/${payroll.id}/`;
        const csrfToken = cookie.load('csrftoken');
        const thisComp = this;
        let lookupOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify(data)
        };

        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {

        }).catch(function (error) {
            console.log('create error', error)

        })
    }

    cleanForm(){
        this.setState({
            date_end: moment(new Date()).format('YYYY-MM-DD'),
            title: null,
            final_value:0,
            is_paid: false,
            crop_related: null,
            is_taxes: false,
            category: null,
        })
    }

    handleChange(event){
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        })
    }

    handleCheckboxInput(event){
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: !this.state.key
        })
    }

    handleSubmit(event){
        const {payroll} = this.props;
        if (payroll !== undefined){

        }
        event.preventDefault();
        let data = this.state;
        this.createPayroll(data);
        this.cleanForm()
    }

    handleDate(event){
        event.preventDefault();
        let value = event.target.value;
        this.setState({
            date_end: moment(value).format('YYYY-MM-DD')
        })
    }

    componentDidMount(){
        this.setState({
            crops: [],
            categories: []
        });
        const {payroll} = this.props;
        if (payroll !== undefined){
            this.setState({
                date_end: moment(payroll.date_end).format('YYYY-MM-DD'),
                title: payroll.title,
                final_value: payroll.final_value,
                is_paid: payroll.is_paid,
                crop_related: payroll.crop_related,
                is_taxes: payroll.is_taxes,
                category: payroll.category
            })
        } else {
        this.setState({
            date_end: moment(new Date()).format('YYYY-MM-DD'),
            title: null,
            final_value: 0,
            is_paid: false,
            crop_related: null,
            is_taxes: false,
            category: null
        })
        }

        this.setState({
            crops: this.props.crops,
            categories: this.props.categories,
            doneLoading: true
        })
    }

    render() {
        const {state} = this;
        const {categories} = this.props;
        const {crops} = this.props;
        const {doneLoading} = this.state;

        return (
            <div className="panel panel-default">
                <div className="panel-heading">Δημιουργία Παραστατικού</div>
                <div className="panel-body">
                    <form onSubmit={this.handleSubmit} className="form" role="form">
                        <div className="form-group">
                            <label>Ημερομηνία</label>
                            <input
                                onChange={this.handleDate}
                                name="date_end"
                                type="date"
                                value={state.date_end}
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
                            <input onChange={this.handleChange} name="final_value" type="number"
                                   value={state.final_value} className="form-control"/>

                        </div>
                        <div className="form-group">
                            <label>Καλλιέργια</label>
                            <select onChange={this.handleChange} name='crop_related' className="form-control">
                                {payroll !== undefined ?
                                    <option value={payroll.crop_related}>{payroll.tag_crop_related}</option>
                                    : <option value>Επιλογή</option>
                                }
                                {doneLoading === true ?
                                    crops.map((crop, index) => {
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
                                {payroll !== undefined ?
                                    <option value={payroll.category}>{payroll.tag_category}</option>
                                    : <option value>Επιλογή</option>
                                }
                                {doneLoading === true && categories.length > 0 ?
                                    categories.map((cate, index) => {
                                        return (
                                            <option value={cate.id}>{cate.title}</option>
                                        )
                                    })
                                    : <option value>No data</option>
                                }
                            </select>
                        </div>
                        <div className='form-control'>
                            <label>Πληρωμένο</label>
                            <input type='checkbox' checked={state.is_paid} name='is_paid' value={state.is_paid}
                                   onChange={this.handleCheckboxInput}/>
                        </div>
                        <div className='form-control'>
                            <label>Ενημερώνει ΦΠΑ</label>
                            <input type='checkbox' checked={state.is_taxes} name='is_taxes' value={state.is_taxes}
                                   onChange={this.handleTaxesInput}/>
                        </div>

                        <br /><br />
                        <button onClick={this.handleSubmit} type="submit" className="btn btn-default">Submit Button</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default PayrollForm