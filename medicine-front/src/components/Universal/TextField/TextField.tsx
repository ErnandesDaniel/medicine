"use client"
import {Input, Form } from "antd";
import Password from "antd/es/input/Password";
import {memo, useMemo} from "react";
const {Item} =Form;

interface TextFieldProps {
    isError:boolean,
    isPassword?:boolean;
    errorText:string,
    isRequired:boolean,
    label:string,
    name:string
    rulesType:string;
}

const  TextField=({

    isError=false,
    errorText,
    isPassword=false,
    isRequired=true,
    label,
    rulesType='string',
    name,}:TextFieldProps)=>{

    const { rules }=useMemo(()=>({
            rules: [{
                required: isRequired,
                message: errorText,
                validator: (_, value) => isError || (isRequired && !value) ?
                    Promise.reject(new Error(errorText)) :
                    Promise.resolve()
            },

            ...rulesType=='email' ? [
                {
                    type: 'email',
                    message: 'Некорректный email адрес',
                }
            ]:[]
            ]

        }),[isError, errorText, isRequired])

    return(
        <Item
            label={label}
            name={name}
            rules={rules}
        >
            {isPassword? <Password size="large" />:<Input size="large" />}
        </Item>
    )
}

export default memo(TextField);

