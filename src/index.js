import React from 'react';
import ReactDOM from 'react-dom';
import Fetch from './Fetch';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Fetch />, document.getElementById('root'));

serviceWorker.unregister();
