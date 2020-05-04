import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './Home';
class AppContainer extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Switch>
          <Route component={Home} exact path="/" />
        </Switch>
      </div>
    );
  }
}
export default AppContainer;
