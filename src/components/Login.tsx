import React from "react";
import { Input, Button } from "antd";

/** css in js */
// import styled, { css } from "styled-components";

// const Button1 = styled.button`
//     color: red;
//     ${(props: {primary?: any}) => props.primary && css`
//         color: blue;
//         font-size: 20px;
//     `}
// `

export class Login extends React.Component {
    login() {
        
    }
    render() {
        return (
            <div className="container p-5 bg-dark">
                <h1 className="row text-white text-center">Login</h1>
                <span className="row text-white">account: <Input maxLength={10}/></span>
                <span className="row text-white">password: <Input type="password"/></span>
                <span className="row text-white">
                    <Button type="primary" onClick={() => this.login()}>Login</Button>
                    <a href="./register" className="ml-4">Register</a>
                </span>
            </div>
        )
    }
}