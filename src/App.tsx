import './App.less';
import { Switch, Route } from 'react-router-dom';
import { Error, OrderBook } from './screens';

function App() {
  return (
    <Switch>
      <Route path="/error">
        <Error />
      </Route>
      <Route path="/">
        <OrderBook />
      </Route>
    </Switch>
  );
}

export default App;
