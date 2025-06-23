import React , { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { DataContext } from './DataContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setMessage } = useContext(DataContext);

  const onSubmit = (data) => {
    console.log(data);
     navigate('/');
    setMessage(data)
  };


  return (
    <div className='wrapper'>
        <Container className='login'>
            <Row>
                <Col sm={3} className='no-pad'>
                    {/* <img src="/images/login.jpg" alt="background" className='img-fluid w-101 h-115'/> */}
                </Col>
                <Col sm={6} className='login-wrpaer back-white'>
                <Row>
                  <Col sm={6}>
                  <img src='/images/dubai-logo.png' alt="background" className='img-fluid'/>
                  </Col>
                  <Col sm={6}>
                  <img src='/images/logo.png' alt="background" className='img-fluid tp-marg-25'/>
                  </Col>
                </Row>
                 <br /> <br />
                  <form className='form' onSubmit={handleSubmit(onSubmit)}>
                      <Form.Control size="lg" type="text" placeholder={t('email')}
                          {...register('email', { required: t('field_required'),
                             pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: t('invalid_mail'),
                              },
                           })}/>
                        {errors.email && (
                          <span style={{ color: 'red' }}>{errors.email.message}</span>
                        )}

                          <br /> 

                         <Form.Control type="password" placeholder={t('password')}
                            {...register('password', {
                              required: t('field_required'),
                              minLength: {
                                value: 10,
                                message: t('invalid_password'),
                              },
                            })}
                          />

                          {errors.password && (
                            <span style={{ color: 'red' }}>{errors.password.message}</span>
                          )}
                        <br /> <br />
                        <Button type="submit" variant="primary" className='login-btn'>{t('login')}</Button>
                  </form>
                 <br /> <br /> <br />
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default LoginPage;