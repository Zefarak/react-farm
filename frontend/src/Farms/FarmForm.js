import React from 'react'
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from "../Index/Navbar";
import {Link} from "react-router-dom";



class FarmForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMulti = this.handleMulti.bind(this);
        this.state = {
            title: null,
            area: null,
            crops_data: []
        }
    }

    loadCrops() {
        const endpoint = '/api/crops/';
        const thisComp = this;
        
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(endpoint, lookupOptions)
        .then(function(response) {
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                crops_data: responseData
            })
        }).catch(function(error){
            console.log('loadCropsError', error)
        })
    }

    createFarm(data){
        console.log(data);
        const endpoint = '/api/farms/';
        const thisComp = this;
        const csrfToken = cookie.load('csrftoken');
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }
        
        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            console.log('response data', responseData)
            thisComp.props.loadFarms();
        }).catch(function(error){
            console.log('error', error)
        })
    }

    
    handleChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        })
    }

    handleMulti(event) {
        event.preventDefault();
        let key = event.target.name;
        let options = e.target.options;
        let value = []
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              value.push(options[i].value);
            }
          }
        this.setState({
            [key]: value
        })
    }
    

    handleSubmit(event) {
        event.preventDefault();
        let data = this.state;
        this.createFarm(data)
    }



    componentDidMount() {
        this.setState({
            crops: []
        })
        this.loadCrops()
    }

    render() {
        const {farm} = this.props;
        const {crops_data} = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        {farm !== undefined ?
                        <h1 className="page-header">{crop.title}</h1> 
                        : <h1 className="page-header">Δημιουργία Χωραφιού</h1>    
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <form onSubmit={this.handleSubmit} className="form" role="form">
                            <div className="form-group">
                                <label className='control-label'>Τίτλος</label>
                                <input onChange={this.handleChange} name="title" className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <label className='control-label'>Στρέμματα</label>
                                <input onChange={this.handleChange} name="area" className="form-control" type="number" />
                            </div>
                            <div className='form-group'>
                                <select onChange={this.handleMulti} multiple className="form-control" name="crops">
                                    {crops_data.length > 0 ? crops_data.map((crop, index)=>{
                                        return (
                                            <option value={crop.id}>{crop.title}</option>
                                        )
                                    })
                                    : <option value="">No Data</option>
                                    }
                                    
                                </select>
                            </div>
                            <button className="btn-success ">Αποθήκευση</button>
                            <button className='btn btn-warning' >Καθαρισμός</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default FarmForm;