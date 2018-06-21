import React from 'react';
import 'whatwg-fentch';
import cookie from 'react-cookies';




class CropsUpdate extends React.Component{

    constructor(props){
        super(pros);
        this.state = {
            title: null,
            qty: 50,
            area: 50,
            trees: []
        }
    }

    loadTrees(){
        let thisComp = this;
        const endpoint = '/api/trees/';
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(endpoint, lookupOption).then(function (response) {
            return response.json()
        }).then(function (responseData) {
            thisComp.setState({
                trees: responseData
            })
        }).catch(function (error) {
            console.log('error', error)
        })
    }

    loadData(slug){

    }

}
