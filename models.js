// import moment from "moment"
const moment = require('moment')
let mysql = require("mysql");
const express = require("express");
const { request } = require("express");
var route = express.Router();

route.use(express.json())
const SECRET = 'asfasgfvea12jjwakkawfja'
const jwt = require('jsonwebtoken')
const { connectionMydb } = require("./ConnectDatabase")
let connection = connectionMydb

function tokenJudge (token) {
  try {
    jwt.verify(token, SECRET)
  } catch (err) {
    // console.log('token出错');
    // res.send('token出错');
    return '';
  }
  const id = jwt.verify(token, SECRET).id
  connection.query(`select username from user where id = ${id}`, (err, result) => {
    if (err) {
      console.error("查询出错:" + err.message);
      return;
    }
    // console.log(result)
    return result
  })
  return id
}

function getpower (id) {
  return new Promise(function (resolve, reject) {
    connection.query(`select power from user where id = ${id}`, power = (err, result) => {
      if (err) {
        console.error("查询出错:" + err.message);
        return;
      }
      resolve(result[0].power);
      return result[0].power
    })
  })
}

function updateTime (id) {
  return new Promise(function (resolve, reject) {
    connection.query(`update user set lastTime = thisTime where id = ${id}`, power = (err, result) => {
      if (err) {
        console.error("查询出错:" + err.message);
        return;
      }
      const myDate = new Date()
      const DateTime = moment(myDate).format("YYYY-MM-DD HH:mm:ss")
      connection.query(`update user set thisTime = '${DateTime}' where id = ${id}`, power = (err, result) => {
        if (err) {
          console.error("查询出错:" + err.message);
          return;
        }
        // resolve(result[0].power);
        return;
      })
      return;
    })
  })
}

route.get("/user", async (req, res) => {
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`select count(*) as counts from user`, (err, result) => {
      if (err) {
        console.error("查询出错:" + err.message);
        return;
      }
      let count = JSON.parse(JSON.stringify(result))
      const num = req.query.num
      connection.query(`select id,username,identity,mailbox,time,lastTime from user limit 10 offset ${num}`, (err, result) => {
        if (err) {
          console.error("查询出错:" + err.message);
          return;
        }
        // moment(myDate).format("YYYY-MM-DD HH:mm:ss")
        for (p in result) {
          // console.log(result[p])
          result[p].time = moment(result[p].time).format("YYYY-MM-DD HH:mm:ss")
          result[p].lastTime = moment(result[p].lastTime).format("YYYY-MM-DD HH:mm:ss")
        }
        let dataString = JSON.stringify(result);
        dataString = dataString.replace(/username/g, '用户名').replace(/identity/g, '权限').replace(/mailbox/g, '邮箱').replace(/time/g, '添加时间').replace(/lastTime/g, '上次登录')
        let data = JSON.parse(dataString)
        let datas = {
          count: count,
          data: data
        }
        res.send(datas);
      })
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/tabledata", async (req, res) => {
  const mb = req.query.name
  if (mb === 'user') {
    res.send('user不允许这么访问');
    return;
  }
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`select count(*) as counts from ${mb}`, (err, result) => {
      if (err) {
        console.error("查询出错:" + err.message);
        return;
      }
      let count = JSON.parse(JSON.stringify(result))
      connection.query(`select * from ${mb}`, (err, result) => {
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
        res.send(datas);
      })
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/date", async (req, res) => {
  // console.log("收到请求体1", req.body);
  connection.query("select * from date", (err, result) => {
    if (err) {
      console.error("查询出错:" + err.message);
      return;
    }
    // console.log(result);
    res.send(result);
  })
})

route.get("/orderdata", async (req, res) => {
  // console.log("收到请求体1", req.body);
  connection.query("select * from orderdata", (err, result) => {
    if (err) {
      console.error("查询出错:" + err.message);
      return;
    }
    // console.log(result);
    res.send(result);
  })
})

route.get("/userdata", async (req, res) => {
  // console.log("收到请求体1", req.body);
  connection.query("select * from userdata", (err, result) => {
    if (err) {
      console.error("查询出错:" + err.message);
      return;
    }
    // console.log(result);
    res.send(result);
  })
})

route.get("/videodata", async (req, res) => {
  // console.log("收到请求体1", req.body);
  connection.query("select * from videodata", (err, result) => {
    if (err) {
      console.error("查询出错:" + err.message);
      return;
    }
    // console.log(result);
    res.send(result);
  })
})

route.post("/login", async (req, res) => {
  // console.log(req.body)
  const username = await req.body.ruleForm.login
  // let pass = req.body.ruleForm.pass
  // pass = require('bcryptjs').hashSync(pass, 10)
  // console.log(pass)
  connection.query(`select * from user where username = '${username}'`, (err, result) => {
    if (err) {
      console.error("出错:" + err.message);
      res.status(400).send("出错:" + err.message);
      return;
    } else if (result == '') {
      console.log("不存在用户")
      res.status(401).send("不存在用户")
      return;
    } else {
      const isPass = require('bcryptjs').compareSync(req.body.ruleForm.pass, result[0].password)
      if (!isPass) {
        return res.status(401).send("密码错误")
      }
      // console.log("结果："+result)
      // console.log(result[0].password)
      updateTime(result[0].id)
      const token = jwt.sign({
        id: result[0].id,
        power: result[0].power
      }, SECRET)
      res.send({
        user: result[0].username,
        identity: result[0].identity,
        lastTime: moment(result[0].lastTime).format("YYYY-MM-DD HH:mm:ss"),
        token: token,
        message: '登录成功'
      });
    }
  })
})

route.post("/register", async (req, res) => {
  const RegistrationCode = req.body.ruleForm.RegistrationCode
  if (RegistrationCode === 'cjgly' || RegistrationCode === '123456' || RegistrationCode === 'gly') {
    let identity = ''
    let power = 0
    if (RegistrationCode === 'cjgly') {
      identity = '超级管理员'
      power = 3
    }
    if (RegistrationCode === 'gly') {
      identity = '管理员'
      power = 2
    }
    if (RegistrationCode === '123456') {
      identity = '测试员'
      power = 1
    }
    const username = req.body.ruleForm.login
    const email = req.body.ruleForm.RegistrationCode
    let pass = req.body.ruleForm.pass
    pass = require('bcryptjs').hashSync(pass, 10)
    const myDate = new Date()
    const DateTime = moment(myDate).format("YYYY-MM-DD HH:mm:ss")
    connection.query(`insert into user(username,password,identity,mailbox,power,time) values ('${username}','${pass}','${identity}','${email}','${power}','${DateTime}')`, (err, result) => {
      if (err) {
        console.error("注册出错:" + err.message);
        res.send({
          code: 401,
          message: "注册出错:" + err.message
        });
        return;
      }
      // console.log(result);
      res.send({
        code: 200,
        message: "注册成功"
      });
    })
  } else {
    res.send({
      code: 401,
      message: "注册码不正确"
    });
  }
})

route.post("/adduser", async (req, res) => {
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    const identity = req.body.identity
    if (identity === '超级管理员' || identity === '管理员' || identity === '测试员') {
      const TokenPower = jwt.verify(token, SECRET).power
      let power = 0
      if (identity === '超级管理员') {
        power = 3
        if (power > TokenPower) {
          res.send({
            code: 401,
            message: '权限不足'
          });
          return;
        }
      }
      if (identity === '管理员') {
        power = 2
        if (power > TokenPower) {
          res.send({
            code: 401,
            message: '权限不足'
          });
          return;
        }
      }
      if (identity === '测试员') {
        power = 1
      }
      const username = req.body.name
      const email = req.body.email
      let pass = req.body.pass
      pass = require('bcryptjs').hashSync(pass, 10)
      const myDate = new Date()
      const DateTime = moment(myDate).format("YYYY-MM-DD HH:mm:ss")
      connection.query(`insert into user(username,password,identity,mailbox,power,time) values ('${username}','${pass}','${identity}','${email}','${power}','${DateTime}')`, (err, result) => {
        if (err) {
          console.error("添加出错:" + err.message);
          res.send({
            code: 401,
            message: "添加出错:" + err.message
          });
          return;
        }
        res.send({
          code: 200,
          message: "添加成功"
        });
      })
    } else {
      res.send({
        code: 401,
        message: "传入数据出错"
      });
    }
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/user/delete", async (req, res) => {
  const ids = req.query.id
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    const TokenPower = jwt.verify(token, SECRET).power
    let power = await getpower(ids)
    if (TokenPower > power) {
      connection.query(`delete from user where id = ${ids}`, (err, result) => {
        if (err) {
          console.error("删除出错:" + err.message);
          res.send({
            code: 401,
            message: "删除出错:" + err.message
          });
          return;
        }
        res.send({
          code: 200,
          message: "删除成功"
        });
      })
    } else {
      res.send({
        code: 401,
        message: "权限不足:"
      });
    }
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/user/search", async (req, res) => {
  const data = req.query.data
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`select id,username,identity,mailbox,time,lastTime from user where 1 and CONCAT(username,identity,mailbox) like '%${data}%'`, (err, result) => {
      if (err) {
        console.error("搜索出错:" + err.message);
        res.send("搜索出错:" + err.message);
        return;
      }
      let dataString = JSON.stringify(result);
      dataString = dataString.replace(/username/g, '用户名').replace(/identity/g, '权限').replace(/mailbox/g, '邮箱').replace(/time/g, '添加时间').replace(/lastTime/g, '上次登录')
      let data = JSON.parse(dataString)
      res.send(data);
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/user/updata", async (req, res) => {
  const name = req.query.name
  const str = req.query.str
  const ids = req.query.id
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    const TokenPower = jwt.verify(token, SECRET).power
    let power = await getpower(ids)
    if (TokenPower > power) {
      connection.query(`update user set username='${name}',mailbox='${str}' where id = ${ids}`, (err, result) => {
        if (err) {
          console.error("修改出错:" + err.message);
          res.send({
            code: 401,
            message: "修改出错:" + err.message
          });
          return;
        }
        res.send({
          code: 200,
          message: "修改成功:"
        });
      })
    } else {
      res.send({
        code: 401,
        message: "权限不足:"
      });
    }
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/user/updataPower", async (req, res) => {
  const identity = req.query.identity
  const ids = req.query.id
  console.log(ids)
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    if (identity === '超级管理员' || identity === '管理员' || identity === '测试员') {
      const TokenPower = jwt.verify(token, SECRET).power
      let power = await getpower(ids)
      if (TokenPower > power) {
        let powers = 0
        if (identity === '超级管理员') {
          powers = 3
          if (powers > TokenPower) {
            res.send({
              code: 401,
              message: '权限不足'
            });
            return;
          }
        } else if (identity === '管理员') {
          powers = 2
          if (powers > TokenPower) {
            res.send({
              code: 401,
              message: '权限不足'
            });
            return;
          }
        } else if (identity === '测试员') {
          powers = 1
        }
        connection.query(`update user set identity='${identity}',power='${powers}' where id = ${ids}`, (err, result) => {
          if (err) {
            console.error("修改权限出错:" + err.message);
            res.send({
              code: 401,
              message: "修改权限出错:" + err.message
            });
            return;
          }
          res.send({
            code: 200,
            message: "修改权限成功:"
          });
        })
      } else {
        res.send({
          code: 401,
          message: "权限不足:"
        });
      }
    } else {
      res.send({
        code: 401,
        message: "传入数据出错"
      });
    }
  } else {
    res.status(401).send('token出错');
  }
})

module.exports = route;