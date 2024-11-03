"use client"
import "./Footer.css";
import Spacer from "@/components/Spacer";
import Text from "@/components/Text";
export default function Footer() {
    return (
        <div className='footer'>
            <Text>MEDML MEPHI</Text>
            <Spacer space={20} />
            <Text>Адрес:</Text>
            <Text>Москва, Каширское ш. 31</Text>
            <Spacer space={10} />
            <Text>Контакты:</Text>
            <Text>1800 123 4567</Text>
            <Text>info@innovativemedhtech.com</Text>
        </div>)
}

