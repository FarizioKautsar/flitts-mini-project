import React, { Component } from 'react'
import './App.css';
import Button from './component/Button';
import Navbar from './component/Navbar';
import MovieList from './container/MovieList';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
  // useParams
} from 'react-router-dom'; 
import MovieDetail from './container/MovieDetail';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 100000,
    }
    this.buyMovie = this.buyMovie.bind(this)
  }

  buyMovie(price) {
    this.setState({balance: this.state.balance - price})
  }

  render() {
    // let {id} = useParams()
    return (
      <Router>
        <Navbar balance = {this.state.balance}/>
        <div className="container py-5">
          <Switch> 
            <Route exact path='/'>
              <MovieList buyMovie = {this.buyMovie}/>
            </Route> 
            <Route exact path='/cart/' >
              <Button variant="blue">This is the cart</Button>
            </Route>
            <Route exact path='/:slug' render={(props) => <MovieDetail {...props}/>}>
              {/* <MovieDetail {...props}/> */}
              {/* <Button variant="blue">Movie Dettail</Button> */}
            </Route> 
          </Switch>           
        </div>
      </Router>
    );
  }

}
