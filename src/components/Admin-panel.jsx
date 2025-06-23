import React from "react";
import { useTranslation } from "react-i18next";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AdminPanel = () => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className="title-color">{t('Admin_Panel')}</h3>
      <br /><br />
      <Row>
        <Col md={3}>
          <div className="admin-item">
            <h5>{t('No_of_records')}</h5>
            <p>568</p>
          </div>
        </Col>
        <Col md={3}>
         <div className="admin-item bg1">
            <h5>{t('Tasks_Completed_Today')}</h5>
            <p>897</p>
         </div>
         </Col>
        <Col md={3}>
          <div className="admin-item bg2">
            <h5>{t('Pending_tasks')}</h5>
            <p>328</p>
          </div>
        </Col>
        <Col md={3}>
          <div className="admin-item bg3">
            <h5 className="color1">{t('Delayed_Requests')}</h5>
            <p className="color1 ">25</p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdminPanel;
