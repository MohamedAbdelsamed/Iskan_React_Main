import React , { useContext , useEffect } from "react";
import i18n from '../i18'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useTranslation} from "react-i18next";
import { Link } from 'react-router-dom';
import { useData } from './DataContext';
import { DataContext } from './DataContext';

const Header = () => {
  const { message } = useData(DataContext);
    const currentLanguage = i18n.language;
    const { t } = useTranslation();
    const changeLanguage = () => {
        const lang = localStorage.getItem("i18nextLng")
        console.log("fffffffffff",lang)
        if(lang == 'en' || lang == 'en-US'){
            i18n.changeLanguage('ar');
        }else {
            i18n.changeLanguage('en');
        }
    };

  return (
    <>
      <Navbar>
        <Container fluid>
          <Link to="/">
            <img src="/images/logo.png" width='250' className="img-fluid"/>
          </Link>
          {/* <Nav className="me-auto ms-auto">
            <Link className='nav-link' to="/" >{t('Home')}</Link>
            <Link className='nav-link' to="child1">{t('child1')}</Link>
            <Link className='nav-link' to="child2">{t('child2')}</Link>
            <Link className='nav-link' to="login">{t('login')}</Link>
          </Nav> */}
           <img src="/images/dubai-logo.png" width='175' className="img-fluid me-auto"/>
            <Link className="header" to="login">{t('logout')}</Link>
            <button className="btn btn-secondary" onClick={() => changeLanguage()}>{currentLanguage == 'en' ?  t('arabic'): t('english') }</button>
            <p className="header">{t('welcome')}<span className="welcome">{message.email}</span></p>
        
      
         
        </Container>
      </Navbar>
     
    </>
  );
};


export default Header;
