import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb,BreadcrumbItem, Button,
     Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) && (val.length>=len);

class AddRecipe extends Component {
    constructor(props){
        super(props);
         this.state={
             modal:false,
             imageFile: null,
             imageFileName:''
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({imageFile:e.target.files[0]});
         switch (e.target.name) {
            case 'image':
                if(e.target.files.length > 0) {
                    this.setState({ imageFileName: e.target.files[0].name });
                }
                break;
            default:
                this.setState({ [e.target.name]: e.target.value });
            }
    }
     handleSubmit(values){
         console.log(this.state.imageFileName);
        this.props.postRecipe( values.name, this.state.imageFileName, values.category, values.ingredients, values.direction,
        values.description, this.state.imageFile);
    } 
    toggleModal(){
        this.setState({modal:!this.state.modal})
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Button  color="primary" onClick={this.toggleModal}>
                        <span className="fa fa-plus">Add</span>
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Add your recipe</ModalHeader>
                        <ModalBody>
                            <LocalForm  onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="name" md={2}>Recipe</Label>
                                    <Col md={8}>
                                        <Control.text model=".name" id="name" name="name"
                                        placeholder="Recipe Name" 
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
                                          placeholder="image" onChange={ (event) => this.onChange(event) }
                                          className="form-control"
                                          />   
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="category" md={2}>Category</Label>
                                    <Col md={5}>
                                        <Control.select type="text" model=".category" id="category" name="category" className="form-control">
                                            <option>main</option>
                                            <option>appetizer</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="ingredients" md={2}>Ingredients</Label>
                                    <Col md={10}>
                                            <Control.textarea model=".ingredients" id="ingredients" name="ingredients" rows="10" 
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
                                        <Control.textarea model=".direction" id="direction" name="direction" rows="10" 
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
                                        <Control.textarea model=".description" id="description" name="description" rows="10" 
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
                                    <Button type="submit" color="primary">Add</Button>
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
function RenderRecipeItem({recipe}){
    return (
        <Card> 
            <Link to={`/recipe/${recipe._id}`}>         
                <CardImg width="100%" src={baseUrl + recipe.image} alt={recipe.name} />
                    <CardImgOverlay >
                        <CardTitle  >{recipe.name}</CardTitle>
                    </CardImgOverlay>
            </Link>       
        </Card>
    );
}

const Recipe = (props) => {
        const recipe = props.recipes.recipes.map((recipe)=>{
            return(
                <div key={recipe._id} className="col-12 col-md-5 m-1">
            <RenderRecipeItem recipe={recipe}/>
            </div>
            ); 
        });
        if(props.recipes.isLoading){
            return(
                 <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
            ); 
        }
        else if(props.recipes.errMess){
            return(
                 <div className="container">
                <div className="row">
                    <h5>{props.recipes.errMess}</h5>
                </div>
            </div>
            );
        }
        else{
            return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Recipe</BreadcrumbItem>
                    </Breadcrumb>

                     <Breadcrumb className="ml-auto">
                        <BreadcrumbItem>
                            <AddRecipe postRecipe={props.postRecipe}/>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Recipes</h3>
                    </div>
                </div>
                <div className="row">
                    {recipe}
                </div>
            </div>
          );
        }
}
export default Recipe;