import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Index from "./Index/Index";
import FarmDetail from "./Farms/FarmDetail"
import FarmPage from './Farms/FarmPage';


class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/χωράφια' component={FarmPage} />
                    <Route exact path='/farms' component={FarmDetail} />
                    <Route exact path="/farms/:slug" component={FarmDetail} />
                    <Route component={Index} />
                </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

