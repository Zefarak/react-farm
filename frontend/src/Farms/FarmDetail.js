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
        const crops = farm.get_crops;
        
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

                    {crops.length > 0 && farm !== undefined ?
                        crops.map((crop, index)=>{
                            return(
                                <div className="list-group">
                                    <a href="#" class="list-group-item">
                                        <i className="fa fa-euro fa-fw"></i> --
                                        <span className="pull-right text-muted small"><em>Καλλιεργια {crop}</em>
                                        </span>
                                    </a>    
                                </div>
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
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            {doneDownloading === true ?
                            <h1 className="page-header">{farm.title}</h1>
                            :<p>No data</p>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-9 col-md-9">
                            {doneDownloading === true ?
                            <FarmBody farm={farm} />  
                            :<p>No data</p>
                            }
                        </div>
                        <div className='col-lg-3 col-md-3'>
                            {doneDownloading === true ?
                            <FarmForm farm={farm} />  
                            :<p>No data</p>
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