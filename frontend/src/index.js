import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Index from "./Index/Index";
import FarmDetail from "./Farms/FarmDetail";
import FarmsPage from './Farms/FarmsPage';
import CropsPage from './Crops/CropsPage';
import CropsCreate from './Crops/CropsCreate';


class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/χωράφια' component={FarmsPage} />
                    <Route exact path="/farms/:slug" component={FarmDetail} />

                    <Route exact path='/καλλιέργιες' component={CropsPage} />
                    <Route exact path='/καλλιέργιες/δημιουργία' component={CropsCreate} />

                    <Route component={Index} />
                </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

