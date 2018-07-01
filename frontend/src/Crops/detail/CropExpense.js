import React from 'react';
import CropDetail from '../CropDetail';


class BodyExpense extends React.Component {

    constructor(props){
        super(props)
    }

    render() {
        const {expenses} = this.props;
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <i className="fa fa-bell fa-fw"></i> Πληρωμές
                </div>
                <table width="100%" className="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" id="dataTables-example" role="grid" aria-describedby="dataTables-example_info">
                <thead>
                    <tr role="row">
                    <th className="sorting_asc" tabindex="0" aria-controls="dataTables-example" rowspan="1"
                        colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending" 
                        >Ημερομηνία
                    </th>
                    <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending" >Τίτλος</th>
                    <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Κατηγορία</th>
                    <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending">Καλλιέργεια</th>
                                            <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" >Επηρεάζει Φόρο</th>
                                            <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" >Είναι Πληρωμένο</th>
                                            <th className="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" aria-label="CSS grade: activate to sort column ascending" >Αξία</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {expenses.length > 0 ? expenses.map((expense, index)=> {
                                            return (
                                                <tr className="gradeA odd" role="row">
                                                    <td className="sorting_1">{expense.date_created}</td>
                                                    <td>{expense.title}</td>
                                                    <td>{expense.category_slug}</td>
                                                    <td className="center">{expense.tag_crop_related}</td>
                                                    <td>{expense.tag_taxes}</td>
                                                    <td>{expense.tag_paid}</td>
                                                    <td className="center">{expense.final_value}</td>
                                                    <td>
                                                        <Link to={{
                                                            pathname: `${expense.id}/`,
                                                            state: {fromDashboard: false}
                                                        }}>
                                                        <button  className="btn btn-default">Λεπτομέριες</button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                            
                                            
                                        :  <tr className="gradeA odd" role="row">
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