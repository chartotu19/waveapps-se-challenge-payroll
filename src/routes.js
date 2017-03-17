'use strict';

import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import ReportPage from './components/ReportPage';
import UploadPage from './components/UploadPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage}/>
        <Route path="report" component={ReportPage}/>
        <Route path="upload" component={UploadPage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);

export default routes;
