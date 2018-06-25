import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from '../Index/Navbar';
import TreeForm from './TreeForm';


class TreeUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            tree: null,
            doneDownload: false
        }
    }

    loadData(id) {
        const endpoint = `/api/trees/${id}`
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData) {
            console.log('reponse', responseData);
            thisComp.setState({
                doneDownload: true,
                tree: responseData  
            })
        }).catch(function(error){
            console.log('error', error)
        })
    }

    componentDidMount() {
        this.setState({
            tree: null,
            id: null 
        })

        if (this.props.match) {
            const {id} = this.props.match.params;
            this.setState({
                id: id,
                doneDownload: false
            })
            this.loadData(id)
        }
    }

    render(){  
        const {tree} = this.state;
        const {doneDownload} = this.state;
        return (
            <div className='wrapper'>
                <Navbar />
                {(doneDownload === true) ? <div>
                {tree === null ? <div>No Tree</div>:
                     <TreeForm tree={tree} /> 
                }
                </div>
                : <div>No download</div>
                }
            </div>
        )
    }
}


export default TreeUpdate
