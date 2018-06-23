import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Index from "./Index/Index";
import FarmDetail from "./Farms/FarmDetail";
import FarmsPage from './Farms/FarmsPage';
import FarmCreate from './Farms/FarmCreate';
import CropsPage from './Crops/CropsPage';
import CropsCreate from './Crops/CropsCreate';

import TreePage from './Trees/TreePage';
import TreeDetail from './Trees/TreeDetail';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/farms/:slug" component={FarmDetail} />

                    <Route exact path='/χωράφια' component={FarmsPage} />
                    <Route exact path='/χωράφια/δημιουργία/' component={FarmCreate} />
                    <Route exact path='/δέντρα/' component={TreePage} />
                    <Route exact path="/trees/:id" component={TreeDetail} />

                    
                    <Route exact path='/καλλιέργιες' component={CropsPage} />
                    <Route exact path='/καλλιέργιες/δημιουργία/' component={CropsCreate} />

                    <Route component={Index} />
                </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

