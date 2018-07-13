import React from 'react'
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from "../Index/Navbar";
import {Link} from "react-router-dom"
import FarmForm from './FarmForm';


class FarmsPage extends React.Component {
    constructor(props) {
        super(props);
        this.loadFarms = this.loadFarms.bind(this);
        this.reloadFarms = this.reloadFarms.bind(this)
        this.state = {
            farms: [],
            doneLoading: false
        }
    }

    loadFarms() {
        const endpoint = '/api/farms/';
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
                farms: responseData,
                doneLoading: true
            })
        }).catch(function(error){
            console.log("error", error)
        })
    }

    reloadFarms(){
        this.loadFarms()
    }

    componentDidMount() {
        this.setState({
            farms: [],
            doneLoading: false
        });
        this.loadFarms()
    }

    render() {
        const {doneLoading} = this.state;
        const {farms} = this.state;

        return (
            <div>
                <FarmForm reloadFarms={this.reloadFarms} />
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
                        <h1 className="ui inverted header">
                            Imagine-a-Company
                        </h1>
                        <h2>Do whatever you want when you want to.</h2>

                        
                        </div>
                        <button class="ui huge primary button create_btn form_modal" type="button" id="form_modal">Δημιουργία Χωραφιού</button>
                        </div>
            
                <div class="ui grid container">
                    <div className='row'>
                        <h3 className='ui header'>Διάλεξε Χωράφι</h3>
                    </div>
                    <div className='row'>
                        <div className="ui cards">
                            {doneLoading === true && farms !== null ?
                            farms.map((farm)=>{
                                return(
                                    <div className="blue card">
                                        <div className="content">
                                        <div className="header">{farm.title}</div>
                                        <div className="description">
                                            Στρέμματα  {farm.area}
                                        </div>
                                        </div>
                                        <Link to={{
                                            pathname: `/farms/${farm.id}/`
                                        }}>
                                        <div className="ui bottom attached blue button">
                                        <i class="edit icon"></i>
                                        Επεξεργασία
                                        </div>
                                        </Link>
                                    </div>
                                )
                            })
                        : 
                        <p>oups</p>
                        }
                            
                        
                            
                        </div>
                    </div>
                </div>
                </div>

            
        )
    }
}


export default FarmsPage