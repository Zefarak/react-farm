import React from 'react'
import 'whatwg-fetch';
import cookie from 'react-cookies';
import Navbar from "../Index/Navbar";
import {Link} from "react-router-dom"


class BodyTr extends React.Component {

    render() {
        const {tree} = this.props;
        return (

            <tr>
                <td>#</td>
                <td>{tree.title}</td>
                <td>{tree.description}</td>
                <td>1</td>
                <td><a className='btn btn-primary'>
                    <Link maintainScrollPosition={false} to={{
                        pathname: `trees/${tree.id}`,
                        state: {fromDashboard: false}
                    }}>επεξεργασία</Link>
                </a>
                </td>
            </tr>
        )
    }
}

class TreeBodyPage extends React.Component {

    constructor(props){
        super(props);
        this.togglePostListClass = this.togglePostListClass.bind(this);
        this.handleNewPost = this.handleNewPost.bind(this);
        this.loadMoreTrees = this.loadMorePosts.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            trees: [],
            next: null,
            previous: null,
            count: 0
        }
    }

    loadMoreTrees() {
        const {next} = this.state;
        if (next !== null) {
            this.loadTrees(next)
        }
    }

    loadTrees(nextEndpoint) {
        let endpoint = '/api/trees/';
        if (nextEndpoint !== undefined) {
            endpoint = nextEndpoint
        }
        let thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function(responseData) {
                thisComp.setState({
                    trees: thisComp.state.trees.concat(responseData.results),
                    next: responseData.next,
                    previous: responseData.previous,
                    count: responseData.count
                })
        }).catch(function (error) {
            console.log('error', error)
        })

    }

    loadData() {
        const endpoint = '/api/trees/';
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
            thisComp.setState({
                trees: responseData
            })
        }).catch(function (error) {
            console.log('error', error)
        })
    }

    postData(data){
        console.log(data);
        const endpoint = '/api/trees/create/';
        let thisComp = this;
        const csrfToken = cookie.load('csrftoken');
        let lookupOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify(data)
        };
        fetch(endpoint, lookupOptions).then(function (response) {
            return response.json()
        }).then(function (responseData) {
            thisComp.loadAfterPost()
        }).catch(function (error) {
            console.log('error', error)
        })

    }

    loadAfterPost() {
        this.loadData();
    }

    handleChange(event){
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value,

        });
        console.log(this.state)
    }

    handleSubmit(event){
        event.preventDefault();
        const data = this.state;
        this.postData(data);

    }

    componentDidMount(){
        this.setState({
            trees: ['1'],
            title: null,
            description: null
        });
        this.loadData();
        console.log('here')
    }

    render() {
        const {trees} = this.state;
        return (
            <div id='page-wrapper'>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Δέντρα</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Δέντρο</th>
                                <th scope="col">Περιγραφή</th>
                                <th scope="col">Κατηγορία</th>
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
                    <div className='col-lg-6 col-md-6'>
                        <h4>Δημιουργία</h4>
                        <form method="post" className="form" role="form">
                            <div className="form-group">
                                <label className="control-label">Τίτλος</label>
                                <input name="title" onChange={this.handleChange} className="form-control" type="text" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Περιγραφή</label>
                                <input name='description' onChange={this.handleChange}  className="form-control" type="text" />
                            </div>
                            <button onClick={this.handleSubmit} className="btn-success ">Δημιουργία</button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

class TreePage extends React.Component{

    render() {
        return (
            <div className="wrapper">
                <Navbar/>
                <TreeBodyPage/>
            </div>
        )

    }
}

export default TreePage