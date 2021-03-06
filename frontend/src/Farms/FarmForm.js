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
        this.handlePublicCheckBox = this.handlePublicCheckBox.bind(this);
        this.handleStatusCheckBox = this.handleStatusCheckBox.bind(this);
        this.handleMulti = this.handleMulti.bind(this);
        this.state = {
            title: '',
            active: false,
            is_public: false,
            area: '',
            crops: [],
            doneLoading: false
        }
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
        };
        
        fetch(endpoint, lookupOptions)
          .then(function(response){
              return response.json()
          }).then(function(responseData){
              console.log('create data', responseData);
              thisComp.props.reloadFarms();
              thisComp.clearForm()
          }).catch(function(error){
              console.log("error", error);
              alert("An error occured, "+ error)
          })
    }

    updateFarm(data) {
        const {farm} = this.props;
        const endpoint = `/api/farms/${farm.id}/`;
        const thisComp = this;
        const csrfToken = cookie.load('csrftoken');
        let lookupOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        };

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.props.reloadData();
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

    clearForm(){
        this.setState({
            title: '',
            area: 0,
            active: false,
            is_public: false
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
            console.log('print!');
            this.createFarm(data)
        }
        
         
    }

    handlePublicCheckBox(event){

        this.setState({
            is_public: !this.state.is_public
        })
    }

    handleStatusCheckBox(event){
        this.setState({
            active: !this.state.active
        })
    }

    componentDidMount() {
        const {farm} = this.props;
        if (farm !== undefined) {
            this.setState({
                title: farm.title,
                area: farm.area,
                crops: farm.crops,
                active: farm.active,
                is_public: farm.is_public,
                doneLoading: false
            })
        } else {
            this.setState({
                crops: [],
                title: '',
                area: '',
                active: false,
                is_public: false,
                doneLoading: false
            })  
        }
    }

    render() {
        const {title} = this.state;
        const {area} =  this.state;
        const {state} = this;
        const {doneLoading} = this.state;
        const {farm} = this.props;
        console.log('render', state);
        return (
                <form className='ui form'>
                    <div className="field">
                        <label>Ονομασία</label>
                        <input 
                            type="text" 
                            name="title" 
                            onChange={this.handleChange} 
                            value={title}
                            placeholder="First Name" 
                            required 
                        />
                    </div>
                    <div className="field">
                        <label>Στρέμματα</label>
                        <input 
                            type="number" 
                            name="area" 
                            onChange={this.handleChange}
                            value={area}
                            placeholder="Τρετραγωνικά Μέτρα" 
                            required
                        />
                    </div>            
                    <div className="field">
                        <label>Κατάσταση</label>
                        <input
                            type="checkbox"
                            name="active"
                            onChange={this.handleStatusCheckBox}
                            value={state.active}
                        />
                    </div>
                    <div className="field">
                        <label>Δημόσιο</label>
                        <input 
                            type="checkbox"
                            name="is_public" 
                            onChange={this.handlePublicCheckBox}
                            value={state.is_public}
                        />
                    </div>
                    <div onClick={this.handleSubmit} type='submit' className="ui positive right labeled icon button">Αποθήκευση<i className="checkmark icon"/></div>
                </form>
            )
    }
}

export default FarmForm;