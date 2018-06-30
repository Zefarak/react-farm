import React from 'react';
import 'whatwg-fetch';
import Navbar from '../Index/Navbar';


class CategoryBody extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {category} = this.props;
        const {expenses} = this.props;
        console.log('props', category, expenses)
        return (
            <div>
                {category !== undefined  ? 
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bell fa-fw"></i> Παραστατικά
                    </div>
                    <div className="panel-body">
                    
                        {expenses.results !== undefined  ?
                        expenses.results.map((expense, index)=>{
                            return (
                                <div className="list-group">
                                    <a href="#" class="list-group-item">
                                        <i className="fa fa-comment fa-fw"></i> {expense.tag_crop_related}, Αξία {expense.final_value},  
                                        <span className="pull-right text-muted small"><em>Τίτλος {expense.title}, {expense.date_created}</em></span>
                                    </a>    
                                </div>
                            )
                        })
                        :
                     <p>No Invoices</p>
                     }
                     
                       
                    </div>
                </div>       
                :<div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bell fa-fw"></i> Πληροφορίες
                    </div>
                </div>
                }
            </div>
        )
    }
}


class CategoryDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            expenses: [],
            category: null,
            doneLoading: false
        }
    }

    loadExpenses(id){
        const endpoint = `/api/expenses/?category=${id}`;
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                expenses: responseData
            })
        }).catch(function(error){
            console.log('loadexpenses', error)
        })

    }

    loadCate(id){
        const endpoint = `/api/expense/category/${id}/`;
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        fetch(endpoint, lookupOptions)
        .then(function(response){
            return response.json()
        }).then(function(responseData){
            thisComp.setState({
                category: responseData
            })
        }).catch(function(error){
            console.log('category_expenses', error)
        })
    }

    done_Loading(){
        this.setState({
            doneLoading:true
        })
    }

    componentDidMount(){
        this.setState({
            category: null,
            expenses: [],
            doneLoading: false
        })
       
        const {id} = this.props.match.params;
        this.loadCate(id);
        this.loadExpenses(id);
        this.done_Loading()
       
    }

    render(){
        const {doneLoading} = this.state;
        const {expenses} = this.state;
        const {category} = this.state;
        console.log(category, expenses, 'state')
        return(
                <div id="wrapper">
                    <Navbar />
                    <div id="page-wrapper" >
                        <div className="row">
                            <div className="col-lg-12">
                                {doneLoading === true ?
                                    <h1 className="page-header">kj</h1>
                                : <h1 className="page-header">No Data</h1>
                                }
                                
                            </div> 
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                {doneLoading === true && expenses !== undefined ?
                                    <CategoryBody expenses={expenses} category={category} />
                                : <p>No data</p>
                                }
                            </div>
                            <div className="col-lg-6">
                                
                            </div>
                        </div>
                </div>
            </div>
            
        )
    }
}

export default CategoryDetail