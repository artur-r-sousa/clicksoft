import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import axios from "axios";
import { Container, Title, Posts, PostText, UserId, Item } from '../styles.js'

//what

export default class Home extends Component{
    constructor(props: {}){
        super(props);
        this.fetchFromApi();
        this.state = {
            postData: []
        };
    }

    fetchFromApi(){
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=> {
            this.setState({postData: response.data})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render() {
        
        const { postData } = this.state;

        return ( 
            <Container>
                <Title> Empresa X </Title>
                <SafeAreaView>
                    <Posts> 
                        <FlatList
                            data={postData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => {
                                //change id for user Names
                                return (
                                    <TouchableWithoutFeedback onPress={()=>{}}>
                                        <Item>
                                            <UserId>{item.id}</UserId>
                                            <PostText>{item.body}</PostText>
                                            <TextInput
                                                placeholder="Enter comment"
                                            > </TextInput>
                                        </Item>
                                    </TouchableWithoutFeedback>
                                )
                            }}
                            
                        />
                    </Posts>
                </SafeAreaView>
            </Container>
        )
    }
}