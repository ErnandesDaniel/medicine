"use client"
import Text from "@/components/Text";
import "./diagnosic_is_running.css";
import { Flex, Spin } from "antd";
import Spacer from "@/components/Spacer";
import {useRouter} from "next/navigation";
import { ConfigProvider } from 'antd';
import Button from "@/components/Button";

export default function DiagnosisIsRunning() {

    const router = useRouter();

    setTimeout(()=>{
        router.push('/diagnosis_is_complete')
    },10_000)

    return(
        <ConfigProvider
            theme={{
                components: {
                    Spin: {

                        dotSizeLG:80,

                    },
                },
            }}
        >
            <Flex className='page' vertical align='center'>
                <Spacer space={100} />
                <Spin size="large" dotSize={100} />
                <Spacer space={50} />
                <Text fontSize={50} className='title'>Проводится диагностика</Text>
                <Spacer space={30} />
                <Text className='description'>Анализ снимка занимает некоторое время</Text>
            </Flex>
        </ConfigProvider>
    )
}