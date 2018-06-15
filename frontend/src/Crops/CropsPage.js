import React from 'react';
import 'whatwg-fetch'
import Navbar from '../Index/Navbar';


class BodyTr extends React.Component {
    
    render() {
        const {crop} = this.props;
        return (

            <tr>
                <td>#</td>
                <td>{crop.title}</td>
                <td>{crop.area}</td>
                <td>{crop.qty}</td>
                <td><button className='btn btn-primary'>Edit</button></td>
            </tr>
        )
    }
}


class CropsPageBody extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            crops: []
        }
    }

    loadCrops(){
        const endpoint = '/api/farms/crops/'
        let thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Conteny-Type': 'application/json'
            }
        }
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

    componentDidMount() {
        this.setState({
            crops: []
        });
        console.log('first')
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
                    <div className="col-lg-9 col-md-9">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
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
                    <div className='col-lg-3 col-md-3'>
                        <a href='' className='btn btn-success'>Προσθήκη</a>
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