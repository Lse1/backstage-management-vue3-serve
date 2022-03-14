let mysql = require("mysql");
const express = require("express");
const multer = require('multer')
let fs = require("fs");
let route = express.Router();

route.use(express.json())
const SECRET = 'asfasgfvea12jjwakkawfja'
const jwt = require('jsonwebtoken')

const { connectionShopdata, connectionMydb } = require("./ConnectDatabase")
let connection = connectionShopdata
let connections = connectionMydb

function tokenJudge (token) {
  try {
    jwt.verify(token, SECRET)
  } catch (err) {
    // console.log('token出错');
    // res.send('token出错');
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

function insertShopDatabase (datas, res, newPath) {
  console.log(datas)
  connection.query(`insert into shopdata(编号,商品图片,商品名称,价格,库存,销量) values ('${datas}')`, (err, result) => {
    if (err) {
      console.error("添加出错:" + err.message);
      fs.unlink(newPath, function (err) {
        if (err) {
          console.log('图片删除失败')
        }
        console.log('图片删除成功')
      })
      res.json({
        code: 401,
        message: '添加出错:' + err.message
      });
      return;
    }
    res.json(200, {
      code: 200,
      message: '添加成功'
    });
  })
}

//dest参数是图片保存在本地的位置
const upload = multer({ dest: 'images/' })
route.post('/shop/set/images', upload.single('file'), async (req, res, next) => {
  let file = req.file;
  let datas = req.body.data.split(",");
  if (file) {
    if (file.mimetype === 'image/png') {
      datas[1] = file.filename + '.png';
    } else if (file.mimetype === 'image/gif') {
      datas[1] = file.filename + '.gif';
    } else {
      datas[1] = file.filename + '.jpg';
    }
    datas = datas.join("','")
    console.log(file)
    console.log(datas)
    const oldPath = './images/' + file.filename;
    const newPath = './images/' + file.filename + '.png';
    fs.rename(oldPath, newPath, err => {//重命名，加后缀，不然图片会显示乱码，打不开
      if (err) console.log(err);
      insertShopDatabase(datas, res, newPath);
    });
  } else {
    res.json({
      code: 401,
      message: '添加出错: 没有传输图片'
    });
  }
});

route.get('/shop/images', async (req, res, next) => {
  //建议使用绝对路径查找图片 buffer
  // console.log(req.query.name)
  const num = 0
  connection.query(`select count(*) as counts from shopdata`, (err, result) => {
    if (err) {
      console.error("查询出错:" + err.message);
      return;
    }
    let count = JSON.parse(JSON.stringify(result))
    connection.query(`select * from shopdata limit 10 offset ${num}`, (err, result) => {
      if (err) {
        console.error("查询出错:" + err.message);
        return;
      }
      let dataString = JSON.stringify(result);
      let data = JSON.parse(dataString)
      // console.log(data);
      data.map((n) => {
        n.商品图片 = 'http://localhost:3003/' + n.商品图片
        return n.商品图片
      })
      let datas = {
        count: count,
        data: data
      }
      // console.log(datas);
      res.send(datas);
      // res.json(401, datas);
    })
  })
});

route.get("/shop/search", async (req, res) => {
  const data = req.query.data
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`select * from shopdata where 1 and CONCAT(编号,商品名称,价格,库存,销量) like '%${data}%'`, (err, result) => {
      if (err) {
        console.error("搜索出错:" + err.message);
        res.send("搜索出错:" + err.message);
        return;
      }
      let dataString = JSON.stringify(result);
      let data = JSON.parse(dataString)
      data.map((n) => {
        n.商品图片 = 'http://localhost:3002/' + n.商品图片
        return n.商品图片
      })
      res.send(data);
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.get("/shop/delete", async (req, res) => {
  const ids = req.query.id
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    connection.query(`select 商品图片 from shopdata where id = ${ids}`, (err, results) => {
      let path = './images/' + results[0].商品图片
      fs.unlink(path, function (err) {
        if (err) {
          console.log('图片删除失败')
          res.send({
            code: 401,
            message: "删除出错:图片删除失败"
          });
          return;
        }
        console.log('图片删除成功')
        connection.query(`delete from shopdata where id = ${ids}`, (err, result) => {
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
      })
    })
  } else {
    res.status(401).send('token出错');
  }
})

route.post('/shop/updata', upload.single('file'), async (req, res, next) => {
  const token = (req.headers.authorization || '').slice(7)
  let results = tokenJudge(token)
  if (results !== '') {
    let file = req.file;
    let datas = req.body.data.split(",");
    const id = req.body.id;
    if (file) {
      if (file.mimetype === 'image/png') {
        datas[1] = file.filename + '.png';
      } else if (file.mimetype === 'image/gif') {
        datas[1] = file.filename + '.gif';
      } else {
        datas[1] = file.filename + '.jpg';
      }
      const oldPath = './images/' + file.filename;
      const newPath = './images/' + file.filename + '.png';
      fs.rename(oldPath, newPath, err => {//重命名，加后缀，不然图片会显示乱码，打不开
        if (err) console.log(err);
        shopUpdata(id, datas, res);
      });
    } else {
      connection.query(`update shopdata set 编号='${datas[0]}',商品名称='${datas[2]}',价格='${datas[3]}',库存='${datas[4]}',销量='${datas[5]}' where id = ${id}`, (err, result) => {
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
    }
  } else {
    res.status(401).send('token出错');
  }
})

function shopUpdata (id, datas, res) {
  connection.query(`select 商品图片 from shopdata where id = ${id}`, (err, results) => {
    if (err) {
      console.error("修改出错:" + err.message);
      res.send({
        code: 401,
        message: "修改出错:" + err.message
      });
      return;
    }
    let path = './images/' + results[0].商品图片
    fs.unlink(path, function (err) {
      if (err) {
        console.log('图片删除失败')
        res.send({
          code: 401,
          message: "修改出错:" + err
        });
      }
      console.log('图片删除成功')
      connection.query(`update shopdata set 编号='${datas[0]}',商品图片='${datas[1]}',商品名称='${datas[2]}',价格='${datas[3]}',库存='${datas[4]}',销量='${datas[5]}' where id = ${id}`, (err, result) => {
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
    })
  })
}

module.exports = route;