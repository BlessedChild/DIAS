/*** 
 * author: chenzhaoxu
 * Date: 2020/06/15
 * Email: aboveactual@gmail.com
 * DIAS - Dynamic IP Address Server
***/

var http = require('http');
 
// 用于请求的选项，这里向ip.cip.cc发起请求，该地址上的服务会返回我自己的公网IP地址
var options = {
   host: 'ip.cip.cc',
   port: '80',
   path: ''  
};

// 保存获取到的公网IP地址
var real_IP_Address = "";

// 处理响应的回调函数
var callback = function(response){
   // 不断更新数据
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // 数据接收完成
      if(real_IP_Address == ""){
        real_IP_Address = body;
        console.log("当前服务的公网IP地址是：" + real_IP_Address);
        // 当服务启动时，发送通知邮件
        sendEmail(real_IP_Address).catch(console.error);
      }else{
          if(real_IP_Address != body){
            real_IP_Address = body;
            console.log("当前服务的公网IP地址发生了变化，当前服务的公网IP地址是：" + real_IP_Address);

            // 当公网IP地址更新时，发送通知邮件
            sendEmail(real_IP_Address).catch(console.error);
          }else{
            console.log("当前服务的公网IP地址是：" + real_IP_Address);
          }
      }
   });
};

// 向服务端发送请求
function get_Real_IP_Address(){
    var req = http.request(options, callback);
    req.end();
};

// 统计当前时间
function get_SYS_Time(){
    console.log("本服务进程号PID是：" + process.pid + ", 运行至今一共经历了 " + process.uptime() + " 秒");
}

// 定时执行控制台打印和公网IP地址的监测
setInterval(get_SYS_Time, 2 * 1000); // 等待时间单位：毫秒
setInterval(get_Real_IP_Address, 60 * 1000);

// 引入邮件发送模块
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(i) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "xxxxx@xxxxx.com", // generated ethereal user
      pass: "xxxxx", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"IP Change~ 👻" <xxxxx@xxxxx.com>', // sender address
    to: "xxxxx@xxxxx.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "http://" + i, // plain text body
    html: '<a href="http://' + i + '">服务器IP地址：' + 'http://' + i + '</a>', // html body
  });

  console.log("通知邮件已发送至<xxxxx@xxxxx.com> Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}