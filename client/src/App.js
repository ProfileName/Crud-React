import "./App.css";
import { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import Table from "./table";

function App() {
  const [router, setRouter] = useState("");
  const [firmware, setFirware] = useState("");
  const [type, setType] = useState("");
  const [Connectiontype, setCType] = useState("");
  const [Cpuload, setCpuload] = useState(0);
  const [Memory, setMemory] = useState(0);
  const [RAM, setRAM] = useState(0);

 const columns = useMemo(()=> [
{
  Header: 'Routers',
  columns:[
    {
      Header: "router",
      accessor: "show.router"
    },
    {
      Header: "Type",
      accessor: "show.type"
    },
    {
      Header: "firmware",
      accessor: "show.firmware"
    },
    {
      Header: "Connectiontype",
      accessor: "Connectiontype"
    },
    {
      Header: "Cpuload",
      accessor: "Cpuload"
    },
    {
      Header: "Memory",
      accessor: "show.Memory"
    },
    {
      Header: "RAM",
      accessor: "show.RAM"
    }

  ]
  
}

 ],
  []
 );

  const [gridList, setGridList] = useState([]);

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

  // const updateEmployeeWage = (id) => {
  //   Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
  //     (response) => {
  //       setGridList(
  //         gridList.map((val) => {
  //           return val.id == id
  //             ? {
  //                 id: val.id,
  //                 name: val.name,
  //                 country: val.country,
  //                 age: val.age,
  //                 position: val.position,
  //                 wage: newWage,
  //               }
  //             : val;
  //         })
  //       );
  //     }
  //   );
  // };

  const deleteGridele = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setGridList(
        gridList.filter((val) => {
          return val.id != id;
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
          type="number"
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
        <button onClick={insertData}>Inject data</button>
      </div>
      <div className="employees">
        <button onClick={getGrid}>Show data</button>

        {gridList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>router: {val.router}</h3>
                <h3>firmware: {val.firmware}</h3>
                <h3>type: {val.type}</h3>
                <h3>Connectiontype: {val.Connectiontype}</h3>
                <h3>Cpuload: {val.Cpuload}</h3>
                <h3>Memory: {val.Memory}</h3>
                <h3>RAM: {val.RAM}</h3>
              </div>
              <div>
                {/* <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button> */}

                <button
                  onClick={() => {
                    deleteGridele(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
