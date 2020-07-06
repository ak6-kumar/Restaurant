import React, { Component } from 'react';
import Home from './HomeComponents';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './menuComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import { Switch,Route,Redirect} from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null,
        comments:COMMENTS,
        leaders:LEADERS,
        promotions:PROMOTIONS
    };
  }


  render() {
    const dishWithId = ({match}) => {
      return (
        <DishDetail dish={this.state.dishes.filter((dish)=> dish.id===parseInt(match.params.dishId,10))[0]}
        comments={this.state.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10))}
        />
      );
    }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={()=>
          <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
          promo={this.state.promotions.filter((promo)=>promo.featured)[0]}
          leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
          />
          }/>
          <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}/>}/>
          <Route exact path="/contactus" component={Contact}/>
          <Route path="/menu/:dishId" component={dishWithId}/>
          <Route path="/aboutus" component={()=><About leaders={this.state.leaders}/>}/>
          <Redirect to="/home"/>
        </Switch>
        <br/>
        <Footer/>
      </div>
    );
  }
}

export default Main;