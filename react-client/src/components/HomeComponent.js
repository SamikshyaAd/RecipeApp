import React, {Component} from 'react';
import {baseUrl} from '../shared/baseUrl';
import {Loading} from './LoadingComponent';
import {Card, CardImg, CardImgOverlay, CardTitle, CardBody, Button, Label, Col, Row} from 'reactstrap';
import {Control, Form} from 'react-redux-form';
import {FadeTransform} from 'react-animation-components';



class Home extends Component{
    constructor(props){
        super(props);
    
       this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(values){
        alert ("Search item:"+JSON.stringify(values.search));
        this.props.resetFeedbackForm();
        
    } 
    render(props){
        const promotion = this.props.promotions.promotions.map((promotion) =>{
         return(
                <div key={promotion.id} className="col-12 col-md-5 m-1">
                   <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card>
                            <CardImg width="100%" src={baseUrl + promotion.image} alt={promotion.name} />
                            <CardImgOverlay>
                                <CardTitle id="card">{promotion.name}</CardTitle>
                                <CardBody id="card">{promotion.description}</CardBody>
                            </CardImgOverlay>
                        </Card>
                    </FadeTransform>
                </div>
            ); 
    });
    if(this.props.promotions.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }
    else if(this.props.promotions.errMess){
         return(
                 <div className="container">
                <div className="row">
                    <h5>{this.props.promotions.errMess}</h5>
                </div>
            </div>
            );
    }
    else {
        return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <mark className="font-weight-bold font-italic text-info">Follow us on:</mark> 
                    <div>
                        <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                    </div>
                </div>
                <div className="col-12 col-md-5 m-1 ml-auto">
                    <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="search" className="fa fa-search"></Label>
                            <Col>
                                <Control.text model=".search" id="search" name="search"
                                placeholder="search " 
                                className="form-control "/>
                            </Col>
                            <Button type="submit" color="primary">Search</Button>
                        </Row>
                    </Form>
                </div>
            </div>
            <div className="row row-content">
                {promotion}
            </div>
        </div>
    );
    } 
    }     
}
export default Home;