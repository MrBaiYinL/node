//引入http内置模块
const http = require('http');
const url = require('url')

/**
 * 请求的URL：http://127.0.0.1:3000/index?name=zs&age=20
 */
const hostname = '127.0.0.1'
const port = 3000
const data = [
  {name: 'a', age: 18, id: 1},
  {name: 'b', age: 19, id: 2},
  {name: 'c', age: 16, id: 3},
  {name: 'd', age: 15, id: 4},
  {name: 'e', age: 17, id: 5},
]

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    const type = req.method

    if (type.toLowerCase() === 'get') {
      // 将 URL 字符串转成 URL 对象
      // let myUrl = url.parse(req.url)
      // 获取参数
      // let params = new URLSearchParams(myUrl.query)
      console.log('getData')
      console.log(data)

    } else if (type.toLowerCase() === 'post') {

      let obj = '' // 接收传来的数据
      // 当有数据传来时被执行
      req.on('data', (chunk) => {
        obj = obj + chunk
      })
      
      req.on('end', () => {
        let myUrl = url.parse(req.url,true)
        console.log(myUrl.query)
        data.push(myUrl.query)
        console.log(data)
      })
      
    } else if (type.toLowerCase() === 'delete') {
      let myUrl = url.parse(req.url,true)
      console.log(myUrl.query)
      const newData = data.filter(item => {
        return item.id != myUrl.query.id
      })
      console.log('deleteData', myUrl.query.id)
      console.log(newData)
    } else if (type.toLowerCase() === 'put') {
      let myUrl = url.parse(req.url,true)
      console.log(myUrl.query)
      data.forEach(item => {
        if (myUrl.query.id == item.id) {
          item.age = myUrl.query.age || item.age
          item.name = myUrl.query.name || item.name
        }
      })
      console.log('data')
      console.log(data)
    }
    res.end()
})


//调用服务器的listen方法，监听主机的端口
server.listen(port, hostname, () => {
console.log(`服务器运行在 http://${hostname}:${port}/`);  //模板字符串
});