import React from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';


class CropForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            trees: [],
            user: null,
            area: 1,
            qty: 1,
            title: null
        }
    }

    loadUser() {
        const endpoint = '/api/users/current/';
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
        }).then(function(responseData) {
            console.log('user', responseData)
            thisComp.setState({
                user: responseData
            })
        }).catch(function(error){
            console.log('error', error)
        })
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
            thisComp.setState({
                trees: responseData
            })
        }).catch(function(error){
            console.log('error', error)
        })
    }

    createCrop(data) {
        const endpoint = 'api/crops/create';
        const csrfToken = cookie.load('csrfToken');
        const thisComp = this;
        let lookupOption = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }

    componentDidMount() {
        const {crop} = this.props;
        console.log(crop);
        if (crop !== undefined) {
            this.setState({
                area: crop.area,
                qty: crop.qty,
                title: crop.title,
                trees: []
                
            }) 
        } else {
            this.setState({
                trees: [],
                user: null,
                area: 1,
                qty: 1,
                title: null
            })
        }
        this.loadTrees();
        this.loadUser();
    }

    handleSubmit(event) {
        event.preventDefault();
        let data = this.state;
        console.log(data)
    }
  
    render() {
        const {crop} = this.props;
        const {trees} = this.state;     
        const {user} = this.state;   
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        {crop !== undefined ?
                        <h1 className="page-header">{crop.title}</h1> 
                        : <h1 className="page-header">Δημιουργία Καλλιέργιας</h1>    
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <form onSubmit={this.handleSubmit} className="form" role="form">
                            <div className="form-group">
                                <label className="control-label">Τίτλος</label>
                                <select class="form-control" name="title">
                                    {trees.length > 0 ? trees.map((tree, index)=>{
                                        return (
                                            <option value={tree.id}>{tree.title}</option>
                                        )
                                    })
                                    : <option>No data</option>
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label className='control-label'>Πόσοτητα Δέντρων</label>
                                <input name="qty" class="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label className='control-label'>Στρέμματα</label>
                                <input name="area" class="form-control" type="number" />
                            </div>

                            <button  className="btn-success ">Δημιουργία</button>
                            <button className='btn btn-warning' >Καθαρισμός</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default CropForm