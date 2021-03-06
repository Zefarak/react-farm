import React from 'react'
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from "../Index/Navbar";
import {Link} from "react-router-dom"
import TreeForm from './TreeForm';


class BodyTr extends React.Component {

    render() {
        const {tree} = this.props;
        const {user} = this.props;
        return (

            <tr>
                <td>#</td>
                <td>{tree.title}</td>
                <td>{tree.tag_user}</td>
                <td>{tree.public}</td>
                <td>{tree.user === user.id ?
                    <Link to={{
                        pathname:`/trees/${tree.id}/`,
                    }}><button className='btn btn-primary'>Επεξεργασία {tree.id}</button>
                    </Link>
                :<p>Δε έχεις Πρόσβαση</p>
                }
                </td>     
            </tr>
        )
    }
}

class TreeBodyPage extends React.Component {

    constructor(props){
        super(props);
        this.updateData = this.updateData.bind(this);
        
        this.state = {
            doneLoading: false,
            trees: [],
            tree: null,
            next: null,
            previous: null,
            count: 0
        }
    }

    loadUser() {
        const endpoint = '/api/current-user/';
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                user: responseData
            })
        }).catch(function(error){
            console.log('user error', error)
        })
    }

    loadData() {
        const endpoint = '/api/trees/';
        let thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        };
        fetch(endpoint, lookupOption)
        .then(function (response) {
            return response.json()
        }).then(function (responseData) {
            thisComp.setState({
                trees: responseData
            })
        }).catch(function (error) {
            console.log('error', error)
        })
    }

    updateData(){
        this.loadData()
    }

    componentDidMount(){
      
        this.setState({
            doneLoading: false,
            user: '',
            trees: ['1'],
            title: null,
            is_public: false,
        });
        
        this.loadUser();
        this.loadData();

        this.setState({
            doneLoading:true
        })
        
    }

    render() {
        const {trees} = this.state;
        const {doneLoading} = this.state;
        const {user} = this.state;
        return (
            <div id='page-wrapper'>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Δέντρα</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Δέντρο</th>
                                <th scope="col">Δημιουργός</th>
                                <th scope="col">Κοινόχρηστο</th>
                                <th></th>
                                </tr>
                            </thead>
                            {doneLoading === true ?
                            <tbody>
                                {trees.length > 0 ? trees.map((item, index)=>{
                                    return (
                                        <BodyTr tree={item} user={user} />
                                    )
                                }) :
                                    <tr>
                                        <td>No Data</td>
                                    </tr>
                                }
                            </tbody>
                            :<tbody></tbody>
                            }
                        </table>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                        {doneLoading === true ?
                            <TreeForm updateData={this.updateData}  />
                        :<p></p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class TreePage extends React.Component{

    render() {
        return (
            <div className="wrapper">
                <Navbar/>
                <TreeBodyPage/>
            </div>
        )

    }
}

export default TreePage