"use client"

import {Button} from "antd";

export default function FormButton({
    title,
    type="primary",
    htmlType,
    size,
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
    width?:number;
    onClick?:any;
    }) {
    return(<Button onClick={onClick} style={{width:`${width}%`, display:'block'}} type={type} size={size} htmlType={htmlType} className={className} block={block}>{title}</Button>)
}

