import React from 'react'
import {Button, Form, Input, Message} from 'semantic-ui-react'

export default class UploadForm extends React.Component {
    
    constructor () {
        super();
        this.state = {
            data_uri: null,
            filename: "timesheet",
            filetype: null,
            lastUploadStatus: null,
            lastUploadMessage:'Currently only supports .csv'
        }
    }
    
    render () {
        return (
            <div>
                {/*<Message*/}
                    {/*success*/}
                    {/*header='Time sheets upload'*/}
                    {/*content="Currently only supports .csv"*/}
                {/*/>*/}
                <Form ref="upload" onSubmit={this.uploadFile.bind(this)}>
                    <Form.Input label='Time sheets' type='file' name="timesheet"/>
                    <Message
                        failure
                        visible={!this.state.lastUploadStatus }
                        header={this.state.lastUploadMessage}
                    />
                    <Button>Submit</Button>
                </Form>
            </div>
        );
    }
    //handleFile(e){
    //   const reader = new FileReader();
    //   const file = e.target.files[0];
    //
    //   reader.onload = (upload) => {
    //       this.setState({
    //           data_uri: upload.target.result,
    //           filetype: file.type
    //       });
    //   };
    //   reader.readAsDataURL(file);
    //}
    
    uploadFile ( e ) {
        e.preventDefault();
        let self = this;
        let form = new FormData(this.refs.upload._form);
        return fetch('/api/upload', {
            method: 'POST',
            body: form,
            credentials: "same-origin"
        })
            .then(response => {
                console.log(response);
                if(response.status == 200){
                    self.setState({
                        lastUploadStatus : true
                    });
                    return response.json();
                } else if(response.status == 400){
                    self.setState({
                        lastUploadStatus : false
                    });
                    return response.json();
                } else {
                    throw new Error("Error code:"+response.status)
                }
            })
            .then(function (response) {
                self.setState({
                    lastUploadMessage : response.message || ""
                });
            })
            .catch(error => {
                self.setState({
                    lastUploadStatus : false,
                    lastUploadMessage: error.message
                })
            });
    };
}