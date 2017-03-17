'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import UploadForm from './UploadForm';
import { Loader} from 'semantic-ui-react';


export default class UploadPage extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn : null
    }
  }
  componentDidMount(){
    let self = this;

    this.hostname = window.location.protocol + "//" + window.location.hostname + ":"+(window.location.port);
    return fetch(this.hostname+'/api/status',{
      credentials:"same-origin"
    })
    .then(function(response) {
      if(response.status==200){
        return response;
      } else {
        throw new Error(response.status)
      }
      
    }).then(function(body) {
      self.setState({
        loggedIn : true
      })
    }).catch(function(err){
      self.setState({
        loggedIn :false 
      })
    })
  }
  render() {
    // const id = this.props.params.id;
    // const athlete = athletes.filter((athlete) => athlete.id === id)[0];
    // if (!athlete) {
    //   return <NotFoundPage/>;
    // }
    // const headerStyle = { backgroundImage: `url(/img/${athlete.cover})` };
    let content;
    if(this.state.loggedIn == null){
        content = <Loader active inline='centered' />  
    } else if(this.state.loggedIn == true) {
          content = <UploadForm />
    } else {
      window.location.href=this.hostname
    }
    return (      
      <div className="" style={{textAlign:"center"}}>
        {content}       
      </div>
    );
  }
}
