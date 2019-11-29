//入口文件
//Node中无需指定package com.tedu.xuezi

//导入其他的包 mysql express
let mysql = require('mysql')

//使用第三包提供的函数和对象
//创建数据库连接池
let pool = mysql.createPool({
    host:       '127.0.0.1',    //主机地址
    port:       '3306',         //端口号
    user:       'root',         //mysql用户名
    password:   '',             //mysql密码，默认为空字符串
    database:   'list',           //数据库名称
    // host:       'w.rdc.sae.sina.com.cn',    //主机地址
    // port:       '3306',         //端口号
    // user:       '44134yjzwj',         //mysql用户名
    // password:   'j1lxzh4milx33014z3jkm3kw22j44y0zxiklzwi1',             //mysql密码，默认为空字符串
    // database:   'app_ricardo',           //数据库名称
    connectionLimit: 10         //连接池大小限制
})

//导入第三方模块：express, 创建基于Node.js的web服务器
let express = require('express')
let session = require('express-session') //导入session模块

//调用第三方模块提供的功能
let server = express()

//运行web服务器监听特定的端口
let port = 5050
server.listen(port, function(){
    console.log('服务器启动成功，正在监听端口：', port)
})


/****************************************************************/
/**********************后台API***********************************/
/***************************************************************/


//重定向
server.get('/',function(req,res,next){
    res.redirect(302, 'http://www.baidu.com'); 
})
server.get('/index',function(req,res,next){
    res.redirect(302, 'http://www.taobao.com'); 
})
server.get('/index.html',function(req,res,next){
    res.redirect(302, 'http://www.jd.com'); 
})

//session设置
server.use(session({
    name: 'session-id',
    secret: 'odraciR',
    resave: false,
    saveUninitialized: false
}))

//使用express提供的中间件：处理post请求中的主体数据，保存在req.body属性中
server.use(express.urlencoded({
    extended: false
}))
//自定义中间件：允许客户端的跨域访问
server.use(function(req,res,next){
    res.set('Access-Control-Allow-Origin', '*')
    next() //放行，让后续的请求处理方法继续处理
})

//API 1.2 商品详情
server.get('/product/detail', function(req,res){
    //读取客户端请求消息传来的请求数据 lid
    let lid = req.query.lid
    if(!lid){
        //处理客户端未提交lid的情况
        res.json({})    
        return
    }

    //向数据库查询指定lid的商品详情信息
    let output = {details:{},family:{}}
    let detailsLoaded = false
    let familyLoaded = false
    //查询1：根据lid查询到对应的fid
    let sql = 'SELECT fid,name FROM xz_laptop_family WHERE fid=(SELECT family_id from xz_laptop WHERE lid=?)'
    pool.query(sql,[lid],function(err,result){
        if(err)throw err
        if(result.length>0)     //根据lid查询到了对应的fid
        {
            output.family = result[0] 
            //根据fid查询同属于一个fid下的lid和spec
            let sql = 'SELECT lid,spec FROM xz_laptop WHERE family_id=?'
            pool.query(sql,[output.family.fid],function(err,result){
                if(err)throw err
                if(result.length>0)
                {
                    output.family.laptopList = result
                }
                //向客户端输出响应消息--只有笔记本信息已经获得到才输出
                familyLoaded = true
                if(detailsLoaded)
                {
                    res.json(output)
                }
            })
        }
        else
        {
            familyLoaded = true
            if(detailsLoaded)
            {
                res.json(output)
            }
        }
        
    })
    //查询2：根据lid查询商品详情信息
    let sql2 = 'SELECT * FROM xz_laptop WHERE lid=?'
    pool.query(sql2,[lid],function(err,result){
        if(err)throw err
        if(result.length>0)
        {
            output.details = result[0]
            //查询图片
            let sql2 = 'SELECT * FROM xz_laptop_pic WHERE laptop_id=?'
            pool.query(sql2,[lid],function(err,result){
                if(err)throw err
                if(result.length>0)
                {
                    output.details.picList = result
                }
                //向客户端输出响应消息--只有笔记本型号信息已经获得到才输出
                detailsLoaded = true
                if(familyLoaded)
                {
                    res.json(output)
                }
            })
        }
        else
        {
            detailsLoaded = true
            if(familyLoaded)
            {
                res.json(output)
            }
        }
    })
})

//API 2.1 用户注册
server.post('/user/register',function(req,res){
    let output = { "code":200, "msg":"注册成功~" }
    //读取客户端提交的数据
    let obj = req.body
    let upwd = obj.upwd
    let rpwd = obj.rpwd
    let email = obj.email
    //服务器端验证，客户端验证可以被跳过，起一个锦上添花的作用
    if(!upwd)
    {
        output.code = 401
        output.msg = "请输入密码~"
        res.json(output)
        return
    }
    if(!email)
    {
        output.code = 402
        output.msg = "请输入邮箱地址~"
        res.json(output)
        return
    }
    if(!rpwd)
    {
        output.code = 403
        output.msg = "请再次输入密码~"
        res.json(output)
        return
    }
    if(rpwd != upwd)
    {
        output.code = 404
        output.msg = "两次输入的密码不一致~"
        res.json(output)
        return
    }
    //先进行数据库查询，是否email已经存在
    let sql = 'SELECT email FROM list_user WHERE email=?'
    pool.query(sql,[email],function(err,result){
        if(err)throw err
        if(result.length>0)
        {
            if(result[0].email == email)
            {
                output.code = 500
                output.msg = "注册失败,该邮箱地址已经注册过~"
                res.json(output)
                return
            }
        }
        //执行数据库插入操作
        let sql2 = 'INSERT INTO list_user(email, upwd) VALUES(?,?)'
        pool.query(sql2,[email,upwd],function(err,result){
            if(err)throw err
            //向客户端输出响应消息
            output.email = obj.email
            output.uid = result.insertId
            res.json(output)
        })
    })
    
})

//API 2.2 用户登录
server.post('/user/login',function(req,res){
    let s = req.session
    let output = { "code":200, "msg":"登录成功~" }
    //读取客户端提交的数据
    let obj = req.body
    let email = obj.email
    let upwd = obj.upwd
    //服务端验证
    if(!email)
    {
        output.code = 401
        output.msg = "请输入邮箱~"
        res.json(output)
        return
    }
    if(!upwd)
    {
        output.code = 402
        output.msg = "请输入密码~"
        res.json(output)
        return
    }
    //执行数据库查询操作
    let sql = 'SELECT email,upwd FROM list_user WHERE email=?'
    pool.query(sql,[email],function(err,result){
        if(err)throw err
        //如果根据提交的email查询到了数据
        if(result.length>0)
        {
            //判断提交的upwd和查询结果的upwd是否相等
            if(result[0].upwd != obj.upwd)
            {
                //不相等就报403
                output.code = 403
                output.msg = '登录失败,密码错误~'
            }
        }
        else
        {
            //没有查询到任何数据就报404
            output.code = 404
            output.msg = '登录失败,该用户不存在~'
        }
        //向客户端输出响应消息
        if(output.code == 200)
        {
            req.session.loginUserInfo = email
            console.log("loginUserInfo : "+s.loginUserInfo)
            //设置cookie
            res.cookie('loginUserInfo',email, {maxAge:100000}); //有效期以毫秒为单位
        }
        res.send(s)
        // res.json(output)
        
    })
    
})

//APi 用户清单
server.get('/user/list',function(req,res){
    var sess = req.session.loginUserInfo//用这个属性获取session中保存的数据，而且返回的JSON数据
    console.log(sess)

    let output = {"length":0,list:{}}
    //读取客户端提交的数据
    let email = req.query.email
    if(!email){
        //处理客户端未提交email的情况
        res.json({})    //json方法可以把js数据转化成json格式字符串，并发送给客户端
        return
    }
    //向数据库中查询对应用户的清单
    let sql = 'SELECT pid,time,title,detail FROM list_pages WHERE email=? AND isdone=0 ORDER BY list_pages.time ASC'
    pool.query(sql,[email],function(err,result){
        if(err)throw err
        if(result.length > 0)
        {
            output.length = result.length
            output.list = result
            res.json(output)
        }
        else
        {
            //没有清单则返回空对象
            res.json({})
        }
    })
})

//API 添加
server.post('/user/add',function(req,res){
    let output = { "code":200, "msg":"添加成功~" }
    //读取客户端提交的数据
    let obj = req.body
    let title = obj.title
    let detail = obj.detail
    let time = obj.time
    let email = obj.email
    if(!title)
    {
        output.code = 401
        output.msg = '请输入标题'
        res.json(output)
        return
    }
    if(!detail)
    {
        output.code = 402
        output.msg = '请输入描述'
        res.json(output)
        return
    }
    if(!time)
    {
        output.code = 403
        output.msg = '请输入时间'
        res.json(output)
        return
    }
    //执行插入操作
    let sql = 'INSERT INTO list_pages(time,title,detail,email) VALUES(?,?,?,?)'
    pool.query(sql,[time,title,detail,email],function(err,result)
    {
        if(err)throw err
        res.json(output)
    })
})

//API 已完成
server.get('/user/finished',function(req,res){
    let output = {"code": 200,"msg": "已标记为完成~"}
    //读取客户端提交的数据
    let pid = req.query.pid
    //执行修改操作
    let sql = 'UPDATE list_pages SET isdone=1 WHERE pid=?'
    pool.query(sql,[pid],function(err,result){
        if(err)throw err
        res.json(output)
    })
})

//API 取消已完成
server.get('/user/unfinished',function(req,res){
    let output = {"code": 200,"msg": "已标记为未完成~"}
    //读取客户端提交的数据
    let pid = req.query.pid
    //执行修改操作
    let sql = 'UPDATE list_pages SET isdone=0 WHERE pid=?'
    pool.query(sql,[pid],function(err,result){
        if(err)throw err
        res.json(output)
    })
})

//API 所有已完成
server.get('/user/allfinished',function(req,res){
    let output = {"length":0,list:{}}
    //读取客户端提交的数据
    let email = req.query.email
    //执行查询操作
    let sql = 'SELECT pid,time,title,detail FROM list_pages WHERE email=? AND isdone=1 ORDER BY list_pages.time ASC'
    pool.query(sql,[email],function(err,result){
        if(err)throw err
        if(result.length > 0)
        {
            output.length = result.length
            output.list = result
            res.json(output)
        }
        else
        {
            //没有清单则返回空对象
            res.json({})
        }
    })
})