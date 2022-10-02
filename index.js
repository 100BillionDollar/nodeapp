const express = require("express");
const path = require("path");
const app = express();
const port = process.env.port || 4000;
const os = require("os");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.send("welcome");
});
app.get("/info", (req, res) => {
  fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
    const ParsedData = JSON.parse(data);
    res.send(ParsedData);
  });
});
app.get("/user", (req, res) => {
  let data = {
    os: os.hostname(),
    platform: os.platform(),
    userInfo: os.userInfo(),
  };
  res.send(data);
});
let ParsedData = [];
app.post("/data", (req, res) => {
  // const data = fs.readFileSync(path.join(__dirname, 'data.json'))
  fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
    console.log(data);
    const ParsedData = JSON.parse(data);
    let Obj = req.body;
    ParsedData.push(Obj);
    fs.writeFile(
      path.join(__dirname, "data.json"),
      JSON.stringify(ParsedData),
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Success");
        }
      }
    );
    res.send("Success");
  });
});

app.listen(port, () => {
  console.log(`App  is listening on port ${port}`);
});
