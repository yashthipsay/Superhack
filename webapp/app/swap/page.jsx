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
            </Grid.Container>
            )
    }