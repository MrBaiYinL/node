//引入http内置模块
const http = require('http');
const url = require('url')

/**
 * 请求的URL：http://127.0.0.1:3000
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
    let getUrl = url.parse(req.url,true)

    if (type.toLowerCase() === 'get') {
      // 将 URL 字符串转成 URL 对象 let getUrl = url.parse(req.url)
      // 获取参数 let params = new URLSearchParams(getUrl.query)
      console.log('getData')
      console.log(data)

    } else if (type.toLowerCase() === 'post') {

      let obj = '' // 接收传来的数据
      // 当有数据传来时被执行
      req.on('data', (chunk) => {
        obj = obj + chunk
      })
      
      req.on('end', () => {
        console.log(getUrl.query)
        data.push(getUrl.query)
        console.log(data)
      })
      
    } else if (type.toLowerCase() === 'delete') {

      console.log(getUrl.query)
      const newData = data.filter(item => {
        return item.id != getUrl.query.id
      })
      console.log('deleteData', getUrl.query.id)
      console.log(newData)

    } else if (type.toLowerCase() === 'put') {

      console.log(getUrl.query)
      data.forEach(item => {
        if (getUrl.query.id == item.id) {
          item.age = getUrl.query.age || item.age
          item.name = getUrl.query.name || item.name
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