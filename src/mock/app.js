let express = require('express');
let app = express() //创建一个服务器
//中间件都是函数 中间件都是通过use调用
let cors = require('cors')
app.use(cors());
let bodyParse = require('body-parser')
app.use(bodyParse.json()) //解析数据的中间件 解析json数据
let jwt = require('jsonwebtoken') //jwt通过一定规则进行加密解密
//在登录页面登录成功之后拿到token，访问其他页面的时候发送一个请求来
    //验证用户是否登录 通过携带token的方式 如果token解密正确说明用
    //户已经登录了如果token解密错误说明用户没有登录/登录已经过期
//验证登录的接口 通过token来验证
// http://localhost:3000/validate
app.post('/validate',(req,res)=>{
    let token = req.headers.authorization;
    //我们要对前端发过来的token进行验证 防止前端篡改 确保是服务端给前端的合法token
    //jwt.verify 验证函数 第一个参数token，第二个参数 解密的规则
    //需要和加密一样 第三个cb(err,decode) err解密失败 decode解密对象{user:lilei}
    jwt.verify(token,'abcd',function(err,decode){
        //如果token不合法
        if(err){
            res.json({
                msg:'用户未登录'
            })
        }else{//token合法 需要延长过期时间(重新在给前端发一个token)
            res.json({
                token:jwt.sign({nickname:decode.nickname},'abcd',
                {expiresIn:'30s'}),
                nickname:decode.nickname
            })
        }
    })
    console.log(token);
    res.send("123")
});
//登录接口
app.post('/login',(req,res)=>{
    let {user} = req.body;
    //假设登陆成功 成功之后给前端返回一个加密的token
    //jwt.sign 加密函数 参数第一个对象 你要加密的对象
     //第二个参数加密的规则 第三个配置 expiresIn 过期时间
    res.json({
        token:jwt.sign({nickname:'张三'},
        'abcd',{
            expiresIn:'30s'
        }),
        nickname:'张三'
    });
    res.send("1234")
});
app.listen(3000,()=>{
    console.log('服务器端启动，端口是3000')
}) //监听服务器端口