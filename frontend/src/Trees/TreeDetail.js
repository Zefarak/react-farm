import React, {Component} from 'react'
import 'whatwg-fetch'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'
import Navbar from "../Index/Navbar";


class TreeDetail extends Component {

    constructor(props) {
        super(props);
        this.handleTreeItemUpdated = this.handleTreeItemUpdated.bind(this);
        this.state = {
            id: null,
            tree: null,
            doneLoading: false
        }
    }

    handleTreeItemUpdated(postItemData) {
        this.setState({
            tree: postItemData
        })
    }

    loadTree(id) {
        const endpoint = `/api/trees/update/$(id)/`;
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            } 
        };
        fetch(endpoint, lookupOptions)
            .then(function (response) {
                return response.json()
            }).then(function (responseData) {
            thisComp.setState({
                doneLoading: true,
                tree: responseData
            }).catch(function(error){
                console.log('error', error)
            })
        })
    }

    componentDidMount() {
        this.setState({
            doneLoading: false,
            id: null
        });
        if (this.props.match) {
            const {id} = this.props.match.id;
            this.setState({
                id: id,
                doneLoading: false
            })
        }
    }

    render() {
        const {doneLoading} = this.state;
        const{tree} = this.state;
        return (
            <div className="">
                <Navbar />
                <div id="page-wrapper">
                    {doneLoading === tree} ?
                        <div className='row'>
                            <div className='col-lg-12'>
                                <h1 className='page-header'>{tree.title}</h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-9 col-md-9'>
                                <table className="table table-striped">
                                    <thead className="thead-dark">
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Δέντρο</th>
                                        <th scope="col">Σημειώσεις</th>
                                        <th scope="col">Actions</th>
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
                        </div>
                    :
                    <div className='row'>
                        <div className='col-lg-12'>
                            <h1 className='page-header'>No Tree</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TreeDetail