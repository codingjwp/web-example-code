import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import stores from './store/stores';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={stores}>
    <App />
  </Provider>
);
