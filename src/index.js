import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import DBRouter from './routes';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<DBRouter />, document.getElementById('root'));

serviceWorker.register();
