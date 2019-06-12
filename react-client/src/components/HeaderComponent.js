import React, { Component } from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse, Jumbotron, Button,
    Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component{
    constructor(props){
       super(props);
       this.state={
           isNavOpen:false,
           isModalOpen:false,
           isUserModalOpen:false
       }
       this.toggleNav=this.toggleNav.bind(this);
       this.toggleModal=this.toggleModal.bind(this);
       this.toggleModalUser=this.toggleModalUser.bind(this);
       this.handleLogin=this.handleLogin.bind(this);
       this.handleLogout = this.handleLogout.bind(this);
    }
     toggleNav (){
        this.setState({isNavOpen:!this.state.isNavOpen});
    }
    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});

    }
    toggleModalUser(){
        this.setState({isUserModalOpen:!this.state.isUserModalOpen});
    }
    handleLogin(event){
        this.toggleModal();
        this.props.loginUser({username: this.username.value, password: this.password.value});
        event.preventDefault();
    }
    handleRegister(event){
        this.toggleModalUser();
         this.props.registerUser({username: this.username.value, password: this.password.value,
                                 firstname:this.firstname.value, lastname:this.lastname.value});
        event.preventDefault();
    }
     handleLogout() {
        this.props.logoutUser();
    }
    render(){
        return(
            <React.Fragment>
                <Navbar dark expand ="md">
                    <div className="container">
                    <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/logo.png" height="95" width="75" alt="Recipe"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span>Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/recipe">
                                        <span className="fa fa-list fa-lg"></span>Recipe
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/favorites">
                                        <span className="fa fa-heart fa-lg"></span> My Favorites
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"></span>About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span>Contact Us
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <div>
                                            <Button outline onClick={this.toggleModal}>
                                                <span className="fa fa-sign-in fa-lg"></span> Login
                                                {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                                }
                                            </Button>
                                            <Button outline onClick={this.toggleModalUser}>
                                                <span className="fa fa-user fa-lg"></span> Sign Up
                                            </Button>
                                        </div>
                                        :
                                        <div>
                                            <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                            <Button outline onClick={this.handleLogout}>
                                                <span className="fa fa-sign-out fa-lg"></span> Logout
                                                {this.props.auth.isFetching ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : null
                                                }
                                            </Button>
                                        </div>
                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Sam's Recipe</h1>
                                <blockquote className="blockquote">
                                    <p className="mb-0">“You don’t have to cook fancy or complicated masterpieces,
                                     just good food from fresh ingredients.”</p>
                                    <footer className="blockquote-footer">Julia Child
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                    innerRef={(input)=> this.username=input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                    innerRef={(input)=> this.password=input}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input)=> this.remember=input}/>
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isUserModalOpen} toggle={this.toggleModalUser}>
                    <ModalHeader toggle={this.toggleModalUser}>Register a new account</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleRegister}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                    <Input type="text" id="username" name="username"
                                    innerRef={(input)=> this.username=input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                    <Input type="password" id="password" name="password"
                                    innerRef={(input)=> this.password=input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="firstname">First Name</Label>
                                    <Input type="text" id="firstname" name="firstname"
                                    innerRef={(input)=> this.firstname=input}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="lastname">Last Name</Label>
                                    <Input type="text" id="lastname" name="lastname"
                                    innerRef={(input)=> this.lastname=input}/>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        ); 
    }
}
export default Header;