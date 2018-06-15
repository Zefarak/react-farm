import React from 'react';
import 'whatwg-fetch';
import  { Link } from 'react-router-dom';
import FarmUpdate from './FarmUpdate'
import cookie from 'react-cookies';
import Navbar from "../Index/Navbar";

class FarmDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: null,
            farm: null,
            crops: null,
            doneLoading: false,
            crop_items: []
        }
    }

    loadCropItems() {
        const crop_items = []
        const {farm} = this.state;
        if ( farm.crops.length > 0 ){
            for (var i = 0; i < farm.crops.length; i++) {
                crop_items.push(farm.crops[i].title.title)
            }
        }
        this.setState({
            crop_items: crop_items
        })
    }

    loadData(slug){
        const endpoint = '/api/farms/slug/'+ slug;
        let thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const csrfToken = cookie.load('csrftoken');
        if(csrfToken!== undefined) {
            lookupOption['credentials'] = 'include';
            lookupOption['headers']['X-CSRFToken'] = csrfToken
        }

        fetch(endpoint, lookupOption).then(function (response) {
           return response.json()
        }).then(function (responseData) {
            thisComp.setState({
                    farm: responseData,
                    doneLoading: true
                })
            thisComp.loadCropItems()
        }).catch(function (error) {
            console.log('error', error)
        })

    }

    

    componentDidMount() {
        this.setState({
            slug: null,
            farm: null
        });
        if (this.props.match){
            const {slug} = this.props.match.params;
            this.setState({
                slug: slug,
                doneLoading: false

            });
            console.log(slug);
            this.loadData(slug)
            
        }
        
    }

    render(){
        const {crop_items} = this.state;
        const {doneLoading} = this.state;
        const {farm} = this.state;
        return (
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper">
                    {doneLoading === true ?
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">{farm.title}</h1>
                            </div>
                        </div>
                    :
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Loading</h1>
                            </div>
                        </div>
                    }
                    <div className="row">
                        {doneLoading === true ?
                            <div className="col-lg-9 col-md-9">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{farm.title}</h5>
                                        <p className="card-text">Στρέμματα {farm.area}</p>
                                    </div>
                                    <h4>Καλλιέργιες</h4>
                                    <ul className="list-group list-group-flush">
                                        {crop_items.length > 0 ? crop_items.map((postItem, index)=>{
                                            return(
                                                <li className="list-group-item">{postItem}</li>
                                            )
                                            }):<li className="list-group-item">Damn</li>
                                        }
                                    </ul>
                                    <div className="card-body">
                                        <a href="#" className="card-link">{farm.timestamp}</a>
                                        <a href="#" className="card-link">{farm.edited}</a>
                                    </div>
                                </div>
                            </div>
                        : "No found" 
                        }
                    <div className='col-lg-3 col-md-3'>
                        <a className='btn btn-warning'><Link maintainScrollPosition={false} to={{
                           pathname:`/`,
                           state: {fromDashboard: false}
                            }}>Back</Link> 
                        </a>
                        <p>{doneLoading === true?
                            <div>
                                <p>{farm.title}</p> {farm.owner === true ? <FarmUpdate farm={farm} />: ""}
                            </div>
                            :"Not Found"}
                        </p>
                    <div>
                </div>
            </div>
                </div>
            </div>
        </div>

        )
    }
}

export default FarmDetail