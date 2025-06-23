import React from 'react';
import i18n from '../i18';
import {useTranslation} from "react-i18next";

const Footer = () => {
    const { t, i18n } = useTranslation()
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()}{t('MBRH-footer')}</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem',
    position: 'relative',
    bottom: 0,
    width: '100%',
  },
  text: {
    margin: 0,
  },
};


export default Footer;
