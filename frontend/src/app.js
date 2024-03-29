import React from 'react';
import { hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'src/store';
import Routes from 'src/routes';
import 'src/app.scss';
import './styles/bower_components/jquery/dist/jquery.min.js';
import './styles/bower_components/bootstrap/dist/js/bootstrap.min.js';
import './styles/dist/js/adminlte.min.js';
import axios from 'axios';
import { getToken, setAuthorizationToken } from 'src/actions/authentication/auth.js';
import { PersistGate } from 'redux-persist/lib/integration/react'

let { store, persistor } = configureStore()


const App = () => {
    // const store = createNewStore();
    let { store, persistor } = configureStore()
    return (
    <Provider store={ store }>
    	<PersistGate loading={null} persistor={persistor}>
	        <Routes
	            dispatch={ store.dispatch }
	            history={ hashHistory }
	        />
	      </PersistGate>
    </Provider>
    );
};

export default App;