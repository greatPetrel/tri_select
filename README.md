# tri_select

插件名称：多种地址数据三级联select
by：y

用的是模拟select ,因此可以自定义样式
地址选择插件（针对了xml json js 三种不同种类的数据分别有三种不同的js）
/views/index.ejs

头部文件
<!doctype html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
    <title>地区选择插件</title>
    <link rel="stylesheet" type="text/css" href="css/tri_select.css">
    <script language="javascript" type="text/javascript"  src="js/jquery.min.js"></script>

</head>

1、xml数据和json
/public/data/location.xml
/public/data/location.json

需要请求xml数据（请求触发自button）,然后根据引用的不同js分别处理
/public/js/tri_select_xmldata.js
/public/js/tri_select_jsondata.js

2、js地址数据
/public/data/location.js
/public/js/tri_select_jsdata.js
需要同时引用两个js,数据在前

安装nodemon ,用nodemon app 同步调试。