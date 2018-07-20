import React from 'react';
import 'whatwg-fetch';
import  { Link } from 'react-router-dom';

import cookie from 'react-cookies';
import Navbar from "../Index/Navbar";
import NavbarInside from "../Index/NavbarInside";
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
                <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarInside />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">
                            Imagine-a-Company
                        </h1>
                        <h2>Do whatever you want when you want to.</h2>
                        <div className="ui huge primary button">Get Started <i class="right arrow icon"/></div>
                    </div>
                </div>
                <h3 class="ui center aligned header">Stackable Grid</h3>
                <div class="ui three column stackable grid">
                <div class="column">
                    <div class="ui segment">
                        <h2 className="ui blue header">
                            <i className="list icon" />
                            <div className="content">
                                Λεπτομέριες
                            </div>
                        </h2>
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
                        :<p>oups</p>
                        }
                    </div>
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
                                                <div class="ui fluid inverted blue button">Λεπτομέριες</div>
                                            
                                            </div>
                                        </div>
                                    )
                                })
                            
                            :<p>Δε εχείς προσθέσει καλλίεργίες</p>
                            }
                            <br />
                            <div className="card">
                                <div className="content">
                                    <div className="header">
                                        Νέα Καλλιέργια
                                    </div>           
                                </div>
                                <div class="extra content">
                                    <div class="ui fluid inverted green button">Προσθήκη</div>          
                                </div>
                            </div>
                        </div>
                </div>
                <div className='column'>
                    <div className='ui raised segment'>
                    <FarmForm />     
                    </div> 
                </div>
            </div>
        </div>
   
    )     
    }
}

export default FarmDetail