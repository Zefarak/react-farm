import React from 'react';
import moment from 'moment'
import {Link} from 'react-router-dom';


class Homepage extends React.Component {

    constructor(props){
        super(props)
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            doneLoading: false,
            incomes: null,
            date_start:  moment().startOf('year').format('YYYY-MM-DD'),
            date_end: moment(new Date()).format('YYYY-MM-DD'),

            

        }
    }


    loadIncomes(){
        const {date_start} = this.state;
        const {date_end} = this.state;
        const endpoint = `/api/reports/incomes/?date_start=${date_start}&date_end=${date_end}`
        const thisComp = this;
        let lookupOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        
        fetch(endpoint, lookupOptions).
        then(function (response) {
            return response.json()
        }).then(function(responseData){
            console.log(responseData);
            thisComp.setState({
                incomes: responseData,
                doneLoading: true
            })
        }).catch(function(error){
            console.log("error", error)
        })
    
    }

    handleChangeInput(event){
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: moment(value).format('YYYY-MM-DD')
        })
    }

    handleSubmit(event){
        event.preventDefault()
        this.loadIncomes()
    }

    componentDidMount(){
        this.setState({
            date_start: moment().startOf('year').format('YYYY-MM-DD'),
            date_end: moment(new Date()).format('YYYY-MM-DD')
        })
        this.loadIncomes()
        
    }

    render() {
        const {incomes} = this.state;
        const {date_start} = this.state;
        const {date_end} = this.state;
        const {doneLoading} = this.state;

        const {handle_out} = this.props;

        return(
            <div id="page-wrapper">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Ανάλυση</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <form className='form'>
                                <div className='col-lg-4'>
                                    <div className="form-group">
                                        <label>Ημερομηνία</label>
                                        <input name='date_start' type='date' value={date_start} onChange={this.handleChangeInput} className="form-control" />
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <div className="form-group">
                                        <label>Ημερομηνία</label>
                                        <input type='date' name='date_end' value={date_end} onChange={this.handleChangeInput} className="form-control" />
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <br />
                                    <button onClick={this.handleSubmit} className='btn btn-primary'>Save</button>                                    
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="panel panel-green">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col-xs-3">
                                            <i className="fa fa-tasks fa-5x"></i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            {doneLoading === true ? 
                                                <div className="huge">{incomes.total_sells}</div>
                                            :
                                            <div className="huge">12</div>
                                            }
                                            
                                            <div>Έσοδα</div>
                                        </div>
                                    </div>
                                </div>
                                <Link to={{
                                    pathname: `/incomes/invoices/`
                                }}>
                                <a href="#">
                                    <div className="panel-footer">
                                        <span className="pull-left">Λεπτομέριες</span>
                                        <span className="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                        <div className="clearfix"></div>
                                    </div>
                                </a>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="panel panel-red">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col-xs-3">
                                            <i className="fa fa-support fa-5x"></i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            {doneLoading === true ? 
                                                <div className="huge">{incomes.total_expenses}</div>
                                                :<div className="huge">13</div>
                                                }
                                            
                                            <div>Έξοδα</div>
                                        </div>
                                    </div>
                                </div>
                                <Link to={{
                                    pathname: `/expenses/`
                                }}>
                                <a href="#">
                                    <div className="panel-footer">
                                        <span className="pull-left">View Details</span>
                                        <span className="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                        <div className="clearfix"></div>
                                    </div>
                                </a>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col-xs-3">
                                            <i className="fa fa-comments fa-5x"></i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            {doneLoading === true ? 
                                                <div className="huge">{incomes.diff}</div>
                                                :<div className="huge">13</div>
                                                }
                                            <div>Κέρδη/Ζημιές</div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#">
                                    <div className="panel-footer">
                                        <span className="pull-left">View Details</span>
                                        <span className="pull-right"><i className="fa fa-arrow-circle-right"></i></span>
                                        <div className="clearfix"></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-md-6">
                            <div className="panel panel-yellow">
                                <div className="panel-heading">
                                    <div className="row">
                                        <div className="col-xs-3">
                                            <i className="fa fa-shopping-cart fa-5x"></i>
                                        </div>
                                        <div className="col-xs-9 text-right">
                                            {doneLoading === true ? 
                                                <div className="huge">{incomes.pending_payments}</div>
                                                :<div className="huge">13</div>
                                                }
                                            <div>Μη πληρώμένες υποχρεώσεις</div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#">
                                    <div className="panel-footer">
                                        <span className="pull-left">View Details</span>
                                        <span className="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                        <div className="clearfix"></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                    </div>
                    <button className='btn btn-warning' onClick={handle_out}>logout</button>
                </div>
        )
    }
}

export default Homepage