import React from 'react';
import 'whatwg-fetch';
import  { Link } from 'react-router-dom';

import cookie from 'react-cookies';
import Navbar from "../Index/Navbar";
import FarmForm from "./FarmForm";

class FarmDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            farm: null,
            crops: [],
            doneLoading: false
        }
    }

    loadFarm(id){
        const endpoint = `/api/farms/${id}/`;
        let thisComp = this;
        let lookupOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'

        };

        fetch(endpoint, lookupOptions)
        .then(function (response) {
            return response.json()
        }).then(function(responseData){
            console.log(responseData);
            thisComp.setState({
                farm: responseData,
                doneLoading: true
            })
        }).catch(function(error){
            console.log("error", error)
        })
    }

    componentDidMount() {
        const {id} = this.props.match.params
        this.setState({
            farm: null,
            doneLoading:false
        })
        this.loadFarm(id)
    }

    render(){
        const {farm} = this.state;
        const {doneLoading} = this.state;
        return (
            <div>
                <FarmForm />
                <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <div className="ui large secondary inverted pointing menu">
                            <a className="toc item">
                                <i className="sidebar icon"/>
                            </a>
                            <a className="item">Home</a>
                            <a className="active item">Χωράφια</a>
                            <a className="item">Καλλιέργιες</a>
                            <a className="item">Έσοδα</a>
                            <a className="item">Έξοδα</a>
                            <a className="item">Reports</a>
                            <div className="right item">
                                <a className="ui inverted button">Log in</a>
                                <a className="ui inverted button">Sign Up</a>
                            </div>
                        </div>
                    </div>
                        <div className="ui text container">
                        {farm !== null ?
                        <h1 className="ui inverted header">
                             {farm.title}
                        </h1>
                        : <p>oups</p>}
                        <h2>Do whatever you want when you want to.</h2>

                    
                    </div>
                    <button class="ui huge primary button create_btn" type="button" id="form_modal">Επεξεργασία</button>
                    </div>
        
            <div class="ui grid container"> 
                <div className='row'>
                <h2 className="ui center aligned icon header">
                    <i className="circular users icon"/>Λεπτομέριες
                </h2>
            </div>
            <div className='two column row'>
                <div className='column'>
                    {doneLoading === true && farm !== null ?
                    <div className="ui segments">
                        <div className="ui segment">
                            <p>Στρέμματα {farm.area}</p>
                        </div>
                        <div className="ui segment">
                            <p>Κατάσταση {farm.tag_is_active}</p>
                        </div>
                        <div className="ui segment">
                            <p>Δημόσιο {farm.tag_is_public}</p>
                        </div>
                    </div>
                    :<p>oups</p>}
                </div>
                <div className='center aligned column'>
                    <h4 className='ui header'> Καλλιέργιες</h4>
                    <div className='ui center aligned cards'>
                        {doneLoading === true && farm !== null?
                            farm.crops_related.map((crop)=>{
                                return(
                                    <div className=" center aligned card">
                                        <div className="content">
                                            <div className="header">
                                                {crop.tag_title}
                                            </div>
                                            <div className="description">
                                                Στρέμματα... {crop.area}  , Ποσότητα Δέντρων... {crop.qty}
                                            </div>
                                        </div>
                                        <div class="extra content">
                                            <div class="ui basic blue button">Λεπτομέριες</div>
                                        
                                        </div>
                                    </div>
                                )
                            })
                        
                        :<p>Δε εχείς προσθέσει καλλίεργίες</p>}
                        <div className="card">
                            <div className="content">
                                <div className="header">
                                    Νέα Καλλιέργια
                                </div>           
                            </div>
                            <div class="extra content">
                                <div class="ui basic green button">Προσθήκη</div>          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>    
        )
       
    }
}

export default FarmDetail