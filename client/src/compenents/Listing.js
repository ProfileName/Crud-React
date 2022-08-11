import React, { Component } from 'react';
import Axios from "axios"; 
 
class Listing extends Component {
 
    constructor(props) {
        super(props)   
        this.state = {
            records: []
        }
         
    }
 
    componentDidMount() {
        Axios.fetch('http://localhost:3001/grid')
            .then(response => response.json())
            .then(records => {
                this.setState({
                    records: records
                })
            })
            .catch(error => console.log(error))
    }
 
    renderListing() {
        let recordList = []
        this.state.records.map(record => {
            return recordList.push(`<li key={record.id}>{record.name}</li>`)
        })
 
        return recordList;
    }
 
    render() {
        return (
            `<ul>
                {this.renderListing()}
            </ul>`
        );
    }
}
 
export default Listing;