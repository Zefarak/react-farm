import React from 'react';
import 'whatwg-fetch';
import  { Link } from 'react-router-dom';

import cookie from 'react-cookies';
import Navbar from "../Index/Navbar";
import FarmForm from "./FarmForm";


class FarmBody extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {farm} = this.props;
        const crops = farm.crops_related;
        
        return (
            <div>
            {farm !== undefined && farm !== null ? 
            <div className="panel panel-default">
                <div className="panel-heading">
                    <i className="fa fa-bell fa-fw"></i> Πληροφορίες
                </div>
                <div className="panel-body">
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-comment fa-fw"></i> {farm.title}
                            <span className="pull-right text-muted small"><em>Ονομασία</em>
                            </span>
                        </a>    
                    </div>
                    <div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-euro fa-fw"></i> {farm.area}
                            <span className="pull-right text-muted small"><em>Στρέμματα</em>
                            </span>
                        </a>    
                    </div>
                </div>
            </div>
                    :<div className="panel panel-default">
                        <div className="panel-heading">
                            <i className="fa fa-bell fa-fw"></i> Πληροφορίες
                        </div>
                    </div>
                    }

                <div className="panel panel-default">
                    {crops !== undefined ?
                        <div className="panel-heading">
                            <i className="fa fa-bell fa-fw"></i> Στρέμματα... {crops.total_area} Δέντρα... {crops.total_qty}
                        </div>
                    :<p></p>
                    }
                    <div className="panel-body">
                        {crops.length > 0 && farm !== undefined ?
                            crops.map((crop, index)=>{
                                return(
                                    <Link to={{
                                        pathname: `/καλλιέργιες/${crop.id}/`
                                    }}>
                                    <div className="list-group">
                                        <a href="#" class="list-group-item">
                                            <i className="fa fa-euro fa-fw"></i> Συνολικά Δέντρα...{crop.qty}, Έκτάση... {crop.area}
                                            <span className="pull-right text-muted small"><em>Καλλιεργια {crop.tag_title}</em>
                                            </span>
                                        </a>    
                                    </div>
                                    </Link>
                                )
                            })
                        :
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-euro fa-fw"></i> Καμία
                                <span className="pull-right text-muted small"><em>Καλλιεργια</em>
                                </span>
                            </a>    
                        </div>
                        }
                    </div>
                </div>

            </div>

        )
    }
}

class FarmDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            farm: null,
            doneDownloading: false
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
                doneDownloading: true
            })
        }).catch(function(error){
            console.log("error", error)
        })
    }

    componentDidMount() {
        const {id} = this.props.match.params
        this.setState({
            farm: null,
            doneDownloading:false
        })
        this.loadFarm(id)
    }

    render(){
        const {farm} = this.state;
        const {doneDownloading} = this.state;
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
                    <button class="ui huge primary button create_btn" type="button" id="form_modal">Επεξεργασία</button>
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
        console.log('after redneer', farm)
    }
}

export default FarmDetail