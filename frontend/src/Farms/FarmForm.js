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
            },
            credentials: 'include'
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
        const endpoint = `/api/farms/${farm.id}/`;
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
        let value = [];
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
        console.log('posted!');
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
        const {farm} = this.props;
        return (
            <div className="ui modal form_modal">
                <i className="close icon"/>
                <div className="header">
                    {doneLoading && farm !== undefined ? <h4 className='ui header'>Επεξεργασία{farm.title}</h4>:<h4 className='ui header'>Δημιουργία</h4>} 
                </div>
                <form className='ui form'>
                    <div className="image content">   
                        <div className="description">
                            <div className="field">
                                <label>Ονομασία</label>
                                <input type="text" name="title" placeholder="First Name" required />
                            </div>
                            <div className="field">
                                <label>Στρέμματα</label>
                                <input type="number" name="area" placeholder="Τρετραγωνικά Μέτρα" required />
                            </div>
                            <div className="field">
                                <label>Κατάσταση</label>
                                <input type="checkbox" name="active"  />
                            </div>
                            <div className="field">
                                <label>Δημόσιο</label>
                                <input type="checkbox" name="is_public"  />
                            </div>
                            
                        </div>
                        <div className="actions">
                            <div className="ui black deny button"> Nope</div>
                            <div type='submit' className="ui positive right labeled icon button">Yep, that's me<i className="checkmark icon"/></div>
                        </div>
                    </div>
                </form>
            </div>

            
        )
    }
}

export default FarmForm;