var ws = require("nodejs-websocket")
var prort = 8099;

var server = ws.createServer((conn)=>{
    console.log('创建一个连接');

    conn.sendText("收到一个连接")

    //客户端发送的消息
    conn.on("text",function(str){
        console.info('text',str);
    })

    conn.on("close",function(code,reason){
        console.info(code,'code',reason,'reason');
    })
    
    conn.on("error",function(err){
        console.info(err,'err');
    })
}).listen(prort);
