// //引入http内置模块
const http = require('http');

// //设置主机名和端口号
// const hostname = '127.0.0.1';
// const port = 3000;

// //调用http对象的createServer方法，创建一个服务器（接收请求，响应请求）
// const server = http.createServer((req, res) => { //箭头函数
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.write('Hello World!\n')
//   res.end();
// });

/**
 * 请求的URL：http://127.0.0.1:3000/index?name=zs&age=20
 */
 const url = require('url')

 let hostname = '127.0.0.1'
 let port = 3000
 
 const server = http.createServer((req, res) => {
     res.statusCode = 200
     res.setHeader('Content-Type', 'text/html;charset=utf-8')
 
     let myUrl = url.parse(`http://${hostname}:${port}${req.url}`,true)
 
     console.log(myUrl.href) // 输出：/index?name=zs&age=20
     console.log(myUrl.protocol) // 输出：http:
     console.log(myUrl.host) // 输出：127.0.0.1:3000
     console.log(myUrl.hostname) // 输出：127.0.0.1
     console.log(myUrl.port) // 输出：3000
     console.log(myUrl.search) // 输出：?name=zs&age=20
     console.log(myUrl.pathname) // 输出：/index
 
     res.end()
 })
 

//调用服务器的listen方法，监听主机的端口
server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);  //模板字符串
});