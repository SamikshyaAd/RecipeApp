import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardImg, CardTitle, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import {FadeTransform} from 'react-animation-components';

function DisplayFounder({founder}){
    return(
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <Card>
            <CardImg width="100%" src={baseUrl + founder.image} alt={founder.name} />
            <CardBody>
                <div>
                    <CardTitle>{founder.name}</CardTitle>
                    <ul className="list-unstyled">
                        <li>{founder.designation}</li>
                        <li>{founder.description}</li>
                    </ul>
                </div>
            </CardBody>
        </Card>
     </FadeTransform> 
    );
}
const About = (props) =>{
    const founder = props.founders.founders.map((founder)=>{
            return(
                <div key={founder._id} className="col-12 col-md-5 m-1">
                    <DisplayFounder founder={founder}/>
                </div>
            ); 
    });
    if(props.founders.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }
    else if(props.founders.errMess){
         return(
                 <div className="container">
                <div className="row">
                    <h5>{props.founders.errMess}</h5>
                </div>
            </div>
            );
    }
    else{
        return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>        
            </div>
            <div className="row">
                <p id="aboutquote">We envison a world where anyone, anywhere can cook healthy and delicious food by accessing 
                world's best recipe.</p>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our Story</h2>
                    <p>Recipe website is made by <em>Samikshya Adhikari</em>. Samikshya is a computer engineer who loves to 
                    make different variety of foods i.e Nepali, American, Indian and many more. She came up with an idea to 
                    share her recipes to  the world by developing a <em>Recipe</em> website where people from around the world 
                    can learn her recipe and cook healthy and delicious food. </p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">About Us</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">April, 2019</dd>
                                <dt className="col-6">Variety of recipes</dt>
                                <dd className="col-6">Nepalies, Indian, American & more</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                
                    {founder}
                    
                </div>  
             </div>      
        </div>  
    );
    }
}
export default About;