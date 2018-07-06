import React from 'react'
import 'whatwg-fetch';
import cookie from 'react-cookies';


class CropForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            doneDownloading: false,
            farms_data: [],
            trees_data: [],
            farm: null,
            area: '',
            qty: '',
            title: '',
            is_public: false,
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
            thisComp.setState({
                trees_data: responseData
            })
        }).catch(function(error){
            console.log('error', error)
        })
    }

    loadFarms() {
        const endpoint = '/api/farms/';
        const thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOption)
        .then(function(response) {
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                farms_data: responseData,
                doneDownloading: true
            })
        }).catch(function(error){
            console.log('farm error', error)
        })
    }

    createCrop(data) {
        const endpoint = '/api/crops/' ;
        const csrfToken = cookie.load('csrftoken')
        let thisComp = this;
        console.log('create',data, csrfToken)
        let lookupOption = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        }
        
        fetch(endpoint, lookupOption)
        .then(function(response){
            return response.json()
        }).then(function(responseData){

        }).catch(function(erorr){
            console.log(error)
        })
    }

    componentDidMount() {
        const {crop} = this.props;
        if (crop !== undefined) {
            this.setState({
                area: crop.area,
                qty: crop.qty,
                title: crop.title,
                trees: []
                
            }) 
        } else {
            this.setState({
                trees_data: [],
                farms_data: [],
                area: null,
                qty: null,
                title: null,
                farm: null
            })
        }
        this.loadTrees();
        this.loadFarms();
        
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
        const data = this.state;
        this.createCrop(data)
    }
  
    render() {
        const {crop} = this.props;
        const {state} = this;
        const {trees_data} = this.state;     
        const {farms_data} = this.state;

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
                                <select onChange={this.handleChange} className="form-control" name="title">
                                    {trees_data.length > 0 ? trees_data.map((tree, index)=>{
                                        return (
                                            <option value={tree.id}>{tree.title}</option>
                                        )
                                    })
                                    : <option>No data</option>
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Χωράφι</label>
                                <select onChange={this.handleChange} className="form-control" name="farm">
                                        <option value=''>Επέλεξε</option>
                                    {farms_data.length > 0 ? farms_data.map((farm, index)=>{
                                        
                                        return (
                                            <option value={farm.id}>{farm.title}</option>
                                        )
                                    })
                                    : <option>No data</option>
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label className='control-label'>Πόσοτητα Δέντρων</label>
                                <input onChange={this.handleChange} name="qty" className="form-control" type="number" />
                            </div>
                            <div className="form-group">
                                <label className='control-label'>Στρέμματα</label>
                                {crop !== undefined ? 
                                <input onChange={this.handleChange} name="area" className="form-control" type="number" value={state.area} />
                                :<input onChange={this.handleChange} name="area" className="form-control" type="number" />
                                }
                                
                            </div>

                            <button onClick={this.handleSubmit} className="btn btn-success" type='submit'>Αποθήκευση</button>
                            <button className='btn btn-warning' >Καθαρισμός</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default CropForm