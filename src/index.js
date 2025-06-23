import 'rsuite/dist/rsuite.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
const start = async () => {
  // Initialize shared scope

  await __webpack_init_sharing__('default');

  // Dynamically import dependencies
  const React = await import('react');
  const ReactDOM = await import('react-dom/client');
  const App = (await import('./App')).default;

  // Optional: i18n if needed here
  const i18next = (await import('i18next')).default;
  const { I18nextProvider } = await import('react-i18next');

  await i18next.init({
    interpolation: { escapeValue: false },
  });

  const root = ReactDOM.createRoot(document.getElementById('root'));

  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </React.StrictMode>
  );
};

start();



