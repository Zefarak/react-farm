import React from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom';




class BodyCate extends React.Component{

    constructor(props){
        super(props)
        
    }

    render() {
        const {categories} = this.props;
        return(
            <div>
                {categories !== undefined && categories.length > 0 ?
                    categories.map((category, index)=>{
                        return (
                            <div className="col-lg-4">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        {category.title}
                                    </div>
                                    <div className="panel-body">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                                    </div>
                                    <div className="panel-footer">
                                        <button className='btn btn-primaty'>Λεπτομέριες</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                :<p>No data</p>
                }
            </div>
        )
        
    }

}


class CategoryPage extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            categories: [],
            doneLoading: false
        }
    }

    loadCategories(){
        const endpoint = '/api/expense/category/';
        const thisComp = this;
        const lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            console.log(responseData)
            thisComp.setState({
                categories: responseData,
                doneLoading: true
            })
        }).catch(function(error){
            console.log('load categories', error)
        })
    }

    componentDidMount() {
        this.loadCategories()
    }


    render() {
        const {doneLoading} = this.state;
        const {categories} = this.state;
        console.log(doneLoading, categories)
        return (
            <div id="wrapper">
                <Navbar />
                <div id="page-wrapper" >
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Κατηγορίες Εξόδων</h1>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="col-lg-8">
                            {doneLoading === true ?
                            <BodyCate categories={categories} />
                            :<p>No data</p>
                            }
                            
                        </div>
                        <div className="col-lg-4">
                            <p>hello</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    }


export default CategoryPage;    