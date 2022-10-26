// @ts-check
import "./App.css";
import { useState, useEffect, useMemo, useRef } from "react";
import Axios from "axios";
import ReactTable from "react-table";
import {Grid, GridCell, GridColumn}from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import {LineChart,ResponsiveContainer,Legend,Tooltip,Line,XAxis,YAxis,CartesianGrid} from 'recharts';
import {process} from '@progress/kendo-data-query';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import * as ReactDOM from "react-dom";
//import { groupBy } from "@progress/kendo-data-query";
import Highcharts from 'highcharts';
import 'hammerjs';
//import {Line} from 'react-chartjs-2';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartTitle, ChartLegend } from "@progress/kendo-react-charts";
import { stderr, stdout } from "process";
const {exec} = require('child_process');




function App() {
  const [router, setRouter] = useState("");
  const [firmware, setFirware] = useState("");
  const [type, setType] = useState("");
  const [Connectiontype, setCType] = useState("");
  const [Cpuload, setCpuload] = useState(0);
  const [Memory, setMemory] = useState(0);
  const [RAM, setRAM] = useState(0);


  const [pingS, setPingS] = useState("");
  const [pingG, setpingG] = useState("");
  const refContainer = useRef(null);
  const [ping, setPing] = useState([]); 
  const [routerName,setRouterName] = useState("");
  const [jsonArray, setJsonArray] = useState("");

  const [gridList, setGridList] = useState([]);
  const [DdataList, setDdataList] = useState([]);
  const [pingList, setPingList] = useState([]);

useEffect(() => {
  const chart = Highcharts.chart(refContainer.current, {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Ping'
    },
    yAxis: {
      title: {
        text : 'ms'
      },
    },
    xAxis: {
      min: 0.4,
      categories: ['','','','','','','','',],
      title: {
        text: 'time'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:13px;font-weight:bold;">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    credits: {
      enabled: false
    },
    series: pingList
  });
  if (pingList !== null)
  {
    chart.hideLoading();
  }
  else{
    chart.showLoading();
  }
}, [pingList]);
useEffect(() => {
  setTimeout(() =>{
    setPingList();
  }, 300);
},[]);
  const pingIng=()=>{

  };
function removeParts(item,index,arr)
{
  arr[index]= item.substring(5, item.indexOf("ms"))
};
 const insertTest=(json) => 
 {
  Axios.post("http://localhost:3001/insertPing",{
      routerName: "10.195.0.1",
      ping: JSON.stringify(json)       
    })
 };
const insertPing=()=>
  {
    Axios.post("http://localhost:3001/insertPing",{
      routerName: routerName,
      ping: ping,
      
    }).then(()=>{
      setPingList([
        ...pingList,
        {
          routerName: routerName,
          ping: ping,          
        },
      ]);
    });
  };
  /* const series = groupBy(pingList, [
    {
      field: 'routerName',
    },
  ]); */
  /* const mapSeries =(item) => 
  (
    <ChartSeriesItem
    data ={item.routerName}
    name ={item.ping}
    field="ping"
    categoryField="tijd"
    type="line"
    />
  ); */
  const insertData = () => {
    Axios.post("http://localhost:3001/create", {
      router: router,
      firmware: firmware,
      type: type,
      Connectiontype: Connectiontype,
      Cpuload: Cpuload,
      Memory: Memory,
      RAM : RAM,
    }).then(() => {
      setGridList([
        ...gridList,
        {
          router: router,
          firmware: firmware,
          type: type,
          Connectiontype: Connectiontype,
          Cpuload: Cpuload,
          Memory: Memory,
          RAM : RAM,
        },
      ]);
    });
  };
  const getGrid = () => {
    Axios.get("http://localhost:3001/grid").then((response) => {
      setGridList(response.data);     
    });
  };
  const getPing = () => {
    Axios.get("http://localhost:3001/pings").then((response) => {
      setPingList(response.data);     
    });
  };
  const slicing = (stringin) => 
  {
      let sepatext = stringin.split(' ');
      sepatext.sort();
      sepatext.slice("time=","ms");
      let findstats = sepatext.indexOf("statistics");
      let slicedtext = sepatext.slice(findstats+1);
      for(let x= 0; x < 3 ; x++)
      {
        slicedtext.pop();
      }
      slicedtext.forEach(removeParts);
      Axios.post("http://localhost:3001/insertPing",{
        routerName: "10.195.0.1",
        ping: JSON.stringify(slicedtext)       
      });
  }
  const getPing2 = () => {
    let slicedtext = [];
    exec('ping -n 100 -l 64000 10.195.0.1', (err,stdout,stderr) =>{
      if(err){
        console.error(stderr);
        return;
      }
      let sepatext = stdout.split(' ');
      sepatext.sort();
      sepatext.slice("time=","ms");
      let findstats = sepatext.indexOf("statistics");
      let slicedtext = sepatext.slice(findstats+1);
      for(let x= 0; x < 3 ; x++)
      {
        slicedtext.pop();
      }
      slicedtext.forEach(removeParts);
    });
    Axios.post("http://localhost:3001/insertPing",{
      routerName: "10.195.0.1",
      ping: JSON.stringify(slicedtext)       
    });
  
  };
  const getPing3 = () => 
  {
    let text = [''];
    text = Axios.get("http://localhost:3001//pingingwing");
    if(text != null){
    console.log({text});
    let jtext = JSON.parse(text)
    jtext.sort();
    jtext.slice("time=","ms");
    let findstats = jtext.indexOf("statistics");
    let slicedtext = jtext.slice(findstats+1);
    for(let x= 0; x < 3 ; x++)
    {
      slicedtext.pop();
    }
    slicedtext.forEach(removeParts);
    Axios.post("http://localhost:3001/insertPing",{
      routerName: "10.195.0.1",
      ping: JSON.stringify(slicedtext)       
    });
    } else 
    {
      console.log("nothing to see")
    }
  };
const getms = (text) => 
{
  let texts = text.substring(text.indexOf("time=")+1, text.lastIndexOf("ms"));
  setpingG(texts)
  // setpingG(text.substring(text.index("time=")+1,
  // text.lastindexOf("ms")));
};
 const PingingW = () =>{
  Axios.get("http://localhost:3001?/pingingwing").then((response) => {
    setPingS(response.data);
  });
}; 
 const PingintojArray = () =>
{
  var thearray = [];
  for(var x=0;x<10;x++)
  {
    PingingW();
    getms(pingS);
    thearray.push(pingG);
  }
  setJsonArray(JSON.stringify(thearray));
    Axios.post('http://localhost:3001/Pingin');
} 
const deleteGridele = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setGridList(
        gridList.filter((val) => {
          return val.id !== id;
        })
      );
    });
 }; 
  return (
    <div className="App">
      <div className="information">
        <label>router:</label>
        <input
          type="text"
          onChange={(event) => {
            setRouter(event.target.value);
          }}
        />
        <label>firmware:</label>
        <input
          type="text"
          onChange={(event) => {
            setFirware(event.target.value);
          }}
        />
        <label>type:</label>
        <input
          type="text"
          onChange={(event) => {
            setType(event.target.value);
          }}
        />
        <label>Connectiontype:</label>
        <input
          type="text"
          onChange={(event) => {
            setCType(event.target.value);
          }}
        />
        <label>Cpuload:</label>
        <input
          type="number"
          onChange={(event) => {
            setCpuload(event.target.value);
          }}
        />
        <label>Memory</label>
        <input
          type="number"
          onChange={(event)=>{
            setMemory(event.target.value);
          }}
        />
        <label>RAM</label>
        <input
          type="number"
          onChange={(event)=>{
            setRAM(event.target.value);
          }}         
        />
        <label>routerName</label>
        <input type="text"
        onChange={(event)=>{setRouterName(event.target.value)}}/>
        <label>Ping</label>
        <input type="text"
        onChange={(event)=>{setPing(event.target.value)}}/>
        <button onClick={insertData}>Inject data</button>
        <button onClick={insertTest}>Inject the Ping</button>
        <button onClick={getGrid}>Show data</button>  
        <button onClick={PingintojArray}>sendping</button> 
      </div>
      <div className="staticdata">
      <Grid data={gridList}
        style={{height: "400px", width: "100%"}}
          >            
        <GridColumn field="router" title="router" width="140px" locked={true} />
        <GridColumn field="firmware" title="firmware" width="90px" locked={true}/>
        <GridColumn field="type" title="type" width="90px" locked={true}/>
        <GridColumn field="Connectiontype" title="Connectiontype" width="110px" locked={true}/>
        <GridColumn field="Cpuload" title="Cpuload" width="90px" locked={true}/>
        <GridColumn field="Memory"title="Memory" width="90px" locked={true}/>
        <GridColumn field="RAM"title="RAM" width="90px" locked={true}/>            
      </Grid>
        {gridList.map((val, key) => {
          return (
            <div className="staticdata">
                <button
                  onClick={() => {
                    deleteGridele(val.id);
                  }}
                >
                  Delete
                </button>
              </div>          
          );
        })}       
      </div>
      <button onClick={getPing3}>Show ping
        </button> 
        {/* <div className="json_data">
        <ChartTitle text="Ping"/>
        <ChartSeries>
          {pingList.map((item, idx) => (
            <ChartSeriesItem
            key={idx}
            type="line"
            tooltip={{
              visible: true,
            }}
            data={item.ping}
            name={item.routerName}
            />
          ))}
        </ChartSeries> 
        </div>  */}
     {/* <div className="ping">
        <Chart>
          <ChartSeries>
            {series.map(mapSeries)}
          </ChartSeries>
        </Chart>
      </div>  */}  
      <div className = "pingchart">
        <div ref={refContainer}/>
      </div>          
    </div>
  );
}
export default App;

