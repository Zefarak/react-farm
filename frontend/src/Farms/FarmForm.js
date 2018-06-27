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
            title: '',
            area: '',
            crops: [],
            crops_data: [],
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
            }
        }

        fetch(endpoint, lookupOptions)
        .then(function(response) {
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                crops_data: responseData,
                doneLoading: true
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
              
          }).catch(function(error){
              console.log("error", error)
              alert("An error occured, please try again later.")
          })
    }

    updateFarm(data) {
        const {farm} = this.props;
        const endpoint = `/api/farms/${farm.i}/`;
        const thisComp = this;
        const csrfToken = cookie.load('csrftoken')
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
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            
        }).catch(function(error){
            console.log('error update', error)
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
        console.log('posted!')
        let data = this.state;
        const {farm} = this.props;
        if (farm !== undefined) {
            this.updateFarm(data)
        } else {
            this.createFarm(data)
        }   
    }



    componentDidMount() {
        const {farm} = this.props;
        if (farm !== undefined) {
            this.setState({
                title: farm.title,
                area: farm.area,
                crops: farm.crops, 
                doneLoading: false
            })
        } else {
            this.setState({
                crops: [],
                title: '',
                area: '',
                doneLoading: false
            })  
        }
        this.loadCrops()
    }

    render() {
        const {crops_data} = this.state;
        const {title} = this.state;
        const {area} =  this.state;
        const {doneLoading} = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        {title !== '' ?
                        <h1 className="page-header">{title}</h1> 
                        : <h1 className="page-header">Δημιουργία Χωραφιού</h1>    
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <form onSubmit={this.handleSubmit} className="form" role="form">
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
                                <label className='control-label'>Στρέμματα</label>
                                <input
                                 onChange={this.handleChange} 
                                 name="area" 
                                 className="form-control" 
                                 type="number" 
                                 value={area}
                                 />
                            </div>
                            <div className='form-group'>
                                <label className='control-label'>Δημόσιο</label>
                                <input name='active' className='form-control' type='checkbox' />
                            </div>
                            <button onClick={this.handleSubmit} className="btn-success ">Αποθήκευση</button>
                            <button className='btn btn-warning' >Καθαρισμός</button>
                        </form>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default FarmForm;