import React,{Component} from "react";
import Axios from "axios";
import {Line} from 'react-chartjs-2';

export class Linecharts extends Component
{
        constructor(props)
        {
            super(props);
            this.state = { Data: {}};
        }
        componentDidMount()
        {
            Axios.get("http://localhost:3001/chart")
            .then(res => 
                {
                    console.log(res);
                    const ipl = res.data;
                    let routerName = [];
                    let ping = [];
                    ipl.forEach(record => {
                        routerName.push(record.routerName);
                        ping.push(record.ping);
                    });
                    this.setState({
                        Data: {
                            labels: routerName,
                            datasets: [
                                {
                                    label: 'Ping',
                                    data: ping,
                                    backgroundColor:[
                                        "#3cb371",
                                        "#0000FF",
                                        "#9966FF",
                                        "#4C4CFF",
                                        "#00FFFF",
                                        "#f990a7",
                                        "#aad2ed",
                                        "#FF00FF",
                                        "Blue",
                                        "Red"
                                    ]
                                }
                            ]
                        }
                    });
                })              
        }
        render() {  
                  return (  
                            <div>  
                                <Line data={this.state.Data}  
                                    options={{ maintainAspectRatio: false }} ></Line>  
                            </div>  
                        )  
                }        
}
export default Linecharts