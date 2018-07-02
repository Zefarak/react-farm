import 'whatwg-fetch'
import cookie from 'react-cookies';


function callEndpoint(url, this_, key){
    let result = null;
    const endpoint = url;
    const thisComp = this_;
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
        console.log('in fuction', responseData);
        result = responseData;
        thisComp.setState({
            [key]: responseData
        })
    }).catch(function(error){
        console.log(error)
    });

    console.log('out function', result)
    return result

}

function sentEndpoint(url, method_, data){
    let result = null;
    const csrfToken = cookie.load('csrftoken')
    const endpoint = url;
    let lookupOptions = {
        method: method_,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }
    fetch(endpoint, lookupOptions)
    .then(function(response){
        return response.json()
    }).then(function(responseData){
        result = responseData
    }).catch(function(error){
        console.log(error)
    })
    return result
}

export {
    callEndpoint,
    sentEndpoint
}
