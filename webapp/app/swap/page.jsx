"use client"
import { Input } from "@nextui-org/react";
import { Card, Col, Row, Button, Text, 
    Modal, useModal, Avatar, Grid, Spacer } from "@nextui-org/react";
    import React from 'react';

    export default function DefiSwap(){
        return (
            <Grid.Container gap={1} justify='center'>
                 <Button rounded color="primary" css={{boxShadow:'0px 0px 4px #000000'}}>
                <Text
                  css={{ color: "white" }}
                  size={16}
                  weight="bold"
                  transform="uppercase"
                  id='status'
                >
                  CONNECT
                </Text>
              </Button> 
              <Row justify="center">
      <Grid sm={4} >
    <Card 
      variant="bordered"
    >
      <Card.Header>
        <Row >
          <Col>
            <img src="https://res.cloudinary.com/cryptojobslist/image/fetch/w_300,h_300,c_pad,b_white,q_auto,fl_lossy,f_auto/dpr_2.0/https://storage.googleapis.com/job-listing-logos/e5e9426c-a9d4-4da2-9e8f-52aa3fad8d55.png" width={"120%"} />
            </Col>
            <Col>
           
          </Col>
          <img src="https://blog.education-ecosystem.com/wp-content/uploads/2020/02/etherscan-logo-big.png" width={"50%"} />
        </Row>
      </Card.Header>
      <Text
        h3={true}
        color="white"
        css={{
          textShadow: "0px 0px 1px #000000",
          display: "flex",
          justifyContent: "center",
          textRendering:'geometricPrecision',
          fontFamily:'SF Pro Display',
          fontWeight:'$bold',
          m:'$0'
        }}
      >
        Token Swap
      </Text>
      </Card>
      </Grid>
      </Row>
      <Modal
        scroll
        closeButton
        blur
        aria-labelledby="connect_modal"
        onClose={closeHandler}
        open={alert}
      > Please Connect Wallet
        <Modal.Footer>
        <Button auto flat color="primary" onClick={connect}>
            Connect Wallet
          </Button>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Text h5='true'>FROM TOKEN</Text>
      <Row justify="center">
      <Grid sm={4}>
        <Col>
        <Card variant="bordered" css={{
          color: "white",
          opacity: "80%",
          fontFamily: "SF Pro Display",
          fontWeight: "300",
          fontSize: "30px",
          textShadow: "0px 0px 2px #000000",
          boxShadow: "0px 0px 4px #39FF14",
        }}>
          
        <Col>
            <Input type='text'
            size="$3xl"
            css={{fontFamily:'SF Pro Display',color:'white'}} 
            className="number"
            color="default"
            placeholder="amount"
            id="from_amount"
            onChange={(e) => setHold(e.target.value)}
            />
            </Col>
            </Card>
            </Col>
            <Col>
            <a onClick={fromHandler}>
            <Text size='$3xl' css={{fontFamily:'SF Pro Display',
            textShadow:'0px 0px 1px #000000',
            fontWeight:'400',
            color:'white',
            ml:'$10',
            }} ><img src={flogo} style={{width:'50px'}}/>{' '+fname}</Text>
            </a>
            <Row justify="center">
            <Text css={{marginLeft:'$3', fontSize:'$lg'}}>Balance:</Text><Text css={{marginLeft:'$3', fontSize:'$lg', fontFamily:'SF Pro Display', color:"$blue600"}} id='get_balance'></Text>
            </Row>
            </Col>
            </Grid>
            </Row>
            <Modal
        scroll
        closeButton
        blur
        aria-labelledby="token_modal"
        onClose={closeHandler}
        open={visible}
      >
        <Modal.Body>
        <Input type='text'
            size="$3xl"
            css={{fontFamily:'SF Pro Display',color:'white'}} 
            className="number"
            color="default"
            placeholder="Paste Token Address"
            />
            <Text size={16}>Or Choose Below:</Text>
          <div id="token_list"></div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            </Grid.Container>
            )
    }