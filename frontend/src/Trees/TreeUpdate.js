import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';

class TreeUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.treeTitleRef = React.createRef();
        this.treeDescREf = React.createRef();
        this.state = {
            status: false,
            title: null,
            description: null,
            errors: {}
        }
    }

    createTree(data) {
        const endpoint = '/api/trees/create/';
        const csrfToken = cookie.load('crsftoken');
        let thisComp = this;
        let lookupOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data)
        };

        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                console.log('responseData', responseData);
                if (thisComp.props.newTreeCreated){
                    thisComp.props.newTreeCreated(responseData)
                }
                thisComp.defaultState();
                thisComp.clearForm()
        }).catch(function (error) {
            alert('error nab')
        })
    }

    updateTree(data){
        const {tree} = this.props;
        const endpoint = `/api/trees/${tree.id}`;
        const csrfToken = cookie.load('crsftoken');
        let thisComp = this;
        let lookupOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data)
        };

        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                console.log('responseData', responseData);
                if (thisComp.props.newTreeCreated){
                    thisComp.props.newTreeCreated(responseData)
                }
                thisComp.clearForm()
        }).catch(function (error) {
            alert('error nab')
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = this.state;
        const {tree}  = this.props;
        if (tree !== undefined){
            this.createTree(data)
        } else {
            this.updateTree(data)
        }
    }

    handleInputChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        })
    }

    handleStatusChange(event){
        this.setState({
            status: !this.state.status
        })
    }

    clearForm(event){
        if (event){
            event.preventDefault();
        }
        this.treeCreateForm.reset;
    }

    clearFormRefs(){
        this.treeTitleRef.current = '';
        this.treeDescREf.current = '';
    }

    defaultState(){
        this.setState({
                status: false,
                title: null,
                description: null
            })
    }

    componentDidMount(){
        const {tree} = this.props;
        if (tree !== undefined){
            this.setState({
                title: tree.title,
                description: tree.description,
                status: tree.status
            })
        } else {
            this.defaultState()
        }
        this.treeTitleRef.current.focus()
    }


}
