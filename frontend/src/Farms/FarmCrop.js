import React from 'react';
import 'whatwg-fetch';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import Navbar from '../Index/Navbar';
import NavbarInside from '../Index/NavbarInside';

class FarmCrop extends React.Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            farm: null,
            title: '',
            area:0,
            qty:0,
            is_public: false,
            doneLoading:false,
            trees: null
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.setState({
            farm: id,
            title: '',
            area:0,
            qty:0,
            is_public: false,
            doneLoading: false,
            trees: null
        });
        this.loadTrees()
    }

    loadTrees(){
        const endpoint = '/api/trees/';
        const thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        };

        fetch(endpoint, lookupOption)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                console.log('load data', responseData);
                thisComp.setState({
                    trees: responseData,
                    doneLoading: true
                })
            }).catch(function (error) {
                alert('Error ' + error)
            })
    }

    createCrop(){
        const data = this.state;
        const endpoint = '/api/crops/';
        const thisComp = this;
        const csrfToken = cookie.load('csrftoken');
        let lookupOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        };

        fetch(endpoint, lookupOption)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
                console.log('create',responseData);
                thisComp.props.history.push(`/farms/${data.farm}/`)
        }).catch(function (error) {
            alert('Error ' + error)
        })
    }

    handleChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createCrop();
    }

    render(){
        const {state} = this;
        const {doneLoading} = this.state;
        const {id} = this.props.match.params;
        return (
            <div>
                <Navbar/>
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarInside />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">Δημιουργία Καλλιέργιας</h1>
                        <Link to={{
                            pathname:`/farms/${id}/`
                        }}>
                            <button className="ui small yellow button">Επιστροφή</button></Link>
                    </div>
                </div>
                <h3 className="ui center aligned header">Δεδομένα</h3>
                <div className="ui two column grid">
                    <div className="column">
                        <div className="ui raised segment">
                            <h4 className="ui green header">Δημιουργία Καλλιέργιας</h4>
                            {doneLoading === true && state.trees !== null ?
                            <form onSubmit={this.handleSubmit} className="ui form" role="form">
                                <div className="form-group">
                                    <label className="control-label">Τίτλος</label>
                                    <select onChange={this.handleChange} className="form-control" name="title">
                                        {state.trees.map((tree, index)=>{
                                            return (
                                                <option value={tree.id}>{tree.title}</option>
                                            )
                                        })}
                                        </select>
                                </div>
                                <div className="form-group">
                                    <label className='control-label'>Πόσοτητα Δέντρων</label>
                                    <input onChange={this.handleChange} name="qty" className="form-control" type="number" required="True" />
                                </div>
                                <div className="form-group">
                                    <label className='control-label'>Στρέμματα</label>
                                        <input onChange={this.handleChange} name="area" className="form-control" type="number" required="True" />
                                    </div>
                                <br /> <br />
                                <button onClick={this.handleSubmit} type='submit' className="ui positive right fluid labeled icon button">Save<i className="save icon"/></button>
                            </form>
                            :<p>No Data</p>
                            }
                        </div>
                    </div>

                    <div className="column">

                    </div>
                </div>
            </div>
        )
    }
}

export default FarmCrop