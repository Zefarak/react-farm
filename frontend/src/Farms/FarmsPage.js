import React from 'react'
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from "../Index/Navbar";
import NavbarInside from "../Index/NavbarInside";
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
               <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarInside />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">
                            Χωράφια
                        </h1>
                        <h2>Πληροφοριες - Δημιουργία</h2>
                        <br /> <br />
                    </div>
                </div>
                <h3 className="ui center aligned header">Δεδομένα</h3>
                <div className="ui stackable grid">
                <div className="ten wide column">
                    <div className="ui segment">
                        <h2 className="ui blue header">
                            <i className="list icon" />
                            <div className="content">
                                Λίστα
                            </div>
                        </h2>
                        <div className="ui cards">
                            {doneLoading === true && farms !== null ?
                            farms.map((farm)=>{
                                return(
                                    <div className="ui card">
                                        <div className="content">
                                            <div className="header">{ farm.title }</div>
                                        </div>
                                        <div className="content">
                                            <h4 className="ui sub header">Πληροφορίες</h4>
                                            <div className="ui small feed">
                                            <div className="event">
                                                <div className="content">
                                                <div className="summary">
                                                    Στρέμματα  {farm.area}
                                                </div>
                                                </div>
                                            </div>
                                            <div className="event">
                                                <div className="content">
                                                <div className="summary">
                                                    <a>{farm.tag_active}</a>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="event">
                                                <div className="content">
                                                <div className="summary">
                                                    <a>{farm.tag_public}</a>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="extra content">
                                        <Link to={{
                                            pathname: `/farms/${farm.id}/`
                                        }}>
                                        <div className="ui bottom fluid attached blue button">
                                        <i className="edit icon" />
                                        Επεξεργασία
                                        </div>
                                        </Link>
                                        </div>
                                    </div>  
                                )
                            })
                        : 
                        <p>oups</p>
                        }  
                        </div>
                    </div>
                </div>
                <div className="six wide column">
                    <div className="ui segment">
                    <h2 className="ui green header">
                        <i className="calendar plus icon" />
                        <div className="content">
                            Δημιουργία
                        </div>
                    </h2>
                        <FarmForm reloadFarms={this.reloadFarms} />
                    </div>
                </div> 
            </div>
        </div>
        )
    }
}


export default FarmsPage