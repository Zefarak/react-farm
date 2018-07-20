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
        this.updateCrops = this.updateCrops.bind(this)
        this.state = {
            crops: []
        }
    }

    loadCrops(){
        const endpoint = '/api/crops/';
        let thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Conteny-Type': 'application/json'
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

    componentDidMount() {
        this.setState({
            crops: []
        });
        this.loadCrops()
    }

    render(){
        const {crops} = this.state;
        return (

            <div class="ui two column stackable grid">
            <div class="column">
                <div class="ui segment">
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
                                    <th></th>
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
                            Imagine-a-Company
                        </h1>
                        <h2>Do whatever you want when you want to.</h2>
                        <div className="ui huge primary button">Get Started <i class="right arrow icon"/></div>
                    </div>
                </div>
                <h3 class="ui center aligned header">Καλλιέργιες</h3>
                <CropsPageBody />
            </div>
        )
    }
}

export default CropsPage