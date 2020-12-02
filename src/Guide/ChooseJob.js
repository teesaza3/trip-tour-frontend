

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarGuide from '../NavBar/NavBarGuide.js';
import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import slide1 from '../img/h1.jpg';
import slide2 from '../img/h2.jpg';
import slide3 from '../img/h3.jpg';



import { Container, Col, Row, Carousel, Card, Button } from 'react-bootstrap';


function ChooseJob() {
  const params = useParams();
  const url = "http://192.168.102.22:3030/api"



//Carousel
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const cardImg = [
    { img: slide1},
    { img: slide2},
    { img: slide3}

  ];



  const disabledDates = [new Date(2020,10,29),new Date(2020,10,27),new Date(2020,10,24)]
  const [trip,setTrip] = useState([])
  const [province,setProvince] = useState('')


  
  useEffect(async() => {

    //Get All Trip
      const res = await axios.get(url + '/trip/'+ params.id, { headers: {Authorization: localStorage.getItem('token')}} )
      console.log(res.data);
      const trip = res.data
      setTrip(trip)
      

      const resProvince = await axios.get(url + '/province/'+ trip.province_id, { headers: {Authorization: localStorage.getItem('token')}} )
      console.log(resProvince.data);
      setProvince(resProvince.data)
        
    }, [])



  return (
    <div>
      <Container style={{ marginTop: 80}}>
        <Row className=""  >
            <Col sm={8}>
              <Row>
              <Card style={{ width: '40rem'}}>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    {
                      cardImg.map(i => {
                        return (
                          <Carousel.Item>
                          <img
                            className="d-block w-100"
                            src={i.img}>
                          </img>
                          </Carousel.Item>
                        )
                      })
                    }                
                </Carousel>
                <Card.Body>
               

                  <Card.Text>
                  <dl class="row">
                    <dt class="col-sm-3">Name Trip</dt>
                    <dd class="col-sm-9">{trip.name}</dd>

                    <dt class="col-sm-3">Detail</dt>
                    <dd class="col-sm-9">
                      <p>{trip.detail}</p>
                    </dd>

                    <dt class="col-sm-3">Province</dt>
                  <dd class="col-sm-9">{province.name}</dd>

                    <dt class="col-sm-3 text-truncate">Main activities</dt>
                  <dd class="col-sm-9">{trip.tag}</dd>

                    <dt class="col-sm-3">Price</dt>
                    <dd class="col-sm-9">
                      <dl class="row">
                      <dd class="col-sm-8">{trip.price} / person </dd>
                      </dl>
                    </dd>
                    <dt class="col-sm-3 text-truncate">Maximum travelers</dt>
                    <dd class="col-sm-9">{trip.person}</dd>

                  </dl>
                  </Card.Text>
                </Card.Body>
            </Card> 
                
                  
                                
              </Row>
              <Row style={{ marginTop: 50 }}>
              
                  Photo Gallery
                    
              </Row>
            </Col>

            <Col sm={4}>
                <Row>
                <Calendar
                  tileDisabled={({ date }) => {
                    for (const disabledDate of disabledDates) {
                      if (
                        disabledDate.getDate() === date.getDate() &&
                        disabledDate.getMonth() === date.getMonth()
                      ) {
                        return true;
                      }
                    }
                    return false;
                  }}
                />

                </Row>
                <Row className="justify-content-center" style={{ marginTop: 40}}>
                  <Button > Save Change</Button>

                </Row>



            </Col>

        </Row>
      </Container>
    </div>
  );
}

export default ChooseJob;
