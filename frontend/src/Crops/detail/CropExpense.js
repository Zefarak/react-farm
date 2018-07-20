import React from 'react';



class BodyExpense extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        const {expenses} = this.props;
        return (
            <div>
               <h3 className='ui header centered red'>Πληρωμές</h3>
                <table className="ui small red table">
                <thead>
                    <tr>
                        <th>Ημερομηνία</th>
                        <th>Τίτλος</th>
                        <th>Κατηγορία</th>
                        <th>Καλλιέργεια</th>
                        <th>Επηρεάζει Φόρο</th>
                        <th>Είναι Πληρωμένο</th>
                        <th>Αξία</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length > 0 ? expenses.map((expense, index)=> {
                        return (
                                <tr>
                                    <td>{expense.date_created}</td>
                                    <td>{expense.title}</td>
                                    <td>{expense.category_slug}</td>
                                    <td>{expense.tag_crop_related}</td>
                                    <td>{expense.tag_taxes}</td>
                                    <td>{expense.tag_paid}</td>
                                    <td>{expense.final_value}</td>
                                    <td>
                                        <Link to={{
                                            pathname: `${expense.id}/`,
                                            state: {fromDashboard: false}
                                        }}><button  className="btn btn-default">Λεπτομέριες</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                        : 
                        <tr>
                            <td className="sorting_1">Gecko</td>
                            <td>Firefox 1.0</td>
                            <td>Win 98+ / OSX.2+</td>
                            <td className="center">1.7</td>
                            <td className="center">A</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>  
            
        )
    }
}

export default BodyExpense