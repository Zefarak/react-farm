import React from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';
import Navbar from "../Index/Navbar";


class CropsCreate extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: null,
            area: null,
            qty: null,
            trees: []
        }
    }

    loadData() {
        const endpoint = '/api/farms/trees';
        let thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions).then(function (response) {
            response.json()
        }).then(function (responseData) {
            thisComp.setState({
                trees: responseData
            });
            console.log(responseData)
        }).catch(function (error) {
            console.log('error', error)
        })
    }

    createData() {
        const endpoint = '/api/farms/crops/create';
        const csrfToken = cookie.get('csrftoken');
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        }
    }

    componentDidMount() {
        this.setState({
            trees: '1'
        });
        this.loadData()
    }

    render() {
        const {trees} = this.state;
        return (
            <div className="wrapper">
                <Navbar/>
                <div id="page-wrapper">
                    <div className="row">
                        <h4>Create F</h4>
                    </div>
                    <ul>
                        {trees.length > 0 && trees !== undefined ? trees.map((tree, index)=>{
                            return (
                                <li>{tree}</li>)
                        })
                            :<li>Damn</li>
                        }
                    </ul>
                    <form className="form">
                        <button className="btn btn-success">Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CropsCreate;