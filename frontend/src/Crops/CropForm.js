import React from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';


class CropForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            trees: []
        }
    }

    loadTrees() {
        const endpoint = '/api/trees/';
        const thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(endpoint, lookupOption)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            this.setState({
                trees: responseData
            })
        }).catch(function(error){
            console.log('error', error)
        })
    }

  

}
