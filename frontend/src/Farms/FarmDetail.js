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
            doneLoading: false
        }
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
        const {slug} = this.state;
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
                 :<div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Loading</h1>
                        </div>
                    </div>
                 }
                <div className="row">
                    <div className="col-lg-9 col-md-9">
                        <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                        <div className="card-body">
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
                        </div>
                    </div>

                    </div>
                    <div className='col-lg-3 col-md-3'>
                         <p><Link maintainScrollPosition={false} to={{
                           pathname:`/`,
                           state: {fromDashboard: false}
                       }}>Back</Link> </p>
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