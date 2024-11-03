"use client"
import Text from "@/components/Text";
import "./upload_photo.css";
import { Flex } from "antd";
import Spacer from "@/components/Spacer";
import {CloudUploadOutlined} from "@ant-design/icons";
import { Modal, Form } from 'antd';
import {useCallback, useMemo, useState} from "react";
import Button from "@/components/Button";
import { Select } from "antd";
const {Item} =Form;
import { Checkbox } from "antd";
import {useRouter} from "next/navigation";

export default function UploadPhoto() {

    const router = useRouter();

    const [isModalOpen, setIsModalOpen]=useState<boolean>();

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    },[setIsModalOpen]);

    const handleOk = useCallback(() => {
        setIsModalOpen(false);
        router.push('/diagnostic_is_running');
    },[setIsModalOpen, router]);

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
    },[setIsModalOpen]);

    const ModalFinish = useCallback(() => {
        handleOk();
    },[handleOk]);

    const patients=useMemo(()=>{

        return[

            {
                label:'Иванов Иван Иванович 1',
                value:1,
                birthDate:'12.09.1997'

            },
            {
                label:'Иванов Иван Иванович 2',
                value:2,
                birthDate:'15.01.1997'

            },
            {
                label:'Иванов Иван Иванович 3',
                value:3,
                birthDate:'22.04.1985'

            },
            {
                label:'Иванов Иван Иванович 4',
                value:4,
                birthDate:'18.05.2001'

            },

        ]


    },[])

    return(
<>
    <Flex className='page' vertical align='center'>
        <Spacer space={50} />
        <Text fontSize={50} className='title'>Загрузка снимка</Text>
        <Spacer space={30} />
        <Text className='description'>Для начала диагностики загрузите интересующий снимок ультразвуковой диагностики щитовидной железы</Text>
        <Spacer space={20} />
        <Flex className='download_area' vertical align='center'>
            <Spacer space={20} />
            <CloudUploadOutlined className='download_area_img' />
            <Spacer space={20} />
            <div className='download_area_title'>Нажмите или перетащите файл в эту область для загрузки</div>
            <Spacer space={10} />
            <div className='download_area_description'>Выберите файл в формате .png или .tiff</div>
        </Flex>
        <Spacer space={30} />
        <div className='download_button' onClick={showModal}>Начать диагностику</div>

        <Modal title="Заполните данные о пациенте" open={isModalOpen} onCancel={handleCancel} footer={null} width={600} destroyOnClose={true}>
            <Form onFinish={ModalFinish}>
                <div className='modal_form'>

                <Spacer space={10} />
                <Item label='Аппарат' layout='vertical' >
                <Select
                    defaultValue='Logic'
                    options={[
                        { value: 'Logic', label: 'Logic' },
                        { value: 'Logic 2', label: 'Logic 2' },
                        { value: 'Logic 3', label: 'Logic 3' },
                        { value: 'Logic 4', label: 'Logic 4' },
                    ]}
                />
                </Item>

                <Spacer space={15} />

                <Item label='Проеция' layout='vertical' >
                    <Select
                        defaultValue='Продольная'
                        options={[
                        { value: 'Продольная', label: 'Продольная' },
                        { value: 'Поперечная', label: 'Поперечная' },
                        ]}
                    />
                </Item>

                <Spacer space={15} />

                <Text>Для сохранения результатов диагностики необходимо добавить карту пациента</Text>

                <Spacer space={15} />

                <Checkbox checked={true}>Сохранить результаты диагностики</Checkbox>

                <Spacer space={15} />

                <Item label='Пациент' layout='vertical' >
                    <Select
                        defaultValue={patients[0].value}
                        options={patients}

                        optionRender={(option) => (
                            <>
                                <div>{option.data.label}</div>
                                <div>{option.data.birthDate}</div>
                            </>
                        )}
                    />
                </Item>





                </div>
                <Spacer space={15} />
                <Flex className='modal_buttons' gap={10} justify='end'>
                    <Button  onClick={handleCancel} width={20} title='Отменить' type='default' className='button' block={false}/>
                    <Button  width={20} title='Начать' htmlType="submit" type='primary' block={false}/>
                </Flex>
            </Form>
        </Modal>


    </Flex>
</>
    )
}