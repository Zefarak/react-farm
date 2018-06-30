import React from 'react';
import 'whatwg-fetch'
import Navbar from '../Index/Navbar';
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
                    <button className='btn btn-primary'>Edit</button>
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
            <div id='page-wrapper'>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Καλλιέργιες</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                <th>#</th>
                                <th scope="col">Χωράφι</th>
                                <th scope="col">Καλλιέργια</th>
                                <th scope="col">Στρέμματα</th>
                                <th scope="col">Δέντρο</th>
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
                    <div className='col-lg-6 col-md-6'>
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
            <div className='wrapper'>
                <Navbar />
                <CropsPageBody />
            </div>
        )
    }
}

export default CropsPage