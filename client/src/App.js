import "./App.css";
import { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import ReactTable from "react-table";
import {Grid, GridCell, GridColumn}from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css'
import {process} from '@progress/kendo-data-query';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import * as ReactDOM from "react-dom";
import { groupBy } from "@progress/kendo-data-query";


import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";
import "hammerjs";


function App() {
  const [router, setRouter] = useState("");
  const [firmware, setFirware] = useState("");
  const [type, setType] = useState("");
  const [Connectiontype, setCType] = useState("");
  const [Cpuload, setCpuload] = useState(0);
  const [Memory, setMemory] = useState(0);
  const [RAM, setRAM] = useState(0);

  
  const [ping, setPing] = useState(0); 
  const [routerName,setRouterName] = useState("");




  const [gridList, setGridList] = useState([]);
  const [DdataList, setDdataList] = useState([]);
  const [pingList, setPingList] = useState([]);

  const insertPing=()=>
  {
    Axios.post("http://localhost:3001//createD",{
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
  const getDdata = () => {
    Axios.get("http://localhost:3001/chart").then((response) => {
      setGridList(response.data);
    });
  };

  const deleteGridele = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setGridList(
        gridList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  const series = groupBy(DdataList, [
    {
      field: "routerName"
    },
  ]);
  
  const mapSeries = (item) => (
  <ChartSeriesItem
  data={item.items}
  name={item.value}
  field="ping"
  categoryField="interval"
  type="line"
  />
  );
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
        <label>Ping</label>
        <input
        type="number"
        onChange={(event)=>{
          setPing(event.target.value)
        }}
        />
        <button onClick={insertData}>Inject data</button>
         <button onClick={getGrid}>Show data</button>  
      </div>
      <div className="staticdata">
      <Grid data={gridList}
        //pageable={true}
        //sortable={true}
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
      <div className="dynamicData">
      <Chart> 
        <ChartSeries>
           <ChartSeriesItem type="scatterLine" data={DdataList}/>   
            {series.map(mapSeries)}         
        </ChartSeries>
      </Chart>        
      </div>
      <div className="PingInput">
        <label>router</label>
          <input
          type="router"
          onChange={(event)=>{
            setRouterName(event.target.value)
          }}/>
        <label>Ping</label>
          <input
          type="number"
          onChange={(event)=>{
          setPing(event.target.value)
          }}/>
          <button onClick={insertPing}>"inject data"</button>
          <button onClick={getDdata}>Show ping</button>  
      </div>
    </div>
  );
}

export default App;
