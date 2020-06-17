# DDNS/DIAS - Dynamic Domain Name Server/Dynamic IP Address Server

## Send notification by email when IP address changes.

1. Clone DIAS file and rename to edit and use in formal environment. 

2. Options: use additional service require own real public ip address.

``` js
var options = {
   host: 'ip.cip.cc',
   port: '80',
   path: ''  
};
```

3. Seting execution logic：executing function every 2 seconds or 60 seconds.

``` js
setInterval(get_SYS_Time, 2 * 1000);
setInterval(get_Real_IP_Address, 60 * 1000);
```

4. Setting sender account and other informations.

``` js
  let transporter = nodemailer.createTransport({
    host: "smtp.xxx.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "xxxxx@xxxxx.com", // generated ethereal user
      pass: "xxxxx", // generated ethereal password
    },
  });
```

5. Seting recipient's imformation.

``` js
  let info = await transporter.sendMail({
    from: '"IP Change~ 👻" <xxxxx@xxxxx.com>', // sender address
    to: "xxxxx@xxxxx.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "http://" + i, // plain text body
    html: '<a href="http://' + i + '">服务器IP地址：' + 'http://' + i + '</a>', // html body
  });
```

6. Introduce mail module.

terminal
``` shell
npm i nodemailer
```

7. Running or yuo can use 'forever' to run.

terminal
``` shell
node filename
```