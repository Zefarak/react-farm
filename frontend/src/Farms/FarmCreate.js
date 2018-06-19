import React, {Component} from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import moment from 'moment';
import Navbar from '../Index/Navbar';

class FarmCreate extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.state = {
            data: {
                'title': null,
                'area': null,
                'active': false,
                'data': null
            }
        }
    }

    createFarm(data){
        const endpoint = 'api/farms/create';
        const csrfToken = cookie.load('csrftoken');
        console.log(csrfToken);
        let thisComp = this;
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data)
            
        };
        fetch(endpoint, lookupOptions).then(function (response) {
            return response.json()
        }).then(function(responseData) {

        }).catch(function (error) {
            console.log('error', error)
        })
    }

    handleInputChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value,
            [event.target.name]: event.target.value
        });
        console.log(key, value)
    }

    handleCheckboxChange(event) {
        event.preventDefault();
        this.setState({
            active: !this.state.active
        });
        console.log(event)

    }

    handleSubmit(event){
        event.preventDefault();
        let data = this.state;
        this.createFarm(data)
    }

    componentDidMount(){

        this.setState({
            title: null,
            area:40,
            active: false,
            date_test: moment().format('YYYY'-'MM'-'DD')
        })
    }


    render() {
        const {date_test} = this.state;
        return (
            <div className='wrapper'>
                <Navbar />
                <div className="row">
                    <h4>Δημιούργησε νέο χωράφι</h4>
                </div>
                <div className='row'>
                    <div className='col-lg-6'>
                        <form method='POST' className='form'>
                            <div className='form-control'>
                                <input onChange={this.handleInputChange} type='text' name='title' placeholder='Title' required />
                            </div>
                            <div className='form-control'>
                                <label for='area'>Area</label>
                                <input onChange={this.handleInputChange} type='text' name='Area' placeholder='50' required />
                            </div>
                            <div className='form-control'>
                                <label for='active'>Status</label>
                                <input onChange={this.handleCheckboxChange} type='checkbox' name='active' value={this.state.active} required />
                            </div>
                            <div className="form-control">
                                <label>Date test</label>
                                <input onChange={this.handleInputChange} type="date" name="date_test" value={date_test}  />
                            </div>
                            <button onClick={this.handleSubmit} className='btn btn-success'>Save</button>
                        </form>
                    </div>
                </div>
            </div>
            
        )
    }
}


export default FarmCreate