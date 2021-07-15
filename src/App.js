import Header from './component/header';
import {BrowserRouter as Router, 
  Switch, Route } from 'react-router-dom';
import Home from './Home';
import Newform from "./Newform";
import Status from './Status';
import Pagenotfound from "./Pagenotfound";


function App() {
  return (
    <div className="App">
      <Header></Header>
      
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/status" exact component={Status} />
          <Route path="/apply" exact component={Newform} />
          <Route path="*" component={Pagenotfound} /> 
      </Switch>
     
    </div>
  );
}

export default App;
