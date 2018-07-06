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
                    }}><button className='btn btn-primary'>Επεξεργασία</button>
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
        this.state = {
            doneLoading: false,
            user: '',
            tree: null,
            title: null,
            is_public: false,
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
                user: responseData,
                title: responseData.title,
                is_public: responseData.is_public
            })
        }).catch(function(error){
            console.log('user error', error)
        })
    }

    

    loadTree(id){
        const endpoint = `/api/trees/${id}/`;
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
            console.log('get', responseData)
            thisComp.setState({
                tree: responseData
            })
        }).catch(function (error) {
            console.log('error', error)
        })
    }
    
    componentDidMount(){
        const {id} = this.props;
        this.setState({
            doneLoading: false,
            user: '',
            tree: null,
            title: null,
            is_public: false,
        });
        
        this.loadTree(id) 
        this.loadUser();
        this.setState({
            doneLoading:true
        })
        
    }

    render() {
        const {trees} = this.state;
        const {doneLoading} = this.state;
        const {user} = this.state;
        const {tree} = this.state;
        console.log('state', tree)

        return (
            <div id='page-wrapper'>
                <div className="row">
                    <div className="col-lg-12">
                        <Link to={{
                            pathname:`/δέντρα/`
                        }} ><h1 className="page-header">Δέντρα</h1></Link>
                    </div>
                </div>
                <div className="row">
                    <div className='col-lg-6 col-md-6'>
                        {doneLoading === true && tree !== null ?
                            <TreeForm updateData={this.updateData} tree={tree} />
                        :<p></p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class TreeUpdate extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            id:null,
            doneLoading: false
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.setState({
            id: id,
            doneLoading:true
        })
    }

    render() {
        const {id} = this.state;
        const {doneLoading} = this.state;

        return (
            <div className="wrapper">
                <Navbar/>
                {doneLoading === true ? 
                    <TreeBodyPage id={id} />
                :<p>Something is wrong</p>
                }
                
            </div>
        )

    }
}

export default TreeUpdate