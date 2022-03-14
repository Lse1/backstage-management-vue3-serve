let mysql = require("mysql");
const express = require("express");
var route = express.Router();

route.use(express.json())
const SECRET = 'asfasgfvea12jjwakkawfja'
const jwt = require('jsonwebtoken')
const { connectionCom, connectionMydb } = require("./ConnectDatabase")
let connection = connectionCom
let connections = connectionMydb

function tokenJudge (token) {
  try {
    jwt.verify(token, SECRET)
  } catch (err) {
    return '';
  }
  const id = jwt.verify(token, SECRET).id
  connections.query(`select username from user where id = ${id}`, (err, result) => {
    if (err) {
      console.error("查询出错:" + err.message);
      return;
    }
    // console.log(result)
    return result
  })
}

route.get("/commodity/data", async (req, res) => {
  const name = req.query.name
  const num = req.query.num
  console.log(num)
  console.log(name)
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`select count(*) as counts from ${name}`, (err, result) => {
      if (err) {
        console.error("查询出错:" + err.message);
        return;
      }
      let count = JSON.parse(JSON.stringify(result))
      connection.query(`select * from ${name} limit 10 offset ${num}`, (err, result) => {
        if (err) {
          console.error("查询出错:" + err.message);
          return;
        }
        let dataString = JSON.stringify(result);
        let data = JSON.parse(dataString)
        // console.log(count);
        // console.log(result);
        let datas = {
          count: count,
          data: data
        }
        // console.log(datas);
        res.send(datas);
      })
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/commodity/count", async (req, res) => {
  const name = req.query.name
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`select count(*) as counts from ${name}`, (err, result) => {
      if (err) {
        console.error("查询出错:" + err.message);
        return;
      }
      // console.log(result);
      res.send(result);
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/commodity/columnname", async (req, res) => {
  const name = req.query.name
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`select column_name as columnname from information_schema.COLUMNS where table_name='${name}'`, (err, result) => {
      if (err) {
        console.error("查询出错:" + err.message);
        return;
      }
      // console.log(result);
      res.send(result);
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/commodity/increase", async (req, res) => {
  const name = req.query.name
  const data = req.query.data
  const field = req.query.field
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    // console.log(name)
    // console.log(field)
    // console.log(data)
    connection.query(`insert into ${name}(${field}) value(${data})`, (err, result) => {
      if (err) {
        console.error("添加出错:" + err.message);
        res.send("添加出错:" + err.message);
        return;
      }
      // console.log(result);
      res.send("添加成功");
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/commodity/delete", async (req, res) => {
  const name = req.query.name
  const ids = req.query.id
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`delete from ${name} where id = ${ids}`, (err, result) => {
      if (err) {
        console.error("删除出错:" + err.message);
        res.send({
          code: 401,
          message: "删除出错:" + err.message
        });
        return;
      }
      // console.log(result);
      res.send({
        code: 200,
        message: "删除成功:"
      });
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/commodity/revise", async (req, res) => {
  const name = req.query.name
  const str = req.query.str
  const data = req.query.data
  const ids = req.query.id
  // console.log(str[0])
  // console.log(data.length)
  let strs = '';
  for (i = 0; i < data.length; i++) {
    if (i < data.length - 1) {
      strs += str[i] + " = '" + data[i] + "', "
    } else {
      strs += str[i] + " = '" + data[i] + "' "
    }
  }
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`update ${name} set ${strs} where id = ${ids}`, (err, result) => {
      if (err) {
        console.error("修改出错:" + err.message);
        res.send({
          code: 401,
          message: "修改出错:" + err.message
        });
        return;
      }
      // console.log(result);
      res.send({
        code: 200,
        message: "修改成功:"
      });
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/commodity/search", async (req, res) => {
  const name = req.query.name
  const data = req.query.data
  const field = req.query.field
  console.log(field)
  console.log(data)
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`select * from ${name} where 1 and CONCAT(${field}) like '%${data}%'`, (err, result) => {
      if (err) {
        console.error("搜索出错:" + err.message);
        res.send("搜索出错:" + err.message);
        return;
      }
      console.log(result);
      res.send(result);
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/create", async (req, res) => {
  console.log("收到请求体commodity", req.query);
  const name = req.query.name;
  let data = req.query.data;
  let datas = req.query.datas;
  console.log(data)
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`create table ${name} (id INT NOT NULL AUTO_INCREMENT,${data} PRIMARY KEY (id),FULLTEXT INDEX index3_info(${datas})) ENGINE=MYISAM CHARSET=utf8 COLLATE=utf8_general_ci`, (err, result) => {
      if (err) {
        console.error("创建出错:" + err.message);
        return;
      }
      console.log(result);
      res.send(result);
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/table_name", async (req, res) => {
  console.log("收到请求体1", req.body);
  const mb = 'tabledata'
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query("select table_name as thisname from information_schema.tables where table_schema='com'", (err, result) => {
      if (err) {
        console.error("查询出错:" + err.message);
        return;
      }
      console.log(result);
      res.send(result);
    })
  } else {
    res.status(401).send('token出错');
  }
})


module.exports = route;