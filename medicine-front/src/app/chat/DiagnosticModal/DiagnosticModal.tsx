import './DiagnosticModal.css'
import Button from "@/components/Universal/Button/Button";
import { Modal, Flex } from 'antd';
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function DiagnosticModal({ModalFinish, isModalOpen, handleCancel }) {

    const yearDiagnostics =[
        {
            year:2024,
            diagnostics:[
                {
                    date:dayjs(),
                    projectionType:'продольная',
                    euTirads:3
                },
                {
                    date:dayjs(),
                    projectionType:'продольная',
                    euTirads:3
                },
            ]
        },

        {
            year:2023,
            diagnostics:[
                {
                    date:dayjs(),
                    projectionType:'продольная',
                    euTirads:3
                },
                {
                    date:dayjs(),
                    projectionType:'продольная',
                    euTirads:3
                },
            ]
        },
    ];

    return (

        <Modal
            className='diagnostics_modal'
            style={{marginRight:'0'}}
            title={<Flex gap={10}><CloseOutlined
                style={{cursor:'pointer'}}
                onClick={handleCancel}


            /><p>Диагностики пациента</p>

            <Button  onClick={handleCancel} width={20} title='Отмена' type='default' className='button' block={false}/>
            <Button  onClick={ModalFinish} width={20} title='Ок' htmlType="submit" type='primary' block={false}/>

        </Flex>}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            width={450}
            closable={false}
            destroyOnClose={true}>

            <div>
                {
                    yearDiagnostics.map(({year, diagnostics})=>{

                        return(

                            <div className='yearDiagnostics'>
                                <div className='year'>{year} год</div>
                                {diagnostics.map(({date,projectionType, euTirads})=>{
                                    return(
                                        <div className='diagnosticsBlock'>
                                            <div className='date'>Дата: <span className='border'>{dayjs(date).format('DD.MM.YYYY')}</span></div>
                                            <div className='projectionType'>Тип проекции: <span className='border'>{projectionType}</span></div>
                                            <div className='euTirads'>EU-TIRADS: <span className='border'>{euTirads}</span></div>
                                        </div>);
                                })}
                            </div>

                        )
                    })
                }
            </div>
        </Modal>
    )
}

