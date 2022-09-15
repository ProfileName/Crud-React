//import {downLoadLinux,getPingLinux,sshInto,getPingMac,getPingWin} from './exec.js'
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { exec } = require('child_process');

app.use(cors());
app.use(express.json());

const executeCommand = (cmd, successCallback, errorCallback) => {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
     // console.log(`error: ${error.message}`);
      if (errorCallback) {
        errorCallback(error.message);
      }
      return;
    }
    if (stderr) {
      //console.log(`stderr: ${stderr}`);
      if (errorCallback) {
        errorCallback(stderr);
      }
      return;
    }
    //console.log(`stdout: ${stdout}`);
    if (successCallback) {
      successCallback(stdout);
    }
  });
};
const db = mysql.createConnection({
  user: "newuser",
  host: "localhost",
  password: "newpassword",
  database: "staticdata",
});
app.post("/create", (req, res) => {
  const router = req.body.router;
  const firmware = req.body.firmware;
  const type = req.body.type;
  const Connectiontype = req.body.Connectiontype;
  const Cpuload = req.body.Cpuload;
  const Memory = req.body.Memory;
  const RAM = req.body.RAM; 

  db.query(
    "INSERT INTO staticdata (router, firmware, type, Connectiontype, Cpuload, Memory, RAM) VALUES (?,?,?,?,?,?,?)",
    [router, firmware, type, Connectiontype, Cpuload, Memory, RAM],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.post("/createD",(req,res)=>{
  const routerName = req.body.routerName;
  const ping = req.body.ping;

  db.query(
    "INSERT INTO json_data(ping, routerName) VALUES (?,?)",
    [ping, routerName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.post("/Pingin",(req,res)=>{
  const ping = req.body.ping;
  db.query("INSERT into json_data(ping) VALUES(?,?)",
  [ping],
  (err,result) =>
  {
    if(err)
    {
      console.log(err);
    } else 
    {
      res.send("pinging")
    }
  }
  );
});
app.post("/insertPing",(req,res)=>{
  const ping = req.body.ping;
  const routerName = req.body.routerName;
  
  db.query("INSERT into json_data(routerName,ping) VALUES(?,?)",
     [routerName, ping],
     (err, result) => 
     {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
     }
  );
});
app.post("/createDyna", (req, res) => {
  const routerName = req.body.routerName;
  const ping = req.body.ping;

  db.query(
    "INSERT INTO dynamicdata (routerName, ping) VALUES (?,?)",
    [routerName, ping],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.get("/grid", (req, res) => {
  db.query("SELECT * FROM staticdata", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  },);
});
app.get("/chart",(req, res)=>{
  db.query("SELECT * FROM dynamicdata",(err,result)=>{
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  },);
});
app.get("/pings", (req,res) => {
  db.query("SELECT * FROM json_data", (err, result)=>
  {
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  },);
});
// app.put("/update", (req, res) => {
//   const id = req.body.id;
//   const wage = req.body.wage;
//   db.query(
//     "UPDATE staticdata SET wage = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM staticdata WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  },);
});
app.delete("/deleteD/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM dynamicdata WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/pingingLin",(req,res) => {
  executeCommand
  (
    'ping -c 100 -s 1472 10.195.0.1',
    branch=> success(branch),
    errormsg => error(errormsg)
  )
  if(errormsg != null)
  {
    console.log(errormsg);
  }else
  {
    res.send(branch);
  }
});
app.get("/pingingwing", (req, res) =>{
  executeCommand
  (
    'ping -n 100 -l 1472 10.195.0.1',
    branch => success(branch),
    errormsg => error(errormsg)
  )
  if(errormsg != null)
  {  
    console.log(errormsg);
  } else 
  {
    res.send(branch);    
  }
});
app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
