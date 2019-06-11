import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Recipe from './RecipeComponent';
import RecipeDetail from './RecipeDetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import {connect} from 'react-redux';
import {fetchRecipes, postFeedback, fetchFeedbacks, postRecipe, deleteRecipe, updateRecipe,
     fetchFounders, postGeneralFeedback, fetchPromotions, loginUser, logoutUser} from '../redux/ActionCreator';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStateToProps = state => {
    return {
        recipes : state.recipes,
        feedbacks :state.feedbacks,
        founders : state.founders,
        promotions : state.promotions,
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => ({
fetchRecipes : () => {dispatch(fetchRecipes())},
fetchFeedbacks : () => {dispatch(fetchFeedbacks())},
postFeedback :(recipeId, rating, comment) => {dispatch(postFeedback (recipeId, rating, comment))}, 
postRecipe :(name, imageFileName, category, ingredients, direction, description, imageFile) =>
   {dispatch(postRecipe(name, imageFileName, category, ingredients, direction, description, imageFile))},
deleteRecipe:(recipeId, history)=> {dispatch(deleteRecipe(recipeId, history))},
updateRecipe:(recipe, recipeId)=> {dispatch(updateRecipe(recipe, recipeId))},
fetchFounders:()=> {dispatch(fetchFounders())},
postGeneralFeedback :(firstname, lastname, telnum, email, agree, contactType, message) => 
{dispatch(postGeneralFeedback (firstname, lastname, telnum, email, agree, contactType, message))},
resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))},
resetSearchForm:()=>{dispatch(actions.reset('searchform'))},
fetchPromotions:() => {dispatch(fetchPromotions())},
loginUser: (creds) => dispatch(loginUser(creds)),
logoutUser: () => dispatch(logoutUser())

})
class Main extends Component {
    componentDidMount(){
    this.props.fetchRecipes();
    this.props.fetchFeedbacks();  
    this.props.fetchFounders();
    this.props.fetchPromotions();
  }
    render(){
        const RecipeWithId =({match}) => {

            return(
                this.props.auth.isAuthenticated
                ?
                <RecipeDetail recipe={this.props.recipes.recipes.
                    filter((recipe)=>recipe._id===match.params.recipeId)[0]}
                    isLoading={this.props.recipes.isLoading}
                    errMess={this.props.recipes.errMess}
                    postFeedback={this.props.postFeedback}
                    feedbacks={this.props.feedbacks.feedbacks
                    .filter((feedback) => feedback.recipe === match.params.recipeId)}
                    deleteRecipe={this.props.deleteRecipe}
                    updateRecipe={this.props.updateRecipe}
                    />
                    :
                    <RecipeDetail recipe={this.props.recipes.recipes.
                    filter((recipe)=>recipe._id===match.params.recipeId)[0]}
                    isLoading={this.props.recipes.isLoading}
                    errMess={this.props.recipes.errMess}
                    postFeedback={this.props.postFeedback}
                    feedbacks={this.props.feedbacks.feedbacks
                    .filter((feedback) => feedback.recipe === match.params.recipeId)}
                    deleteRecipe={this.props.deleteRecipe}
                    updateRecipe={this.props.updateRecipe}
                    />
            );
        }
        return(
            <div>
                <Header
                    auth={this.props.auth} 
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser} />
                    <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                        <Route path="/home" component={() => <Home promotions={this.props.promotions}
                        resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                        <Route exact path="/recipe" component={()=><Recipe recipes={this.props.recipes}
                        postRecipe={this.props.postRecipe}/>}/>
                        <Route  path="/recipe/:recipeId" component={RecipeWithId}/>}/>
                        <Route exact path="/contactus" component={()=><Contact
                            postGeneralFeedback={this.props.postGeneralFeedback}
                            resetFeedbackForm = {this.props.resetFeedbackForm}/>}/>
                        <Route exact path="/aboutus" component={()=><About
                            founders={this.props.founders}/>}/>
                        
                        <Redirect to="/home"/>
                        </Switch>
                    </CSSTransition> 
                    </TransitionGroup> 
                <Footer/>
            </div>
        );
    }  
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));