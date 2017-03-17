'use strict';

import React from 'react';
import {Link} from 'react-router';
import UploadForm from './UploadForm';
import ReportTable from './ReportTable';
import {Loader} from 'semantic-ui-react';


export default class ReportPage extends React.Component {
    
    constructor () {
        super();
        this.state = {
            loggedIn: null,
            data: []
        }
    }
    
    componentDidMount () {
        let self = this;
        
        this.hostname = window.location.protocol + "//" + window.location.hostname + ":" + (window.location.port);
        return fetch(this.hostname + '/api/status', {
            credentials: "same-origin"
        })
            .then(function ( response ) {
                if (response.status == 200) {
                    return response;
                } else {
                    throw new Error(response.status)
                }
            }).then(function ( body ) {
                self.setState({
                    loggedIn: true
                });
                self.fetchData();
            }).catch(function ( err ) {
                self.setState({
                    loggedIn: false
                })
            })
    }
    
    fetchData () {
        let self = this;
        return fetch(this.hostname + '/api/report', {
            credentials: "same-origin"
        }).then(function ( response ) {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status)
            }
        }).then(function ( data ) {
                self.setState({
                    data: data
                })
            })
    }
    
    render () {
        let content;
        
        if (this.state.loggedIn == null) {
            content = <Loader active inline='centered'/>
            
        } else if (this.state.loggedIn == true) {
            content = <div>
                <ReportTable data={this.state.data}/>
                <hr/>
                <UploadForm/>
            </div>
        } else {
            window.location.href = this.hostname
        }
        return (
            <div className="athlete-full" style={{textAlign: "center"}}>
                {content}
            </div>
        );
    }
}
