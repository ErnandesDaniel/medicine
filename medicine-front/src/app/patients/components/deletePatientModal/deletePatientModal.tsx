import "./deletePatientModal.css";
import Spacer from "@/components/Universal/Spacer/Spacer";
import Text from "@/components/Universal/Text/Text";
import Button from "@/components/Universal/Button/Button";
import { Modal, Form } from 'antd';
const {Item} =Form;
import { Checkbox } from "antd";
import { Flex } from "antd";
import { ConfigProvider } from 'antd';
import {useMemo} from "react";

export default function DeletePatientModal({ModalFinish, isModalOpen, handleCancel, patients, deletingPatientId }){

    const { rules }=useMemo(()=>({
        rules: [{
            required: true,
            message: 'Подтвердите свое действие',
            type: 'string',
            validator: (_, value) => value!=true ?
                Promise.reject(new Error('Подтвердите свое действие')) :
                Promise.resolve()
        }]

    }),[]);


    const [form] = Form.useForm();
    const checked = Form.useWatch('checkbox', form);


    const patientFullName=patients.find(({key})=>key==deletingPatientId)?.patientFullName;

        return(

        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary:'#d9363e',
                        colorPrimaryActive:'red',
                        colorPrimaryHover:'#ff4d4f',
                        defaultActiveBorderColor:'#d9d9d9',
                        defaultActiveColor:'black',
                        defaultHoverBorderColor:'#d9d9d9',
                        defaultHoverColor:'black',

                    },
                    Checkbox: {
                        defaultHoverBorderColor:'#d9d9d9',
                        defaultHoverColor:'black',
                        ghostBg:"blue",
                        colorPrimary:'#d9363e',
                        colorPrimaryActive:'red',
                        colorPrimaryHover:'#ff4d4f'
                    },

                },
            }}
        >

        <Modal title="Удаление карты" open={isModalOpen} onCancel={handleCancel} footer={null} width={600} destroyOnClose={true}>
            <Spacer space={15} />
            <Form onFinish={ModalFinish} form={form}>
                <Flex className='modal_form' vertical>
                    <Spacer space={15} />
                    <Text>Вы уверены, что хотите удалить карту {patientFullName}?</Text>
                    <Spacer space={15} />
                    <Item layout='vertical' rules={rules} name='checkbox'  valuePropName="checked">
                        <Checkbox>Подтверждаю удаление карты</Checkbox>
                    </Item>
                    <Spacer space={65} />
                </Flex>
                <Spacer space={15} />
                <Flex className='modal_buttons' gap={10} justify='end'>
                    <Button  onClick={handleCancel} width={20} title='Отменить' type='default' className='button' block={false}/>
                    <Button  className='delete_button' width={20} title='Удалить' htmlType="submit" type='primary' block={false} disabled={!checked}/>
                </Flex>
            </Form>
        </Modal>
        </ConfigProvider>

    )
}

