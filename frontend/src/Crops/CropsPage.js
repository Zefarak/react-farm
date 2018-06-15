import React from 'react';
import 'whatwg-fetch'
import Navbar from '../Index/Navbar';


class BodyTr extends React.Component {
    
    render() {
        const {crop} = this.props
        return (

            <tr>
                <td>{crop.title}</td>
                <td>{crop.area}</td>
                <td>{crop.qty}</td>
            </tr>
        )
    }
}


class CropsPageBody extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            crops: Null
        }
    }

    loadCrops(){
        const endpoint = '/api/farms/crops/'
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Conteny-Type': 'application/json'
            }
        }
        fetch(endpoint, lookupOptions).then(function(response){
            response.json()
        }).then(function(responseData){
            thisComp.setState({
                crops: responseData
            })
        }).catch(function(error){
            console.log('error', error)
        })
    }

    componentDidMount(){
        this.loadCrops()
    }

    render(){
        return (
            <div className='page-wrapper'>
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





                            {crops.length > 0 ? crops.map((postItem, index)=>{
                                return(
                                    <FarmTr farm={postItem} elClass="{postListClass}" />
                                )
                                }):<p>No posts Found</p>}
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
        super(pros)
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