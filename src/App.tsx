import React from 'react';
import './styles/App.scss';
 
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import components
import Navbar from './components/Navbar'
import Main from './components/Main'
import Cafees from './components/cafees/Cafees'
import Cafee from './components/cafees/Cafee'
import EditCafe from './components/cafees/EditCafe';
import CreateCafe from './components/cafees/CreateCafe';
import NotFound from './components/404'
import Owners from './components/owners/Owners';
import Owner from './components/owners/Owner';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Navbar />
            <div className="container">
                <Switch>
                    {/* Cafees */}
                    <Route path="/cafees/:cafeId/edit">
                        <EditCafe />
                    </Route>
                    <Route path="/cafees/create">
                        <CreateCafe />
                    </Route>
                    <Route path="/cafees/:cafeId">
                        <Cafee />
                    </Route>
                    <Route exact path="/cafees">
                        <Cafees />
                    </Route>
                    {/* Owners */}
                    <Route exact path="/owners/:ownerId">
                        <Owner />
                    </Route>
                    <Route exact path="/owners">
                        <Owners />
                    </Route>
                    {/* Home */}
                    <Route exact path="/">
                        <Main />
                    </Route>

                    {/* 404 */}
                    <Route path="/">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
