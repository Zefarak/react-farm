import React from 'react';
import 'whatwg-fetch';
import  { Link } from 'react-router-dom';
import FarmUpdate from './FarmUpdate'
import cookie from 'react-cookies';
import Navbar from "../Index/Navbar";
import FarmForm from "./FarmForm";


class FarmBody extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {farm} = this.props;
        return (
            <div className="card">
                <div className="card-header">
                   {farm.title}
                </div>
                <ul class="list-group list-group-flush">
                    <li className="list-group-item">Στρέμματα {farm.area}</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
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
                            <FarmForm />
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default FarmDetail