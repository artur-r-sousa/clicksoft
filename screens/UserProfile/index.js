import React, { Component } from 'react';
import { Text, TextInput, Button, KeyboardAvoidingView} from 'react-native';
import axios from "axios";
import { Avatar, ProfileText, ProfileUsername, LatestPostLabel } from '../styles.js'

export default class UserProfile extends Component{
    constructor(props: {}){
        super(props);
        this.fetchUserFromApi(this.props.route.params.userId);
        this.state = {
            data: {},
            address: {},
            geo: {},
            company: {},
            titleInput: "",
            bodyInput: "",
            bodyPlaceholder: "how are you doing?",
            titlePlaceholder: "enter post title"

        };
    }



    fetchUserFromApi(userId){
        axios.get('https://jsonplaceholder.typicode.com/users/'+userId).then((response)=> {
            this.setState({
                data: response.data, 
                address: response.data.address, 
                geo: response.data.address.geo,
                company: response.data.company,
                
            })
            this.setState({
                isLoading: false
            })
            
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    postForApi(title, body, userId){
        axios({
            method: 'post',
            url:'https://jsonplaceholder.typicode.com/users/',
            data:{
                title: title,
                body: body,
                userId: userId,
            }
        });


    }

    render(){

        const { navigate } = this.props.navigation;
        const { data } = this.state;
        
        return(
            <KeyboardAvoidingView behavior='position'>
                <Avatar source={require('../assets/user-icon.png')}/>
                <ProfileUsername>{this.state.data.name}</ProfileUsername>
                <ProfileText>username: {this.state.data.username}</ProfileText>
                <ProfileText>email: {this.state.data.email}</ProfileText>
                <ProfileText>street: {this.state.address.street}</ProfileText>
                <ProfileText>lat: {this.state.geo.lat}</ProfileText>
                <ProfileText>phone: {this.state.data.phone}</ProfileText>
                <ProfileText>company name: {this.state.company.name}</ProfileText>
                <LatestPostLabel> Create new post by {this.state.data.name} </LatestPostLabel>
                <Text> title: </Text>
                <TextInput value={this.state.titleInput} onChangeText={(value)=>this.setState({titleInput: value})} placeholder={this.state.titlePlaceholder} ></TextInput>
                <Text> body: </Text>
                <TextInput value={this.state.bodyInput} onChangeText={(value)=>this.setState({bodyInput: value})} placeholder={this.state.bodyPlaceholder}></TextInput>
                
                <Button title="test api" onPress={()=>{
                    this.postForApi(this.state.titleInput, this.state.bodyInput, this.props.route.params.userId);
                    if(this.state.titleInput == "") {
                        this.setState({titlePlaceholder: "please enter a title"}) 
                    } else if(this.state.bodyInput == "") {
                        this.setState({bodyPlaceholder: "posts must have content"}) 
                    } else{
                        navigate("Home", {id: 101, userId: data.id, title: this.state.titleInput, body: this.state.bodyInput})}
                    }
                    }></Button>
            </KeyboardAvoidingView>
        )

    }
}
