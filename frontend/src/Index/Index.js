import React from 'react';
import Navbar from './Navbar';
import NavbarInside from './NavbarInside';
import  {getDataResults, getData}  from './MyComponent';


class Index extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            user: '',
            expenses: [],
            incomes: [],
            doneLoading: false
        }
    }

    componentDidMount() {
        this.loadExpenses();
        this.loadIncomes();
        this.loadUser()
    }

    loadExpenses(){
        const endpoint = '/api/expenses/';
        const thisComp = this;
        getDataResults(endpoint, thisComp, 'expenses')
    }

    loadIncomes(){
        const endpoint = '/api/incomes/invoices/'
        const thisComp = this;
        getDataResults(endpoint, thisComp, 'incomes')
    }

    loadUser(){
        const endpoint = '/api/current-user/';
        const thisComp = this;
        getData(endpoint, thisComp, 'user')
        this.setState({
            doneLoading: true
        })
    }


    render() {
        const {user} = this.state;
        const {doneLoading} = this.state;
        const incomes = this.state.incomes.map((income)=>{
            return(
                <tr>
                    <td>{income.timestamp}</td>
                    <td>{income.title}</td>
                    <td>{income.tag_value}</td>
                </tr>
            )
        })
        const expenses = this.state.incomes.map((expense)=>{
            return(
                <tr>
                    <td>{expense.timestamp}</td>
                    <td>{expense.title}</td>
                    <td>{expense.tag_value}</td>
                </tr>
            )
        })
        return(
            <div>
               <Navbar />
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <NavbarInside />
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">
                            Imagine-a-Company
                        </h1>
                        <h2>Do whatever you want when you want to.</h2>
                        <div className="ui huge primary button">Get Started <i class="right arrow icon"/></div>
                    </div>
                </div>
                <h3 className='ui centered blue header'>Πληροφορίες</h3>
                {doneLoading === true && user.id !== null ? 
                    <div className='ui two column grid'>
                        <div className='column'>
                            <h3 className='ui centered blue header'>Υποχρεώσεις</h3>
                            <table className="ui red table">
                                <thead>
                                    <tr>
                                        <th>Ημερομηνία</th>
                                        <th>Τίτλος</th>
                                        <th>Αξία</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenses}
                                </tbody>
                            </table>
                        </div>
                        <div className='column'>
                            <h3 className='ui centered blue header'>Έσοδα</h3>
                            <table className="ui green table">
                                <thead>
                                    <tr>
                                        <th>Ημερομηνία</th>
                                        <th>Τίτλος</th>
                                        
                                        <th>Αξία</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incomes}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                :
                <div className='ui two column stackable grid'>
                    <div className='column'>

                    </div>
                    <div className='column'>

                    </div>
                </div>
                }
                
            </div>     
        )
    }
}

export default Index