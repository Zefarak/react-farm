import React from 'react';
import 'whatwg-fetch';
import  { Link } from 'react-router-dom';

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
        console.log(endpoint)
        let thisComp = this;
        let lookupOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(endpoint, lookupOption).then(function (response) {
           return response.json()
        }).then(function (responseData) {
            console.log(responseData)
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
            post: null
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
            <div>
                <p><Link maintainScrollPosition={false} to={{
                   pathname:`/`,
                   state: {fromDashboard: false}
               }}>Back</Link> </p>
                <p>{doneLoading === true? <p>{farm.title}</p>:"Not Found"}</p>
            </div>
        )
    }
}

export default FarmDetail