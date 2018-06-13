import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';


class FarmCreate extends React.Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            data: {
                'title': null,
                'area': null,
                'active': false
            }
        }
    }

    createFarm(){
        const endpoint = 'api/farms/create/';
        const csrfToken = cookie.load('csrftoken')
        let lookupOptions = {
            method: 'POST',
            
        }
    }

    handleInputChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value,
            [event.target.name]: event.target.value
        })
        console.log(key, value)
    }

    render() {
        return (
            <form method='POST' className='form'>
                <div className='form-control'>
                    <input onChange={this.handleInputChange} type='text' name='title' placeholder='Title' required />
                </div>
                <div className='form-control'>
                    <label for='area'>Area</label>
                    <input onChange={this.handleInputChange} type='text' name='Area' placeholder='50' required />
                </div>
                <div  className='form-control'>
                    <label for='area'>Status</label>
                    <input onChange={this.handleInputChange} type='checkbox' name='active' required />
                </div>
                <button className='btn btn-success'>Save</button>
            </form>
        )
    }
}


export default FarmCreate