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
    disabled,
    }:{
    title:any;
    type?:any;
    htmlType?:any;
    className?:string;
    block?:boolean;
    width?:number;
    onClick?:any;
    disabled?,
    }) {
    return(<Button onClick={onClick} style={{width:`${width}%`, display:'block'}}
                   type={type}
                   size={size}
                   htmlType={htmlType}
                   className={className}
                   block={block}
                   disabled={disabled}

    >{title}</Button>)
}

