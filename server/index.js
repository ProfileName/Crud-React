const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "newuser",
  host: "localhost",
  password: "newpassword",
  database: "staticdata",
});

const dbD = mysql.createConnection({
  user: "newuser",
  host: "localhost",
  password: "newpassword",
  database: "dynamicdata",
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
    "INSERT INTO json_data(routerName, ping) VALUES (?,?)",
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

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
