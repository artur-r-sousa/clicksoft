import styled from "styled-components/native";

export const Container = styled.View`
    background-color: #d3d3d3;
`;

export const Title = styled.Text`
    font-size: 25px;
    font-weight: 500;
    color: #FFF;
`;

export const AppBar = styled.View`

    height: 50px;
    background-color: #009dff;
    align-content: center;
    justify-content: center;
    color: #FFF;
    
`;

export const Posts = styled.View`
    padding: 15px;
    color: #000000;
    background-color: #FFF;
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 5px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);

`;

export const PostText = styled.Text`
    padding: 5px;
    font-weight: 300;
    color: #555555;
    font-size: 15px;

`;

export const UserName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: black;
`;

export const Item = styled.View`
    color: #000000;
    padding: 5px
    border-radius: 6px;
    border: 1px solid #000000;
`;
