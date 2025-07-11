// components/Layout.jsx
import React from "react";
import Header from "./Header-page";
import Footer from "./Footer-page";
import { Outlet } from "react-router-dom";
import { DataProvider } from './DataContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {useTranslation} from "react-i18next";
import { Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation()

  return (
    <>
      <Header />
      <main style={{ paddingTop: '50px', minHeight: '88vh' }} className="container-fluid">
        <Row>
          <Col md={3}>
          
              <Sidebar>
                <Menu>
                  <MenuItem active={location.pathname === '/'} component={<Link to="/" />}>{t('customer_service')}</MenuItem>
                  <MenuItem active={location.pathname === '/Processing_Requests'} component={<Link to="/Processing_Requests" />}>{t('Processing_Requests')}</MenuItem> 
                  <MenuItem active={location.pathname === '/Engineering_Department'} component={<Link to="/Engineering_Department" />}>{t('Engineering_Department')}</MenuItem>
                  <MenuItem active={location.pathname === '/Finance_Department'} component={<Link to="/Finance_Department" />}>{t('Finance_Department')}</MenuItem>
                  <MenuItem active={location.pathname === '/Admin'} component={<Link to="/Admin" />}>{t('Admin')}</MenuItem>
                  <MenuItem active={location.pathname === '/permissions'} component={<Link to="/permissions" />}>{t('permissions')}</MenuItem>
                   <MenuItem active={location.pathname === '/super-admins'} component={<Link to="/super-admins" />}>{t('Admins.Admins')}</MenuItem>
                </Menu>
              </Sidebar>
          </Col>
          <Col md={9}>
          <Outlet /> {/* Renders the matched child route */}
          </Col>
        </Row>
        
      </main>
      <Footer />
    </>
  );
};

export default Layout;
