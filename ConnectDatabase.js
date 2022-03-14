
let mysql = require("mysql");

let connectionCom = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "com"
});

connectionCom.connect((err) => {
  if (err) {
    console.error("连接失败" + err.stack);
    return;
  }
  console.log("连接成功");
});

let connectionMydb = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "mydb"
});

connectionMydb.connect((err) => {
  if (err) {
    console.error("连接失败" + err.stack);
    return;
  }
  console.log("连接成功");
});

let connectionShopdata = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "shopdata"
});

connectionShopdata.connect((err) => {
  if (err) {
    console.error("连接失败" + err.stack);
    return;
  }
  console.log("连接成功");
});

module.exports = {
  connectionCom,
  connectionMydb,
  connectionShopdata
};