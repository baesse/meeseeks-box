
const routesTemplateIndex = `
import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import isAuthenticated from "./isAuthenticated";
import urls from "utils/constants/urls";

export const history = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: urls.ROUTES.APP, state: { from: props.location } }}
          />
        )
      }
    />
);
  

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={urls.ROUTES.APP} component={<div>oi</div>} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
`
module.exports.routesTemplateIndex = routesTemplateIndex
