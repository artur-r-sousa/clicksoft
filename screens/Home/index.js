import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from "axios";
import styles from '../styles.js';


export default class Home extends Component{
    constructor(props: {}){
        super(props);
        this.fetchFromApi();
        this.state = {};
        this.styles=styles;
    }

    fetchFromApi(){
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=> {
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render() {
        return (
            <View style={this.styles.container}>
                <View style={this.styles.header}>
                    <Text style={this.styles.titleText}> Empresa X </Text>
                </View>

                <View style={this.styles.posts}> 
                    <Text> placement</Text>

                </View>
            </View>
        )
    }
}