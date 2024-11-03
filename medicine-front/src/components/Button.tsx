"use client"

import {Input, Form, Button} from "antd";
import Password from "antd/es/input/Password";
const {Item} =Form;

export default function FormButton({
    title,
    type="primary",
    htmlType,
    size='large',
    className,
    block,
    width=100,
    onClick,
    }:{
    title:string;
    type?:any;
    htmlType?:any;
    className?:string;
    block?:boolean;
    width:number;
    onClick?:any;
    }) {
    return(<Button onClick={onClick} style={{width:`${width}%`}} type={type} size={size} htmlType={htmlType} className={className} block={block}>{title}</Button>)
}

