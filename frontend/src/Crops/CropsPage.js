import React from 'react';
import 'whatwg-fetch'
import Navbar from '../Index/Navbar';
import NavbarInside from '../Index/NavbarInside';
import  { Link } from 'react-router-dom';
import CropForm from './CropForm';

class BodyTr extends React.Component {
    
    render() {
        const {crop} = this.props;
        return (

            <tr>
                <td>{crop.id}</td>
                <td>{crop.tag_farm}</td>
                <td>{crop.tag_title}</td>
                <td>{crop.area}</td>
                <td>{crop.qty}</td>
                <td>
                    <Link to={{
                        pathname: `/καλλιέργιες/${crop.id}/`
                    }}>
                    <button className='ui blue icon button'><i className='edit icon' />Edit</button>
                    </Link>
                    </td>
            </tr>
        )
    }
}


class CropsPageBody extends React.Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.updateCrops = this.updateCrops.bind(this);
        this.state = {
            crops: [],
            search_value: '',
            doneLoading: false
        }
    }

     componentDidMount() {
        this.setState({
            crops: [],
            search_value: '',
            doneLoading: false
        });
        this.loadCrops('')
    }

    handleSearch(event){
        event.preventDefault();
        let value = event.target.value;
        this.setState({
            search_value: value
        });
        console.log('target',value);
        if(value.length > 2) {
            this.loadCrops(value)
        }

    }

    loadCrops(value){
        let endpoint = '/api/crops/';
        if (value.length > 2) {
            endpoint = `/api/crops/?search=${value}`;
        }
        let thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };

        fetch(endpoint, lookupOptions).
        then(function (response) {
            return response.json()
        }).then(function(responseData){
            console.log(responseData);
            thisComp.setState({
                crops: responseData
            })
        }).catch(function(error){
            console.log("error", error)
        })
    }

    updateCrops(){
        this.loadCrops()
    }



    render(){
        const {crops} = this.state;
        const {search_value} = this.state;
        return (
            <div className="ui two column stackable grid">
            <div className="column">
                <div className="ui segment">
                    <h2 className="ui blue header">
                        <i className="list icon" />
                        <div className="content">
                            Λίστα
                        </div>
                    </h2>
                    <table className="ui blue table">
                            <thead >
                                <tr>
                                    <th>#</th>
                                    <th>Χωράφι</th>
                                    <th>Καλλιέργια</th>
                                    <th>Στρέμματα</th>
                                    <th>Ποσότητα</th>
                                    <th><form method="get" onChange={this.handleSearch} value={search_value} className="ui form"> <input type="text" placeholder="Search" className="ui inline form" /></form></th>
                                </tr>
                            </thead>
                            <tbody>
                                {crops.length > 0 ? crops.map((item, index)=>{
                                    return (
                                        <BodyTr crop={item} />
                                    )
                                }) :
                                    <tr>
                                        <td>No Data</td>
                                    </tr> 
                                }
                            </tbody>
                        </table>
                </div>
            </div>
            <div className="column">
                <div className="ui segment">
                <h2 className="ui green header">
                    <i className="calendar plus icon" />
                    <div className="content">
                        Δημιουργία
                    </div>
                </h2>
                <CropForm updateCrops={this.updateCrops} />
                </div>
            </div> 
        </div>
        )
    }   
    
}

class CropsPage extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
               <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarInside />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">
                            Καλλιέργιες
                        </h1>
                        <h2>Do whatever you want when you want to.</h2>
                        <br />
                    </div>
                </div>
                <h3 class="ui center aligned header">Καλλιέργιες</h3>
                <CropsPageBody />
            </div>
        )
    }
}

export default CropsPage