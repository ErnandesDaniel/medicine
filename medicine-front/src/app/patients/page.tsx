"use client"
import "./patients.css";
import Page from "@/components/Page/Page";
import Button from "@/components/Universal/Button/Button";
import Text from "@/components/Universal/Text/Text";
import React, {useCallback, useEffect, useState} from "react";
import Table from 'antd/es/table';
import Flex from 'antd/es/flex';
import Input from 'antd/es/input';
import dayjs, { Dayjs } from "dayjs";
import type { TableProps } from 'antd';
import Spacer from "@/components/Universal/Spacer/Spacer";
import DeletePatientModal from "@/app/patients/components/deletePatientModal/deletePatientModal";
import AddPatientModal from "@/app/patients/components/addPatientModal/addPatientModal";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
const {Search}=Input;

export default function Patients() {

    interface PatientsDataType {
        key: React.Key;
        patientFullName:string ,
        birthdayDate:Dayjs,
        email:string,
        diagnosis:string,
        status:'active'| 'inactive',
    }

    const [dataSource, setDataSource]=useState<PatientsDataType[]>([]);

    useEffect(()=>{

        const mockPatients:PatientsDataType[]=[];

        for(let i=0; i<=200; i++){
            mockPatients.push({
                key: i+1,
                patientFullName:`Иванов Иван Иванович ${i}` ,
                birthdayDate:dayjs('12.02.1978'),
                email:'example@mail.ru',
                diagnosis:'Какой-то диагноз',
                status:'active',
            });
        }

        setDataSource(mockPatients);

    },[setDataSource]);

    const [deletingPatientId, setDeletingPatientId]=useState();

    const rowSelection: TableProps<PatientsDataType>['rowSelection'] = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: PatientsDataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    const [isModalOpenDeletePatient, setIsModalOpenDeletePatient]=useState<boolean>();

    const showModalDeletePatient = useCallback(() => {
        setIsModalOpenDeletePatient(true);
    },[setIsModalOpenDeletePatient]);

    const handleOkDeletePatient = useCallback(() => {
        setIsModalOpenDeletePatient(false);
    },[setIsModalOpenDeletePatient]);

    const handleCancelDeletePatient = useCallback(() => {
        setIsModalOpenDeletePatient(false);
    },[setIsModalOpenDeletePatient]);

    const ModalFinishDeletePatient = useCallback(() => {
        setDataSource(dataSource.filter(({key})=>key!=deletingPatientId));
        handleOkDeletePatient();
    },[handleOkDeletePatient, deletingPatientId]);

    const [isModalOpenAddPatient, setIsModalOpenAddPatient]=useState<boolean>();

    const showModalAddPatient = useCallback(() => {
        setIsModalOpenAddPatient(true);
    },[setIsModalOpenAddPatient]);

    const handleOkAddPatient = useCallback(() => {
        setIsModalOpenAddPatient(false);
    },[setIsModalOpenAddPatient]);

    const handleCancelAddPatient = useCallback(() => {
        setIsModalOpenAddPatient(false);
    },[setIsModalOpenAddPatient]);

    const ModalFinishAddPatient = useCallback((newPatient: PatientsDataType) => {
        newPatient= {...newPatient, key:dataSource.at(-1).key+1}
        setDataSource([...dataSource, newPatient]);
        handleOkAddPatient();
    },[handleOkAddPatient, dataSource, setDataSource]);

    const columns = [
        {
            title: 'ФИО',
            dataIndex: 'patientFullName',
            key: 'patientFullName',
        },
        {
            title: 'Дата рождения',
            dataIndex: 'birthdayDate',
            key: 'birthdayDate',
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },


        {
            title: 'Диагноз',
            dataIndex: 'diagnosis',
            key: 'diagnosis',
        },

        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render:(value)=>value=='active'? 'Активен':'Неактивен'
        },

        {
            dataIndex: 'open',
            key: 'open',
            render:()=><div className='table_button'>Открыть</div>
        },

        {
            dataIndex: 'delete',
            key: 'delete',
            render:(_, record)=><div className='table_button' onClick={()=>{
                setDeletingPatientId(record.key)
                showModalDeletePatient();
            }}>Удалить</div>
        },

    ];

    return(<Page className='patients_page'>
        <Flex gap={10}>
            <Text fontSize={20}>Цыгулева Ксения Владимировна</Text>
            <Text fontSize={20} className='medical_organization_title'>НИЯУ МИФИ</Text>
            <EditOutlined className='medical_organization_edit_icon' />
        </Flex>
        <Spacer space={20} />
        <Flex justify='space-between' aling='center'>
            <Text fontSize={20}>Пациенты</Text>
            <Flex gap={20}>
                <Search placeholder='Поиск по картам'/>
                <Button onClick={showModalAddPatient} title={<><PlusOutlined /> Добавить карту</>}/>
            </Flex>
        </Flex>
        <Spacer space={20} />
        <Table<PatientsDataType>
            rowSelection={{ type: 'checkbox', ...rowSelection }}
            dataSource={dataSource}
            columns={columns}
        />

        <DeletePatientModal
            ModalFinish={ModalFinishDeletePatient}
            isModalOpen={isModalOpenDeletePatient}
            handleCancel={handleCancelDeletePatient}
            deletingPatientId={deletingPatientId}
            patients={dataSource}
        />

        <AddPatientModal
            ModalFinish={ModalFinishAddPatient}
            isModalOpen={isModalOpenAddPatient}
            handleCancel={handleCancelAddPatient}
        />
        </Page>)
}