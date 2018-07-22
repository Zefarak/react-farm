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
            crop: null,
            farms_data: [],
            trees_data: [],

            farm: null,
            area: '',
            qty: '',
            title: '',
            is_public: false,
        }
    }

    componentDidMount() {
        const {crop} = this.props;
        if (crop !== undefined) {

            this.setState({
                doneDownloading: false,
                farms_data: [],
                trees_data: [],
                crop: crop,

                farm: crop.farm,
                is_public: crop.is_public,
                area: crop.area,
                qty: crop.qty,
                title: crop.title,

            })
        } else {
            this.setState({
                doneDownloading: false,
                crop: null,
                trees_data: [],
                farms_data: [],

                farm: null,
                area: '',
                qty: '',
                title: '',
                is_public: false,
            })
        }
        this.loadTrees();
        this.loadFarms();

    }

    loadTrees() {
        const endpoint = '/api/trees/';
        const thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

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
        };

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
        console.log('create');
        const endpoint = '/api/crops/' ;
        const csrfToken = cookie.load('csrftoken');
        let thisComp = this;
        let lookupOption = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        };
        
        fetch(endpoint, lookupOption)
        .then(function(response){
            return response.json()
        }).then(function(responseData){

        }).catch(function(erorr){
            console.log(error)
        })
    }

    updateCrop(data) {
        const {crop} = this.props;
        console.log('update', 'crop');
        const endpoint = `/api/crops/${crop.id}/`;
        const csrfToken = cookie.load('csrftoken');
        let thisComp = this;
        let lookupOption = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data),
            credentials: 'include'
        };

        fetch(endpoint, lookupOption)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.props.reloadData()
        }).catch(function(erorr){
            console.log(error)
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
        const {crop} = this.state;
        const data = this.state;
        if (crop !== null){
            this.updateCrop(data)
        } else {
            this.createCrop(data)
        }
    }

  
    render() {
        const {crop} = this.state;
        const {state} = this;
        const {trees_data} = this.state;     
        const {farms_data} = this.state;

        return (
                <form onSubmit={this.handleSubmit} className="ui form" role="form">
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
                                <input onChange={this.handleChange} name="qty" value={state.qty} type="number" required='true' />
                            </div>
                            <div className="form-group">
                                <label className='control-label'>Στρέμματα</label>
                                {crop !== undefined ? 
                                <input onChange={this.handleChange} name="area" className="form-control" type="number" value={state.area} />
                                :<input onChange={this.handleChange} name="area" className="form-control" type="number" />
                                }
                                
                            </div>
                            <br /> <br />
                            <button onClick={this.handleSubmit} type='submit' className="ui positive right fluid labeled icon button">Save<i className="save icon"/></button>
                            
                        </form>
                   
        )
    }

}

export default CropForm