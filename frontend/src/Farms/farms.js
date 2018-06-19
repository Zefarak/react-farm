import React from 'react';
import 'whatwg-fetch'
import  { Link } from 'react-router-dom';

class FarmTr extends React.Component {

    render() {
        const {farm} = this.props;
        return (
            <tr>
                <td>{farm.id}</td>
                <td>{farm.title}</td>
                <td>{farm.area}</td>
                <td>
                    <a className='btn btn-default'>
                        <Link maintainScrollPosition={false} to={{
                            pathname:`/farms/${farm.slug}`,
                            state: {fromDashboard: false}
                        }}>Επεξεργασία
                        </Link>
                    </a>
                    
                </td>

            </tr>
        )
    }
}

class FarmsTable extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            farms: []
        }
    }

    loadFarms() {
        const endpoint = '/api/farms/';
        let thisComp = this;
        let lookupOptions = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }

        };

        fetch(endpoint, lookupOptions).
        then(function (response) {
            return response.json()
        }).then(function(responseData){
            console.log(responseData);
            thisComp.setState({
                farms: responseData
            })
        }).catch(function(error){
            console.log("error", error)
        })
    }



    componentDidMount() {
        this.setState({
            farms: []
        });
        this.loadFarms()
    }

    render(){
        const {farms} = this.state;
        return (
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Χωράφια</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-9 col-md-9">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Farm</th>
                                <th scope="col">Area</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {farms.length > 0 ? farms.map((postItem, index)=>{
                                return(
                                    <FarmTr farm={postItem} elClass="{postListClass}" />
                                )
                                }):<p>No posts Found</p>}
                            </tbody>
                        </table>
                    </div>
                    <div className='col-lg-3 col-md-3'>
                        <Link className='btn btn-primary' maintainScrollPosition={false} to={{
                            pathname: `/χωράφια/δημιουργία`,
                            state: {fromDashboard: false}
                        }}>Δημιουργία</Link>
                        
                    </div>
                </div>
            </div>
            
        )
    }
} 

export default FarmsTable