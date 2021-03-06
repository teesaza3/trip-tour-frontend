

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Container, Row, CardColumns, CardGroup, Card,Button } from 'react-bootstrap'


function SelectTrip() {
    const url = "http://192.168.102.22:3030/api"

    const cardInfo = [
        { image: "", title: "Bahli", text: " Test" },
        { image: "", title: "Phuket", text: " Test" },
        { image: "", title: "Samutsakhon", text: "Test " },
        { image: "", title: "Koh samui", text: " Test" },
        { image: "", title: "Koh kud", text: "Test " }
    ];
    //Trip
    const [tripOption, setTripOption] = useState([]);

    const test = () => {
        console.log(tripOption);
    }


    useEffect(() => {

        //Get All Trip
            axios.get(url + '/trip',{ headers: {Authorization: localStorage.getItem('token')}} ).then(res => {
                console.log(res.data);
                const trips = res.data.map((d)=> d)
                setTripOption(trips)
        })
    
            
        }, [])

    return (
        <div>
            <Container>
                <Row className="justify-content-md-center">
                    <CardGroup style={{ marginTop: 80 }}>
                        <CardColumns>
                            {
                                tripOption.map(a => {
                                    return (
                                        <Card>
                                            <Card.Img variant="top" src="holder.js/100px160" />
                                            <Card.Body>
                                                <Card.Title>{a.name}</Card.Title>
                                                <Card.Text>
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Button onClick={() => window.location.href = '/ChooseJob/' + a._id} className="w-100" variant="outline-success">Success</Button>{' '}
                                            </Card.Footer>
                                        </Card>
                                    )
                                })
                            }
                        </CardColumns>

                    {/* <Button onClick={() => test()}> Show data</Button> */}
                    </CardGroup>
                </Row>
            </Container>
        </div>
    );
}

export default SelectTrip;
