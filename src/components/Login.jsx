import React, { useContext, useEffect, useState } from 'react'; 
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { DataContext } from './DataContext';
import { useNavigate } from 'react-router-dom';
import { useMsal, useAccount, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./msalConfig";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setMessage } = useContext(DataContext);

  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = useAccount(accounts[0] || {});

 const [showViewer, setShowViewer] = useState(false);

  const handleOpenViewer = () => {
    setShowViewer(true);
  };


  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  const onSubmit = (data) => {
    console.log("Manual form submit:", data);
    navigate('/');
    setMessage(data);
  };

  useEffect(() => {
    if (isAuthenticated && account) {
      instance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      })
      .then((response) => {
        console.log("Access Token:", response.accessToken);
        // Store token if needed
      })
      .catch((error) => {
        console.warn("Silent token acquisition failed. Redirecting...", error);
        instance.acquireTokenRedirect(loginRequest);
      });
    }
  }, [isAuthenticated, account, instance]);

  return (
    <div className='wrapper'>
      <Container className='login'>
        <Row>
          <Col sm={3}>
                 {showViewer && (
        <iframe
          src="https://apiqa.mrhecloud.com/Iskan_API_UI_Viewer/viewer?guid=%7Breww-rg787-gssg7rgr-334jkf%7D&width=650&height=900"
          width="100%"
          height="900"
          style={{ border: 'none', marginTop: '20px' }}
          title="Document Viewer"
        ></iframe>
      )}
          </Col>
          <Col sm={6} className='login-wrpaer back-white'>
            <Row>
              <Col sm={6}>
                <img src='/images/dubai-logo.png' alt="Dubai Logo" className='img-fluid' />
              </Col>
              <Col sm={6}>
                <img src='/images/logo.png' alt="Logo" className='img-fluid tp-marg-25' />
              </Col>
            </Row>
            <br /> <br />
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <Form.Control size="lg" type="text" placeholder={t('email')}
                {...register('email', {
                  required: t('field_required'),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('invalid_mail'),
                  },
                })}
              />
              {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
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
              {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
              <br /><br />
              <Button type="submit" variant="primary" className='login-btn'>{t('login')}</Button>
              <br />
              <Button type="button" variant="primary" className='login-btn' onClick={handleLogin}>
                {t('login_with_microsoft')}
              </Button>
              <br /><br />
            {!showViewer && (
            <button onClick={handleOpenViewer}>
              Open Document Viewer
            </button>
            )}

            </form>
            <br /><br /><br />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
