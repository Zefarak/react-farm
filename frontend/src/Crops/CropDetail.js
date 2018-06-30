import React from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';
import Navbar from "../Index/Navbar";


class CropBodyRight extends React.Component {
    constructor(props){
        super(props)
    }

    render(){

    }
}

class CropBody extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const {crop} = this.props;
        const {expenses} = this.props;

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bell fa-fw"></i> Πληροφορίες
                    </div>
                    {crop !== undefined ? 
                    <div className="panel-body">
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-comment fa-fw"></i> {crop.tag_farm}
                                <span className="pull-right text-muted small"><em>Χωράφι</em>
                                </span>
                            </a>    
                        </div>
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-comment fa-fw"></i> {crop.area}
                                <span className="pull-right text-muted small"><em>Στρέμματα</em>
                                </span>
                            </a>    
                        </div>
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-comment fa-fw"></i> {crop.qty} {crop.tag_title}
                                <span className="pull-right text-muted small"><em>Δέντρο-Φυτό</em>
                                </span>
                            </a>    
                        </div>
                    </div>
                    :<div className="list-group">
                        <a href="#" class="list-group-item">
                            <i className="fa fa-comment fa-fw"></i> Κάτι πήγε λάθος
                            <span className="pull-right text-muted small"><em>Δέντρο-Φυτό</em>
                            </span>
                        </a>    
                    </div>
                    }
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bell fa-fw"></i> Πληρωμές
                    </div>
                    <div className="panel-body">
                        <div className="list-group">
                            <a href="#" class="list-group-item">
                                <i className="fa fa-comment fa-fw"></i> 
                                <span className="pull-right text-muted small"><em>Καλλιέργια</em>
                                </span>
                            </a>    
                        </div>
                    </div>
                </div>       
            </div>
        )
    }
}




class CropDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            crop: null,
            doneLoading: false
        }
    }

    loadExpenses(id){
        const endpoint = `/api/expenses/?category=&crop_related=${id}`
        const thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOption)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                expenses: responseData
            })
        }).catch(function(error){
            console.log('error', error)
        })
    }

    loadCrop(id){
        const endpoint = `/api/crops/${id}/`
        const thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOption)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                crop: responseData,
                doneLoading: true
            })
            
        }).catch(function(error){
            console.log('error', error)
        })
    }


    componentDidMount() {
        const {id} = this.props.match.params;
        this.setState({
            crop: null,
            expenses: [],
            doneLoading: false
        })
        this.loadCrop(id);
        this.loadExpenses(id);
        
    }

    render() {
        const {crop} = this.state;
        const {expenses} = this.state;
        const {doneLoading} = this.state;
        console.log('state', crop, expenses)
        return (
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        {doneLoading === true ?
                        <div className="col-lg-12">
                            <h1 className="page-header">{crop.tag_title}</h1>
                        </div>
                        :<div className="col-lg-12">
                            <h1 className="page-header">No Data</h1>
                        </div>
                        }

                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            {doneLoading === true ?
                                <CropBody expenses={expenses} crop={crop} />
                            :<p>No data</p>
                            }
                            
                        </div>
                        <div className="col-lg-6">
                            <p>hello</p>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default CropDetail;