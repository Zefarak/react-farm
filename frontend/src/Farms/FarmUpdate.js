import React, {Component} from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import moment from 'moment';

class FarmUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.state = {
            data: {
                'farm': null,
                'title': null,
                'area': null,
                'active': false,
                'data': null
            }
        }
    }

    updatePost(data){
        const {farm} =this.props;
        const endpoint = `/api/farms/slug/${farm.slug}`;
        const csrfToken = cookie.load('csrftoken');
        let thisComp = this;
        let lookupOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),


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
        console.log(event);
        let data = this.state;
        this.updatePost(data)
    }

    componentDidMount(){
        const {farm} = this.props;
        if (farm !== undefined) {
            this.setState({
                farm: farm,
                title: farm.title,
                area: farm.area,
                active: farm.active,
                date_test: farm.date_test
            })
        } else {
            this.setState({
                title: null,
                area:40,
                active: false,
                date_test: moment().format('YYYY'-'MM'-'DD')
            })
        }
        }


    render() {
        const {date_test} = this.state;
        const {area} = this.state;
        const {title} = this.state;

        return (
            <form method='POST' className='form'>
                <div className='form-control'>
                    <input onChange={this.handleInputChange} type='text' value={title} name='title' placeholder='Title' required />
                </div>
                <div className='form-control'>
                    <label for='area'>Area</label>
                    <input onChange={this.handleInputChange} type='text' value={area} name='Area' placeholder='50' required />
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
        )
    }
}


export default FarmUpdate