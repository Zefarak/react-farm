import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from '../Index/Navbar';

class BodyTr extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {tree} = this.props;
        return (
            <tr>
                <td>1</td>
                <td>{tree.title}</td>
                <td>{tree.description}</td>
                <td><button className='btn btn-success'>Edit</button></td>
            </tr>
        )
    }
}



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
            trees: [],
            status: false,
            title: null,
            description: null,
            errors: {}
        }
    }

    loadData() {
        const endpoint = '/api/trees/';
        const thisComp = thiis;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(endpoint, lookupOptions)
        .then(function(response) {
            return response.json()
        }).then(function(responseData) {
            thisComp.setState({
                trees: responseData
            })
        })
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
                description: null,
                trees: []
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

    render() {
        return (
            <div className=''>
                <Navbar />
                <div id='page-wrapper'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <h1 className='page-header'>Δέντρα</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-9 col-md-9'>
                            <table className="table table-striped">
                                <thead className="thead-dark">
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Δέντρο</th>
                                    <th scope="col">Σημειώσεις</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trees.length > 0 ? trees.map((item, index)=>{
                                        return (
                                            <BodyTr tree={item} />
                                        )
                                    }) :
                                        <tr>
                                            <td>No Data</td>
                                        </tr> 
                                    }

                                
                                </tbody>
                            </table>
                        </div>
                        <div className='col-lg-3 col-md-3'>
                        <Link className="btn btn-primary" maintainScrollPosition={false} to={{
                                pathname:`/καλλιέργιες/δημιουργία`,
                                state: {fromDashboard: false}
                            }}>Επεξεργασία
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        )
    }


}
