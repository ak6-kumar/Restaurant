import React, { Component } from 'react';
import Home from './HomeComponents';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './menuComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { postComment,fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup,CSSTransition} from 'react-transition-group';


const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders  
  }
}

const mapDispatchToProps = dispatch =>({
    postComment: (dishId,author,rating,comment)=> dispatch(postComment(dishId,author,rating,comment))
    ,fetchDishes: ()=>{dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
});

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const dishWithId = ({match}) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id===parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errmsg={this.props.dishes.errmsg}
        comments={this.props.comments.comments.filter((comment)=> comment.dishId===parseInt(match.params.dishId,10))}
        errmsg={this.props.comments.errmsg}
        postComment={this.props.postComment}
        />
      );
    }
    return (
      <div>
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch>
                <Route path="/home" component={()=>
                <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                disheserr={this.props.dishes.errmsg}
                promos={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promoserr={this.props.promotions.errmsg}
                leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrmsg={this.props.leaders.errmsg}
                />
                }/>
                <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
                <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
                <Route path="/menu/:dishId" component={dishWithId}/>
                <Route path="/aboutus" component={()=><About leaders={this.props.leaders} />}/>
                <Redirect to="/home"/>
              </Switch>
                </CSSTransition>
        </TransitionGroup>
        <br/>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));