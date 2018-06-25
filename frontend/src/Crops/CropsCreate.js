import React from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';
import Navbar from "../Index/Navbar";



class CropsCreate extends React.Component {

    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: null,
            area: null,
            qty: null,
            trees: []
        }
        
    }

    loadData(){
        const endpoint = '/api/trees/';
        let thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Conteny-Type': 'application/json'
            }
        };
        fetch(endpoint, lookupOptions).
        then(function (response) {
            return response.json()
        }).then(function(responseData){
            console.log(responseData);
            thisComp.setState({
                trees: responseData
            })
        }).catch(function(error){
            console.log("error", error)
        })
    }

    
    createData(data) {
        const endpoint = '/api/crops/create/';
        const csrfToken = cookie.load('csrftoken');
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                
            },
            body: JSON.stringify(data),
            credentials: 'include'
        };
        
        fetch(endpoint, lookupOptions).then(function(response){
            return response.json()
        }).then(function(responseData){
            console.log(responseData)
        }).catch(function(error){
            console.log('error', error)
        })
    }

    handleInputChange(event) {
        event.preventDefault();
        let value = event.target.value;
        let key = event.target.name;
        
        this.setState({
            [key]: value,
            [event.target.name]: event.target.value
        });
        console.log(value)
        
    }

    handleSubmit(event){
        event.preventDefault();
        let data = this.state;
        this.createData(data)
    }

    componentDidMount() {
        this.setState({
            trees: ['1'],
            qty: 50
        });
        this.loadData()
        
    }

    render() {
        const {trees} = this.state;
        const {qty} = this.state;
        console.log(trees)
        return (
            <div className="wrapper">
                <Navbar/>
                <div id="page-wrapper">
                    <div className="row">
                        <h4>Δημιούργησε νέα Καλλιέργια</h4>
                    </div>
                    <div className='row'>
                        <div className="col-lg-6">
                            <form role="form">
                                <div className="form-group">
                                    <label className="control-label" for="inputSuccess">Δεντρο</label>
                                    <select onChange={this.handleInputChange} className="form-control" name="title">
                                        {trees.length > 0 && trees !== undefined ? trees.map((tree, index)=>{
                                                return(
                                                    <option value={tree.id}>{tree.title}</option>
                                                )
                                            }): <option value="">No Data</option>
                                            }
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label className="control-label">Ποσότητα Δέντρων</label>
                                    <input onChange={this.handleInputChange} name='qty' type="text" value={qty} className="form-control"  />
                                </div>
                                <div class="form-group ">
                                    <label className="control-label">Στρέμματα</label>
                                    <input onChange={this.handleInputChange} name='area' type="text" className="form-control"  />
                                </div>
                                <button onClick={this.handleSubmit} className="btn btn-success">Αποθήκευση</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CropsCreate;