import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb,BreadcrumbItem, 
    Button, Modal, ModalBody, ModalHeader, Col, Row, Label} from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {FadeTransform, Fade} from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) && (val.length>=len);

  function RecipeFeedbacks({feedbacks}){
      const recipefeedbacks =feedbacks.map((feedback) => {
        return(
            <ul key={feedback._id} className="list-unstyled">
                <li>{feedback.comment}</li>
                <li> {feedback.rating} stars</li>   
                <li>{"--"+feedback.author.firstname} {feedback.author.lastname},{new Intl.DateTimeFormat(
                                        'en-US',{year:'numeric', month:'short', day:'2-digit'})
                                    .format(new Date(Date.parse(feedback.updatedAt)))} </li>                
            
            </ul>
        );
    })
    if(feedbacks!=null){
        return (
            <div>
            <h4>See what our user's has to say!!!</h4>
            {recipefeedbacks}
        </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
  }
class Feedback extends Component {
    constructor(props){
        super(props);
        this.state={
                 modal:false,
                 feedbackModal:false
             }
             this.handleSubmit=this.handleSubmit.bind(this);
             this.toggleModal=this.toggleModal.bind(this);
             this.toggleFeedbackModal=this.toggleFeedbackModal.bind(this);
    }
    toggleModal(){
             this.setState({modal:!this.state.modal})
     }
     toggleFeedbackModal(){
             this.setState({feedbackModal:!this.state.feedbackModal})
     }

    handleSubmit(values){
             this.props.postFeedback(this.props.recipeId, values.rating, values.comment);
    }
  
    render(){
        return(
            <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Button outline onClick={this.toggleModal} color="secondary">
                                <span className="fa fa-pencil fa-lg">Submit Feedback</span> 
                            </Button>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <Button outline onClick={this.toggleFeedbackModal} color="secondary">
                            <span className="fa fa-info fa-lg">User's Feedback</span> 
                            </Button>
                        </div>

                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Feedback</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating" md={2}>Rating</Label>
                                        <Control.select type="number" model=".rating" name="rating" className="form-control mx-3">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>   
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="comment" md={2}>Comment</Label>
                                        <Control.textarea model=".comment" name="comment" className="form-control mx-3" rows="6"/>
                                    </Row>
                                    <Row className="form-group">
                                                <Col md={{size:10, offset:2}}>
                                                    <Button type="submit" color="primary">Submit</Button>
                                                </Col>
                                    </Row>
                                </LocalForm>
                            </ModalBody>
                        </Modal>

                        <Modal isOpen={this.state.feedbackModal} toggle={this.toggleFeedbackModal}>
                            <ModalBody>
                                <div>
                                    <RecipeFeedbacks feedbacks={this.props.feedbacks} />
                                </div> 
                            </ModalBody>
                        </Modal>
                  </div>
              </div>
        );
    }
    
}
class DeleteRecipe extends Component{
    constructor(props){
        super(props);
        this.delrecipe = this.delrecipe.bind(this);
    }
    delrecipe=(event)=>{
        alert('You are about to delete recipe!'+ this.props.recipeId);
        this.props.deleteRecipe(this.props.recipeId, this.props.history);


    } 
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Button  type="submit" color="primary" onClick={this.delrecipe}
                     className="fa fa-trash" >Delete </Button>
                </div>
            </div>
        );
    }
}
class EditRecipe extends Component{
    constructor(props){
        super(props);
        this.state={
            isEditing:false,
            recipe:this.props.recipe,
            id:this.props.recipe._id,
            name:'',
            image:this.props.recipe.image,
            category:'main',
            ingredients:'',
            direction:'',
            description:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.updateRecipeState = this.updateRecipeState.bind(this);
        
    }
    handleSubmit(e){
       
        e.preventDefault();
        const updatedRecipe = {
            name:this.state.recipe.name,
            image:this.state.image,
            category:this.state.recipe.category,
            ingredients:this.state.recipe.ingredients,
            direction:this.state.recipe.direction,
            description:this.state.recipe.description
        }
        this.props.updateRecipe(updatedRecipe, this.state.id);
        this.toggleEdit();   
    }
    toggleEdit(){
        this.setState({isEditing:!this.state.isEditing})
    }
    updateRecipeState(event) {
        const field = event.target.name;
        const recipe = this.state.recipe;
        recipe[field] = event.target.value;
        return this.setState({recipe: recipe});  
  }
     render(){
        return(
            <div className="container">
                <div className="row">
                   <Button className="fa fa-pencil fa-lg" color="primary" onClick={this.toggleEdit}>Edit </Button>
                   <Modal isOpen={this.state.isEditing} toggle={this.toggleEdit}>
                        <ModalHeader toggle={this.toggleEdit}>Edit recipe</ModalHeader>
                        <ModalBody>
                            <LocalForm  onSubmit={() => this.handleSubmit()}>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={2}>Recipe</Label>
                                    <Col md={8}>
                                        <Control.text model=".name" id="name" name="name" refs="name"
                                        placeholder="Recipe Name" 
                                        value={this.props.recipe.name}
                                        onChange={this.updateRecipeState}
                                        className="form-control"
                                        validators={{required, minLength:minLength(3), maxLength:maxLength(15) }} />
                                         < Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Required'+' ',
                                                minLength: '/Must be greater than 2 characters'+ ' ',
                                                maxLength: 'Must be 15 characters or less'
                                            }}/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="image" md={2}>Image</Label>
                                    <Col md={8}>
                                        <Control.file model=".image" id="image" name="image" 
                                            disabled
                                            placeholder="image" 
                                            className="form-control"
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="category" md={2}>Category</Label>
                                    <Col md={5}>
                                        <Control.select type="text" model=".category" id="category"
                                         name="category" value={this.props.recipe.category} refs="category"
                                        onChange={this.updateRecipeState}
                                         className="form-control">
                                            <option>main</option>
                                            <option>appetizer</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="ingredients" md={2}>Ingredients</Label>
                                    <Col md={10}>
                                            <Control.textarea model=".ingredients" id="ingredients" name="ingredients"
                                             refs="ingredients" rows="10" 
                                            value={this.props.recipe.ingredients}
                                            onChange={this.updateRecipeState}
                                            className="form-control"
                                            validators={{required }}/>
                                            < Errors
                                                className="text-danger"
                                                model=".ingredients"
                                                show="touched"
                                                messages={{
                                                    required: 'Required'
                                                }}
                                            />
                                    </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="direction" md={2}>Direction</Label>
                                <Col md={10}>
                                        <Control.textarea model=".direction" id="direction" name="direction" 
                                        refs="direction" rows="10" 
                                        value={this.props.recipe.direction}
                                        onChange={this.updateRecipeState}
                                        className="form-control"
                                        validators={{required }}/>
                                        < Errors
                                            className="text-danger"
                                            model=".direction"
                                            show="touched"
                                            messages={{
                                                required: 'Required'
                                            }}
                                         />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="description" md={2}>Description</Label>
                                <Col md={10}>
                                        <Control.textarea model=".description" id="description" name="description"
                                         refs="description" rows="10" 
                                        value={this.props.recipe.description}
                                        onChange={this.updateRecipeState}
                                        className="form-control"
                                        validators={{required }}/>
                                        < Errors
                                            className="text-danger"
                                            model=".description"
                                            show="touched"
                                            messages={{
                                                required: 'Required'
                                            }}
                                         />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:2}}>
                                    <Button type="submit" color="primary" onClick={this.handleSubmit}>Update</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}

const RecipeDetail = (props) => {
    if(props.isLoading){
        return(
                 <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
            ); 
    }
    else if(props.errMess){
        return(
        <div className="container">
                <div className="row">
                    <h5>{props.errMess}</h5>
                </div>
            </div>
            );
    }
    else if (props.recipe!=null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/recipe'>Recipe</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.recipe.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <Breadcrumb  className="ml-auto ">
                        <BreadcrumbItem className="btn-group" role="group">
                            <div >
                                <DeleteRecipe recipeId={props.recipe._id}
                                deleteRecipe={props.deleteRecipe}/>
                            </div>
                            <div className="offset-1 ">
                                <EditRecipe recipe={props.recipe}
                                updateRecipe={props.updateRecipe}/>
                            </div> 
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h4>{props.recipe.name}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderRecipe recipe={props.recipe}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderRecipeDetail recipe={props.recipe}/>
                        <Feedback recipeId={props.recipe._id} postFeedback={props.postFeedback}
                         feedbacks={props.feedbacks}/>                    
                    </div>   
                    
                </div>
          </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

function RenderRecipe({recipe}){
    return(
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <Card>
         <CardImg width="100%" src={baseUrl + recipe.image} alt={recipe.name} />
         <CardBody>
            <CardText>{recipe.description}</CardText>
         </CardBody>
       </Card>
    </FadeTransform>
    );  
}
function RenderRecipeDetail({recipe}){
    return(
        <Fade in>
            <div>
                <h2>{recipe.name}</h2>
                <div>
                    <p><h4>Ingredients:</h4>
                    {recipe.ingredients}
                    </p>
                    <p><h4>Directions:</h4>
                    {recipe.direction}
                    </p>
                </div>
          </div>
       </Fade>
    );    
}

    
export default RecipeDetail;