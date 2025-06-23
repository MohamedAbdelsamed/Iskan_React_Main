// pages/Home.jsx
import React , { useContext } from "react";
import i18n from '../i18';
import {useTranslation} from "react-i18next";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';  
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DataContext } from './DataContext';
import AdminPanel from './Admin-panel';
import ReactTable from './tables';

// const MicroFrontend3 = React.lazy(() => import("microfrontend3/App"));


const Home = () => {
     const user = { name: "Mohamed", role: "admin" };
     const navigate = useNavigate();
     const { register, handleSubmit, formState: { errors } } = useForm();
     const { t, i18n } = useTranslation()
     const { setMessage } = useContext(DataContext);

    const onSubmit = (data) => {
        console.log(data);
        navigate('Processing_Requests');
        setMessage(data)
    };

    return(
        <>
        <AdminPanel />

         {/* <h3>{t('welcome-to-parent')}</h3> */}
         <br /><br />
        <ReactTable />


         {/* <p>{t('transfer-parent-child')}</p> */}
         <br /><br />
         {/* <div className="login">
            <form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Control size="lg" type="text" placeholder={t('name')}
                          {...register('name', { required: t('field_required'),
                           })}/>
                        {errors.name && (
                          <p style={{ color: 'red' }}>{errors.name.message}</p>
                        )}

                          <br /> 

                         <Form.Control type="text" placeholder={t('role')}
                            {...register('role', {
                              required: t('field_required'),
                            
                            })}
                          />

                          {errors.role && (
                            <p style={{ color: 'red' }}>{errors.role.message}</p>
                          )}
                        <br /> <br />
                        <Button type="submit" variant="primary" >{t('send')}</Button>
            </form>
         </div> */}
        </>
    )

}
export default Home;