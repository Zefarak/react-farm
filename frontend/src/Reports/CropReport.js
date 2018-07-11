import React from 'react';
import 'whatwg-fetch';


class CropReport extends React.Component {

    constructor(props){
        super(props);
    }

    loadCrops(){
        const endpoint = '/api/';
        thisComp = this;
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
                crops: responseData
            })
        })
    }

    componentDidMount(){
        this.setState({
            
        })
    }


}