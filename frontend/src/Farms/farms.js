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
                    <h1><Link maintainScrollPosition={false} to={{
                   pathname:`/farms/${farm.slug}`,
                   state: {fromDashboard: false}
               }}>{farm.title}</Link></h1>
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
            <div>
            <h2>Farms</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Farm</th>
                            <th>Area</th>
                            <th>Actions</th>
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
            </div>
            
        )
    }
}

export default FarmsTable