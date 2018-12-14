import React, { Component } from 'react';
import Layout from './_components/shared/Layout';
import { Route, Switch } from 'react-router';
import { Home } from './_components/dummy/Home';
import { ListPlatform, AddPlatform, EditPlatform } from './_components/platform';
import { ListClient, AddClient, DetailClient } from './_components/client';
import { AddProject, ListProject, DetailProject } from './_components/project';
import { ListResource, AddResource } from './_components/resource';
import { ListLocationBillingRole } from './_components/location-billingrole';
import { Counter } from './_components/dummy/Counter';
import { Login } from './_components/auth/Login';
import { PrivateRoute } from './_components/auth/PrivateRoute';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends Component {
    displayName = App.name
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        //history.listen((location, action) => {
        //    // clear alert on location change
        //    dispatch(alertActions.clear());
        //});
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <PrivateRoute path='/counter' component={Counter} />

                    <PrivateRoute exact path='/resources/add' component={AddResource} />
                    <PrivateRoute exact path='/resources' component={ListResource} />
                    <PrivateRoute exact path='/resources/:id' component={ListResource} />

                    <PrivateRoute exact path='/projects/add' component={AddProject} />
                    <PrivateRoute exact path='/projects' component={ListProject} />
                    <PrivateRoute exact path='/projects/:id' component={DetailProject} />
                    <PrivateRoute exact path='/projects/:id/allocate' component={ListResource} />

                    <PrivateRoute path='/clients/add' component={AddClient} />
                    <PrivateRoute exact path='/clients' component={ListClient} />
                    <PrivateRoute exact path='/clients/:id' component={DetailClient} />
                    <PrivateRoute exact path='/clients/:id/projects/add' component={AddProject} />

                    <PrivateRoute exact path='/billingroles/add' component={AddProject} />
                    <PrivateRoute exact path='/billingroles' component={ListLocationBillingRole} />
                    <PrivateRoute exact path='/billingroles/:id' component={DetailProject} />


                    <PrivateRoute path='/platforms/add' component={AddPlatform} />
                    <PrivateRoute path='/platforms/edit' component={EditPlatform} />
                    <PrivateRoute path='/platforms' component={ListPlatform} />
                </Switch>
            </Layout>
        );
    }
}

export default App;