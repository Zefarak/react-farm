import React from 'react';
import 'whatwg-fetch';

import callEndpoint from '../Index/MyComponent';

class FarmReportDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            incomes: [],
            expenses: [],
            payroll: [],
            farms: [],
            incomes_cate: [],
        }
    }

    loadIncomes(){
        const incomes_api = callEndpoint('/api/incomes/invoices/')

        this.setState({
            incomes: incomes_api.results
        })
    }

}

export default FarmReportDetail