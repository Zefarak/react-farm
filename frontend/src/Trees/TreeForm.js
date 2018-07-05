import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';


class TreeForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.state = {
            title: '',
            is_public: false
        }
    }

    createData(data){
        const endpoint = '/api/trees/';
        const csrfToken = cookie.load('csrftoken')
        const thisComp = this;
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }
        
        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.props.updateData()
        }).catch(function(error){
            console.log('error', error)
        })
    }

    updateTree(data){
        console.log('before post happens', data)
        const {tree} = this.props;
        const endpoint = `/api/trees/${tree.id}/`;
        const csrfToken = cookie.load('csrftoken');
        let thisComp = this;
        let lookupOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            credentials: 'include',
            body: JSON.stringify(data)
        }
        
        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            console.log('response data', responseData)
        }).catch(function(error){
            console.log('error', error)
        })
    }


    handleChangeInput(event){
        this.setState({
            is_public: !this.state.is_public
          })
    }

    handleChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value

        this.setState({
            [key]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const {tree} = this.props;
        let data = this.state
        if (tree !== undefined){
            this.updateTree(data)
        } else {
            this.createData(data)
        }
        
    }



    componentDidMount() {
        const {tree} = this.props;
        if (tree !== undefined) {
            this.setState({
                title: tree.title,
                is_public: tree.is_public
            })
        } else {
            this.setState ({
                title: '',
                is_public: false
            })
        }
    }

    render() {
        const {tree} = this.props;
        const {title} = this.state;
        const {is_public} = this.state;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Δημιουργία Παραστατικού </div>
                <div className="panel-body">
                    <form onSubmit={this.handleSubmit} className="form" role="form">
                        <div className="form-group">
                            <label className="control-label">Τίτλος</label>
                            <input onChange={this.handleChange} name="title" value={title} className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Κοιωόχρηστο</label>
                            <input onChange={this.handleChangeInput}  name='is_public' value={is_public} className="form-control" type="checkbox" />
                        </div>
                        <button onClick={this.handleSubmit} className="btn btn-success">Δημιουργία</button>
                           
                    </form>
                </div>
            </div>
            
        )
    }
}

export default TreeForm;
