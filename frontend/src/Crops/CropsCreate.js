import React from 'react';
import cookie from 'react-cookies';
import 'whatwg-fetch';


class CropsCreate extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            title: null,
            area: null,
            qty: null
        }
    }

    createData() {
        const endpoint = '/api/farms/crops/create';
        const csrfToken = cookie.get('csrftoken');
        let lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        }
    }
}
