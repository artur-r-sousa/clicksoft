import React, { Component } from 'react';
import { FlatList, SafeAreaView, TextInput, TouchableWithoutFeedback } from 'react-native';
import axios from "axios";
import { Container, Title, Posts, PostText, UserName, Item, AppBar } from '../styles.js'

export default class Home extends Component{
    constructor(props: {}){
        super(props);
        this.fetchFromApi();
        this.fetchUserFromApi();
        this.state = {
            postData: [],
            userData: []
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

    fetchUserFromApi(){
        axios.get('https://jsonplaceholder.typicode.com/users').then((response)=> {
            this.setState({userData: response.data}) ;

        })
        .catch((error)=>{
            console.warn(error);
        })
    }

    render() {
        
        const { postData } = this.state;
        const { userData } = this.state;
        const { navigate } = this.props.navigation ;

        return ( 
            <Container>
                <AppBar>
                    <Title> Empresa X </Title>
                </AppBar>
                
                <SafeAreaView>
                    <FlatList
                        data={postData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => {
                            return (
                                <Posts>
                                    <TouchableWithoutFeedback onPress={() => {
                                        navigate('Details', {itemId: item.id})}
                                    }
                                        >
                                        <Item>
                                            <TouchableWithoutFeedback onPress={()=>{navigate('UserProfile', {userId: userData[item.userId]['id']})}}>
                                                <UserName>{userData[item.userId]['name']}</UserName>
                                            </TouchableWithoutFeedback>

                                            <PostText>{item.body}</PostText>

                                        </Item>
                                    </TouchableWithoutFeedback>
                                </Posts>
                                    
                            )
                        }}
                        
                    />
                </SafeAreaView>
            </Container>
        )
    }
}