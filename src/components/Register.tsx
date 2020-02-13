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

export class Register extends React.Component {
    render() {
        return (
            <div className="container p-5 bg-dark">
                <h1 className="row text-white text-center">Register</h1>
                <span className="row text-white">username: <Input maxLength={10}/></span>
                <span className="row text-white">password: <Input type="password"/></span>
                <span className="row text-white">confirm password: <Input type="password"/></span>
                <span className="row text-white">
                    <Button type="primary">Register</Button>
                    <a href="./login" className="ml-4">have a account ?</a>
                </span>
            </div>
        )
    }
}