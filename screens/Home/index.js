import React, { Component } from 'react';
import { FlatList, SafeAreaView, ActivityIndicator, TouchableWithoutFeedback, Text, View, ScrollView, SectionList } from 'react-native';
import axios from "axios";
import { Container, Title, Posts, PostText, UserName, Item, AppBar } from '../styles.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Home extends Component{
    constructor(props: {}){
        super(props);
         
        this.state = {
            isLoading: true,
            postData: [],
            userData: [],

        };
        
    } 

    componentDidMount(){   
        this.fetchFromApi(); 
        this.fetchUsersFromApi();
        this.props.navigation.addListener('focus', () => {

            this.props.route.params == undefined ? "" : this.addToState();
        })

    }


    fetchFromApi(){
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=> { 
                this.setState({postData: response.data}); 
                this.setState({isLoading: false})
            }
        )
        .catch((error)=>{
            console.log(error);
        })
    }

    fetchUsersFromApi(){
        axios.get('https://jsonplaceholder.typicode.com/users').then((response)=> { 
            this.setState({userData: response.data});    
        })
        .catch((error)=>{
            console.warn(error);
        })
    }
    fetchUserNameFromApi(userId){
        axios.get('https://jsonplaceholder.typicode.com/users/'+userId).then((response)=> { 
            console.log(response) 
        })
        .catch((error)=>{
            console.warn(error);
        })
    }
   
    deleteItemFromApi(itemId) {
        axios.delete('https://jsonplaceholder.typicode.com/posts/'+itemId).then(() => {
        this.deleteFromState(itemId)
        })
        .catch((error)=>{
            console.warn(error);
        })

    }

    deleteFromState(itemId) {
        let posts = []
        for(let item of this.state.postData){ 
            if(item.id != itemId){
                posts.push(item)
            }
        }
        this.setState({postData: posts})
    }

    addToState() {
        let posts = []
        for(let item of this.state.postData){            
            posts.push(item)

        }
        posts.push(this.props.route.params.newPostData)
        this.setState({postData: posts})
        
    } 

    componentWillUnmount(){

    }



    render() {
        
        const { postData, userData, isLoading } = this.state; 
        const { navigate } = this.props.navigation;  

        return ( 
            <Container>
                <AppBar>
                    <Title> Empresa X </Title>
                </AppBar>

                        <SafeAreaView>
                            {isLoading ? <ActivityIndicator /> : (
                                <FlatList
                                contentContainerStyle={{ paddingBottom: 150 }}
                                    data={postData}
                                    keyExtractor={(item) => item['id'].toString()}
                                    renderItem={({item}) => {
                                        return (
                                            <Posts>
                                                    
                                                <TouchableWithoutFeedback onPress={() => {
                                                    navigate('Details', {itemId: item.id})} 
                                                }
                                                    >
                                                    <Item> 
                                                        
                                                        <TouchableWithoutFeedback onPress ={()=>{navigate('UserProfile', {userId: userData[item.userId - 1]['id']})}}>
                                                            <UserName>{userData[item.userId - 1]['name']}</UserName> 
                                                        </TouchableWithoutFeedback>
                                                        <View>
                                                            <Text>{item.title}</Text> 
                                                        </View>
                                                        <PostText>{item.body}</PostText>

                                                    </Item>
                                                </TouchableWithoutFeedback> 
                                                    <Icon name="delete-outline" size={30} color="black" onPress={()=>{
                                                        this.deleteItemFromApi(item.id)
    
                                                    }}></Icon>

                                            </Posts>
                                                
                                        )
                                    }}
                                />
                            )}                   
                        </SafeAreaView>
            </Container>
        )
    }
}