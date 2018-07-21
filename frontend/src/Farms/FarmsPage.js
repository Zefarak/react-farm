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
                            Imagine-a-Company
                        </h1>
                        <h2>Do whatever you want when you want to.</h2>
                        <div className="ui huge primary button">Get Started <i class="right arrow icon"/></div>
                    </div>
                </div>
                <h3 className="ui center aligned header">Stackable Grid</h3>
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
                                    <div class="ui card">
                                        <div class="content">
                                            <div class="header">{ farm.title }</div>
                                        </div>
                                        <div class="content">
                                            <h4 class="ui sub header">Πληροφορίες</h4>
                                            <div class="ui small feed">
                                            <div class="event">
                                                <div class="content">
                                                <div class="summary">
                                                    Στρέμματα  {farm.area}
                                                </div>
                                                </div>
                                            </div>
                                            <div class="event">
                                                <div class="content">
                                                <div class="summary">
                                                    <a>Stevie Feliciano</a> was added as an <a>Administrator</a>
                                                </div>
                                                </div>
                                            </div>
                                            <div class="event">
                                                <div class="content">
                                                <div class="summary">
                                                    <a>Helen Troy</a> added two pictures
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="extra content">
                                        <Link to={{
                                            pathname: `/farms/${farm.id}/`
                                        }}>
                                        <div className="ui bottom fluid attached blue button">
                                        <i class="edit icon"></i>
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
                        <FarmForm />
                    </div>
                </div> 
            </div>
        </div>
        )
    }
}


export default FarmsPage