import React, { Component, Fragment } from 'react';
import Layout from './_components/shared/Layout';
import BaseLayout from './_components/shared/base-layout';
import { Route, Switch, Redirect } from 'react-router';
import { Home } from './_components/dummy/Home';
import { ListPlatform, AddPlatform, EditPlatform } from './_components/platform';
import { ListClient, AddClient, DetailClient } from './_components/client';
import { AddProject, ListProject, DetailProject } from './_components/project';
import { ListResource, AddResource } from './_components/resource';
import { ListLocationBillingRole } from './_components/location-billingrole';
import { Counter } from './_components/dummy/Counter';
import { Login } from './_components/auth/Login';


const DashboardLayout = ({ children, ...rest }) => {
    return (
        <Layout>
            {children}
        </Layout>
    )
}

const LoginLayout = ({ children, ...rest }) => {
    return (
        <BaseLayout>
            {children}
        </BaseLayout>
    )
}

const DashboardRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            localStorage.getItem('user')
                ? (
                    <DashboardLayout>
                        <Component {...matchProps} />
                    </DashboardLayout>
                ) : (<Redirect to={{ pathname: '/login', state: { from: matchProps.location } }} />)
        )} />
    )
};

const LoginLayoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <LoginLayout>
                <Component {...matchProps} />
            </LoginLayout>
        )} />
    )
};


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
            <Switch>
                <LoginLayoutRoute exact path='/login' component={Login} />

                <DashboardRoute exact path='/' component={Home} />
                <DashboardRoute path='/counter' component={Counter} />

                <DashboardRoute exact path='/resources/add' component={AddResource} />
                <DashboardRoute exact path='/resources' component={ListResource} />
                <DashboardRoute exact path='/resources/:id' component={ListResource} />

                <DashboardRoute exact path='/projects/add' component={AddProject} />
                <DashboardRoute exact path='/projects' component={ListProject} />
                <DashboardRoute exact path='/projects/:id' component={DetailProject} />
                <DashboardRoute exact path='/projects/:id/allocate' component={ListResource} />

                <DashboardRoute path='/clients/add' component={AddClient} />
                <DashboardRoute exact path='/clients' component={ListClient} />
                <DashboardRoute exact path='/clients/:id' component={DetailClient} />
                <DashboardRoute exact path='/clients/:id/projects/add' component={AddProject} />

                <DashboardRoute exact path='/billingroles/add' component={AddProject} />
                <DashboardRoute exact path='/billingroles' component={ListLocationBillingRole} />
                <DashboardRoute exact path='/billingroles/:id' component={DetailProject} />

                <DashboardRoute path='/platforms/add' component={AddPlatform} />
                <DashboardRoute path='/platforms/edit' component={EditPlatform} />
                <DashboardRoute path='/platforms' component={ListPlatform} />
            </Switch>
        );
    }
}

export default App;