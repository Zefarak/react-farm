import React from 'react';
import 'whatwg-fetch';



class CategoryDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            expenses: [],
            category: null
        }
    }

    loadExpenses(id){
        const endpoint = `/api/expenses/?category=${id}`;
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
                expenses: responseData
            })
        }).catch(function(error){
            console.log('loadexpenses', error)
        })

    }

    loadCate(id){
        const endpoint = `/api/expense/category/${id}/`;
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
                category: responseData
            })
        }).catch(function(error){
            console.log('category_expenses', error)
        })
    }

    componentDidMount(){
        this.setState({
            category: null,
            expenses: []
        })
        const {id} = this.props.match.params;
        this.loadCate(id);
        this.loadExpenses(id);
    }
}