"use client"

import {Input, Form, Button} from "antd";
import Password from "antd/es/input/Password";
const {Item} =Form;

export default function CustomInput({
    title,
    type="primary",
    htmlType,
    }:{
    title:string;
    type:any;
    htmlType:any;
    }) {
    return(<Button style={{width:'100%'}} type={type} size="large" htmlType={htmlType}>{title}</Button>)
}

