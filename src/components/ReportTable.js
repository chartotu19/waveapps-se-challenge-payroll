'use strict';

import React from 'react';
import { Link } from 'react-router';
import {Table} from 'semantic-ui-react';
import moment from 'moment';

export default class ReportTable extends React.Component {
    /**
     *
     * @param data
     * @return {Array}
     */
    groupAmountsByPayCycle( data ){
        if( !Array.isArray(data) ){
            return [];
        }
        let employeeDB = [];
        let self = this;
        data.forEach(function ( d ) {
            let payPeriod = self.getPayPeriod(d.log_date);
            employeeDB[d.employee_id] = employeeDB[d.employee_id] || [];
            employeeDB[d.employee_id][payPeriod] = employeeDB[d.employee_id][payPeriod] || 0;
            employeeDB[d.employee_id][payPeriod] += d.amount;
        });
        return employeeDB;
    }
    
    /**
     *
     * @param date
     * @return {string}
     */
    getPayPeriod(date){
        date = moment(date,'DD/MM/YYYY');
        let end = moment(date).endOf('month');
        let start = moment(date).startOf('month');
        if(Math.abs(date.diff(end,'days')) > Math.abs(date.diff(start,'days')) ){
            return `${start.format('DD/MM/YYYY')} - 15/${date.format('MM/YYYY')}`;
        } else {
            return `16/${date.format('MM/YYYY')} - ${end.format('DD/MM/YYYY')}`;
        }
        
    }
    render() {
        let content = [];
        let formattedData = this.groupAmountsByPayCycle(this.props.data);
        debugger;
        if( Array.isArray(formattedData) ){
            formattedData.forEach(function (payCycles, employee_id) {
                Object.keys(payCycles).forEach(function ( payPeriod ) {
                    content.push(
                        <Table.Row>
                            <Table.Cell>{employee_id}</Table.Cell>
                            <Table.Cell>{payPeriod}</Table.Cell>
                            <Table.Cell>{payCycles[payPeriod]}</Table.Cell>
                        </Table.Row>
                    );
                });
        
            });
        }
        
        return (
                <Table celled selectable sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Employee Id</Table.HeaderCell>
                            <Table.HeaderCell>Pay Period</Table.HeaderCell>
                            <Table.HeaderCell>Amount Paid</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
        
                    <Table.Body>
                        {content}
                    </Table.Body>
                </Table>
        );
  }
}
