import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Index from "./Index/Index";

import FarmDetail from "./Farms/FarmDetail";
import FarmsPage from './Farms/FarmsPage';

import CropsPage from './Crops/CropsPage';
import CropsCreate from './Crops/CropsCreate';

import TreePage from './Trees/TreePage';
import TreeDetail from './Trees/TreeDetail';
import ExpensesPage from './Outcomes/ExpensesPage';
import ExpenseDetail from './Outcomes/ExpenseDetail';
import CategoryPage from './Outcomes/CategoryPage';
import CategoryDetail from './Outcomes/CategoryDetail';
import CropDetail from './Crops/CropDetail';
import IncomesPage from './Incomes/IncomesPage'
import IncomeDetail from './Incomes/IncomeDetail';
import FarmMain from './Index/FarmMain';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>

                    <Route exact path="/data/" component={FarmMain} />
                    <Route exact path="/farms/:id" component={FarmDetail} />
                    <Route exact path='/χωράφια/' component={FarmsPage} />
                    
                    <Route exact path='/δέντρα/' component={TreePage} />
                    <Route exact path='/trees/:id/' component={TreeDetail} />

                    
                    <Route exact path='/καλλιέργιες/' component={CropsPage} />
                    <Route exact path='/καλλιέργιες/:id/' component={CropDetail} />
                    <Route exact path='/καλλιέργιες/δημιουργία/' component={CropsCreate} />

                    <Route exact path='/expenses/' component={ExpensesPage} />
                    <Route exact path='/expenses/:id/' component={ExpenseDetail} />

                    <Route exact path='/expenses-categories/' component={CategoryPage} />
                    <Route exact path='/expenses-categories/:id' component={CategoryDetail} />

                    <Route exact path='/incomes/invoices/' component={IncomesPage} />
                    <Route exact path='/incomes/invoices/:id/' component={IncomeDetail} />


                    <Route component={Index} />
                </Switch>
            </BrowserRouter>
        )
    }
}


ReactDOM.render(<App />,document.getElementById('app'));

