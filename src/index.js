import 'rsuite/dist/rsuite.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const start = async () => {
  // Initialize shared scope
  await __webpack_init_sharing__('default');

  // Dynamically import all dependencies
  const React = await import('react');
  const ReactDOM = await import('react-dom/client');
  const App = (await import('./App')).default;

  const { default: i18next } = await import('i18next');
  const { I18nextProvider } = await import('react-i18next');

  const { MsalProvider } = await import('@azure/msal-react');
  const { PublicClientApplication } = await import('@azure/msal-browser');
  const { msalConfig } = await import('./components/msalConfig');

  // Initialize i18n
  await i18next.init({
    interpolation: { escapeValue: false },
  });

  // Initialize MSAL
  const msalInstance = new PublicClientApplication(msalConfig);

  // Render the React app
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </I18nextProvider>
    </React.StrictMode>
  );
};

start();
