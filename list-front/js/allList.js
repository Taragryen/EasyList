$(window).on("load",function(){
  let key =sessionStorage.key('loginUserEmail')
  let loginUserEmail = sessionStorage.getItem(key)
  // let loginUserEmail = '2429747506@qq.com'
  // let loginUserEmail = '20172005046@m.scnu.edu.cn'
  if(loginUserEmail)
  {
    this.flash()
    this.AllFinished()
  }
  else
  {
    alert("请登录后再访问~")
    window.location.href = "login.html"
  } 
})

// $(window).resize(function(){
//   let oneTop = $("header").offset().top + 35
//   let oneLeft = $("header").offset().left + 135
//   $("#one").css({top:oneTop+'px',left:oneLeft+'px'})

//   let twoTop = $(".delete").offset().top -31
//   let twoLeft = $(".delete").offset().left + 68
//   $("#two").css({top:twoTop+'px',left:twoLeft+'px'})

//   let threeTop = $(".finished").offset().top -130
//   let threeLeft = $(".finished").offset().left - 84
//   $("#three").css({top:threeTop+'px',left:threeLeft+'px'})

//   let fourTop = $(".badge").offset().top -43
//   let fourLeft = $(".badge").offset().left +50
//   $("#four").css({top:fourTop+'px',left:fourLeft+'px'})
//   fourTop = fourTop - 60
//   fourLeft = fourLeft - 10
//   $("#five").css({top:fourTop+'px',left:fourLeft+'px'})
//   fourLeft = fourLeft + 255
//   $("#Six").css({top:fourTop+'px',left:fourLeft+'px'})
// })

$("#confirm-btn").click(function(){
  let key =sessionStorage.key('loginUserEmail')
  // let loginUserEmail = sessionStorage.getItem(key)
  // let loginUserEmail = '2429747506@qq.com'
  let loginUserEmail = '20172005046@m.scnu.edu.cn'
  var title = $("#title").val()
  var hour = $("#hour").val()
  var minute = $("#minute").val()
  var time = hour*100 + minute*1
  var detail = $("#detail").val()
  if(title.length == 0)
  {
    $.growl.warning({message: "请输入标题~" })
    $("#title").focus()
    return
  }
  if(hour.length == 0)
  {
    $.growl.warning({message: "请输入时间~" });
    $("#hour").focus()
    return
  }
  if(minute.length == 0)
  {
    $.growl.warning({message: "请输入时间~" });
    $("#minute").focus()
    return
  }
  if(detail.length == 0)
  {
    $.growl.warning({message: "请输入描述~" });
    $("#detail").focus()
    return
  }
  $.ajax({
    method: 'POST',
    // url: 'http://ricardo.applinzi.com/add',
    url: 'http://127.0.0.1:5050/user/add',
    data: `title=${title}&time=${time}&detail=${detail}&email=${loginUserEmail}`,
    success:function(data,msg,xhr)
    {
      console.log('异步请求添加API成功：')
      $.growl.notice({message: data.msg });
      $("#title").val("")
      $("#detail").val("")
      $("#hour").val("")
      $("#minute").val("")
      flash()
    },
    error:function(xhr,err)
    {
      console.log('异步请求登录API失败：')
      $.growl.error({err});
    }
  })
})


function setDataActive()
{
  const elBackgrounds = Array.from(document.querySelectorAll(".background"));
  const elArticles = Array.from(document.querySelectorAll(".article"));
  const bg = elBackgrounds[0]
  const art = elArticles[0]
  bg.setAttribute("data-active", true)
  art.setAttribute("data-active", true)

  const elBackgrounds2 = Array.from(document.querySelectorAll(".background2"));
  const elArticles2 = Array.from(document.querySelectorAll(".article2"));
  const bg2 = elBackgrounds2[0]
  const art2 = elArticles2[0]
  bg2.setAttribute("data-active", true)
  art2.setAttribute("data-active", true)

  const elBackgrounds3 = Array.from(document.querySelectorAll(".background3"));
  const elArticles3 = Array.from(document.querySelectorAll(".article3"));
  const bg3 = elBackgrounds3[0]
  const art3 = elArticles3[0]
  bg3.setAttribute("data-active", true)
  art3.setAttribute("data-active", true)
}

function flash()
{
  let key =sessionStorage.key('loginUserEmail')
  // let loginUserEmail = sessionStorage.getItem(key)
  // let loginUserEmail = '2429747506@qq.com'
  let loginUserEmail = '20172005046@m.scnu.edu.cn'
  $.ajax({
    method: 'get',
    url: 'http://127.0.0.1:5050/user/list',
    data: `email=${loginUserEmail}`,
    success:function(data,msg,xhr)
    {
      console.log('异步请求信息API成功：')
      if(data.length != 0)
      {
        let strm1 = ''
        let stra1 = ''
        let stre1 = ''
        let strm2 = ''
        let stra2 = ''
        let stre2 = ''
        let stra3 = `<div
                        class="background2"  
                        style="--primary: var(--orange); --secondary: var(--pink)">
                     </div>`
        let stre3 = `<div
                        class="background3"  
                        style="--primary: var(--deep-blue); --secondary: var(--deeper-blue)">
                     </div>`
        let strm3 = `<div
                        class="background"  
                        style="--primary: var(--green); --secondary: var(--cyan)">
                     </div>`
        let m = 0
        let a = 0
        let e = 0
        for(var i=0;i<data.length;i++)
        {
          if(data.list[i].time >= 600 && data.list[i].time < 1200)
          {
            m++
            strm1 += strm3
            strm2 += `<article class="article">
                        <header>
                          <h1>${data.list[i].time}</h1>
                          <h1>${data.list[i].title}</h1>
                        </header>
                        <p>${data.list[i].detail}</p>
                        <p style="display:none">${data.list[i].pid}</p>
                        <button type="button" class="finished" onclick="finished(${data.list[i].pid})">
                          <svg t="1574763739071" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2091" width="32" height="32"><path d="M12.8 512c0 275.2512 223.9488 499.2 499.2 499.2s499.2-223.9488 499.2-499.2a502.1184 502.1184 0 0 0-282.88-449.9968 38.4 38.4 0 1 0-33.28 69.2224A424.96 424.96 0 0 1 934.4 512c0 232.9088-189.4912 422.4-422.4 422.4S89.6 744.9088 89.6 512 279.0912 89.6 512 89.6a38.4 38.4 0 0 0 0-76.8C236.7488 12.8 12.8 236.7488 12.8 512z" fill="#ffffff" p-id="2092"></path><path d="M285.7472 466.7392a38.4 38.4 0 1 0-54.3232 54.3232l180.992 180.992a38.2976 38.2976 0 0 0 54.272 0l325.8368-325.7856a38.4 38.4 0 1 0-54.3232-54.3232l-298.7008 298.6496-153.7536-153.856z" fill="#ffffff" p-id="2093"></path></svg>
                        </button>
                        <button type="button" class="delete" onclick="deleteone(${data.list[i].pid})">
                          <svg t="1575900448704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1833" width="32" height="32"><path d="M728.32 62.0032a38.4 38.4 0 1 0-33.28 69.2224A424.96 424.96 0 0 1 934.4 512c0 232.9088-189.4912 422.4-422.4 422.4S89.6 744.9088 89.6 512 279.0912 89.6 512 89.6a38.4 38.4 0 0 0 0-76.8C236.7488 12.8 12.8 236.7488 12.8 512s223.9488 499.2 499.2 499.2 499.2-223.9488 499.2-499.2a502.1184 502.1184 0 0 0-282.88-449.9968z" fill="#ffffff" p-id="1834"></path><path d="M731.4432 331.008a38.4 38.4 0 0 0-65.5872-27.136L512 457.728 358.144 303.8208a38.4 38.4 0 0 0-54.3232 54.272L457.728 512l-153.856 153.856a38.2976 38.2976 0 0 0 27.136 65.536 38.0928 38.0928 0 0 0 27.136-11.264L512 566.3232l153.856 153.856a38.2976 38.2976 0 0 0 65.536-27.136 38.0928 38.0928 0 0 0-11.264-27.136L566.3232 512l153.856-153.856a38.0928 38.0928 0 0 0 11.264-27.136z" fill="#ffffff" p-id="1835"></path></svg>                        
                        </button>
                      </article>`
            
          }
          if(data.list[i].time >= 1200 && data.list[i].time < 1800)
          {
            a++
            stra1 += stra3
            stra2 += `<article class="article2">
                        <header>
                          <h1>${data.list[i].time}</h1>
                          <h1>${data.list[i].title}</h1>
                        </header>
                        <p>${data.list[i].detail}</p>
                        <p style="display:none">${data.list[i].pid}</p>
                        <button type="button" class="finished" onclick="finished(${data.list[i].pid})">
                          <svg t="1574763739071" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2091" width="32" height="32"><path d="M12.8 512c0 275.2512 223.9488 499.2 499.2 499.2s499.2-223.9488 499.2-499.2a502.1184 502.1184 0 0 0-282.88-449.9968 38.4 38.4 0 1 0-33.28 69.2224A424.96 424.96 0 0 1 934.4 512c0 232.9088-189.4912 422.4-422.4 422.4S89.6 744.9088 89.6 512 279.0912 89.6 512 89.6a38.4 38.4 0 0 0 0-76.8C236.7488 12.8 12.8 236.7488 12.8 512z" fill="#ffffff" p-id="2092"></path><path d="M285.7472 466.7392a38.4 38.4 0 1 0-54.3232 54.3232l180.992 180.992a38.2976 38.2976 0 0 0 54.272 0l325.8368-325.7856a38.4 38.4 0 1 0-54.3232-54.3232l-298.7008 298.6496-153.7536-153.856z" fill="#ffffff" p-id="2093"></path></svg>
                        </button>
                        <button type="button" class="delete" onclick="deleteone(${data.list[i].pid})">
                          <svg t="1575900448704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1833" width="32" height="32"><path d="M728.32 62.0032a38.4 38.4 0 1 0-33.28 69.2224A424.96 424.96 0 0 1 934.4 512c0 232.9088-189.4912 422.4-422.4 422.4S89.6 744.9088 89.6 512 279.0912 89.6 512 89.6a38.4 38.4 0 0 0 0-76.8C236.7488 12.8 12.8 236.7488 12.8 512s223.9488 499.2 499.2 499.2 499.2-223.9488 499.2-499.2a502.1184 502.1184 0 0 0-282.88-449.9968z" fill="#ffffff" p-id="1834"></path><path d="M731.4432 331.008a38.4 38.4 0 0 0-65.5872-27.136L512 457.728 358.144 303.8208a38.4 38.4 0 0 0-54.3232 54.272L457.728 512l-153.856 153.856a38.2976 38.2976 0 0 0 27.136 65.536 38.0928 38.0928 0 0 0 27.136-11.264L512 566.3232l153.856 153.856a38.2976 38.2976 0 0 0 65.536-27.136 38.0928 38.0928 0 0 0-11.264-27.136L566.3232 512l153.856-153.856a38.0928 38.0928 0 0 0 11.264-27.136z" fill="#ffffff" p-id="1835"></path></svg>                        
                        </button>
                      </article>`
          }
          if(data.list[i].time >= 1800 && data.list[i].time < 2400)
          {
            e++
            stre1 +=stre3
            stre2 += `<article class="article3">
                        <header>
                          <h1>${data.list[i].time}</h1>
                          <h1>${data.list[i].title}</h1>
                        </header>
                        <p>${data.list[i].detail}</p>
                        <p style="display:none">${data.list[i].pid}</p>
                        <button type="button" class="finished" onclick="finished(${data.list[i].pid})">
                          <svg t="1574763739071" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2091" width="32" height="32"><path d="M12.8 512c0 275.2512 223.9488 499.2 499.2 499.2s499.2-223.9488 499.2-499.2a502.1184 502.1184 0 0 0-282.88-449.9968 38.4 38.4 0 1 0-33.28 69.2224A424.96 424.96 0 0 1 934.4 512c0 232.9088-189.4912 422.4-422.4 422.4S89.6 744.9088 89.6 512 279.0912 89.6 512 89.6a38.4 38.4 0 0 0 0-76.8C236.7488 12.8 12.8 236.7488 12.8 512z" fill="#ffffff" p-id="2092"></path><path d="M285.7472 466.7392a38.4 38.4 0 1 0-54.3232 54.3232l180.992 180.992a38.2976 38.2976 0 0 0 54.272 0l325.8368-325.7856a38.4 38.4 0 1 0-54.3232-54.3232l-298.7008 298.6496-153.7536-153.856z" fill="#ffffff" p-id="2093"></path></svg>                        
                        </button>
                        <button type="button" class="delete" onclick="deleteone(${data.list[i].pid})">
                          <svg t="1575900448704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1833" width="32" height="32"><path d="M728.32 62.0032a38.4 38.4 0 1 0-33.28 69.2224A424.96 424.96 0 0 1 934.4 512c0 232.9088-189.4912 422.4-422.4 422.4S89.6 744.9088 89.6 512 279.0912 89.6 512 89.6a38.4 38.4 0 0 0 0-76.8C236.7488 12.8 12.8 236.7488 12.8 512s223.9488 499.2 499.2 499.2 499.2-223.9488 499.2-499.2a502.1184 502.1184 0 0 0-282.88-449.9968z" fill="#ffffff" p-id="1834"></path><path d="M731.4432 331.008a38.4 38.4 0 0 0-65.5872-27.136L512 457.728 358.144 303.8208a38.4 38.4 0 0 0-54.3232 54.272L457.728 512l-153.856 153.856a38.2976 38.2976 0 0 0 27.136 65.536 38.0928 38.0928 0 0 0 27.136-11.264L512 566.3232l153.856 153.856a38.2976 38.2976 0 0 0 65.536-27.136 38.0928 38.0928 0 0 0-11.264-27.136L566.3232 512l153.856-153.856a38.0928 38.0928 0 0 0 11.264-27.136z" fill="#ffffff" p-id="1835"></path></svg>                        
                        </button>
                      </article>`
          }
        }
        if(m>0)
        {
          $("#app-section1").html(strm1)
          $("#app-section2").html(strm2)
        }
        else
        {
          let strm4 = `<article class="article">
                        <header>
                          <h1>上午</h1>
                          <h1>清单</h1>
                        </header>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dignissimos corporis dolor.</p>
                      </article>`
          $("#app-section1").html(strm3)
          $("#app-section2").html(strm4)
        }
        if(a>0)
        {
          $("#app2-section1").html(stra1)
          $("#app2-section2").html(stra2)
        }
        else
        {
          let stra4 = `<article class="article2">
                        <header>
                          <h1>下午</h1>
                          <h1>清单</h1>
                        </header>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dignissimos corporis dolor.</p>
                      </article>`
          $("#app2-section1").html(stra3)
          $("#app2-section2").html(stra4)
        }
        if(e>0)
        {
          $("#app3-section1").html(stre1)
          $("#app3-section2").html(stre2)
        }
        else
        {
          let stre4 = `<article class="article3">
                        <header>
                          <h1>晚上</h1>
                          <h1>清单</h1>
                        </header>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet dignissimos corporis dolor.</p>
                      </article>`
          $("#app3-section1").html(stre3)
          $("#app3-section2").html(stre4)
        }
        setDataActive()
        clickNext()
      }
    }
  })
}


function clickNext()
{
  //实现卡片点击
  const elApp = document.querySelector("#app");
  const elApp2 = document.querySelector("#app2");
  const elApp3 = document.querySelector("#app3");
  const elBackgrounds = Array.from(document.querySelectorAll(".background"));
  const elBackgrounds2 = Array.from(document.querySelectorAll(".background2"));
  const elBackgrounds3 = Array.from(document.querySelectorAll(".background3"));
  const elArticles = Array.from(document.querySelectorAll(".article"));
  const elArticles2 = Array.from(document.querySelectorAll(".article2"));
  const elArticles3 = Array.from(document.querySelectorAll(".article3"));

  elArticles.forEach(article => {
    article.addEventListener("click", e => {
      const index = elArticles.indexOf(article);
      const bg = elBackgrounds[index];
      
      // Remove all data-active
      elApp.querySelectorAll("[data-active]").forEach(el => {
        el.removeAttribute("data-active");
      });
      
      article.setAttribute("data-active", true);
      bg.setAttribute('data-active', true);
    });
  });

  elArticles2.forEach(article2 => {
    article2.addEventListener("click", e => {
      const index = elArticles2.indexOf(article2);
      const bg = elBackgrounds2[index];
      
      // Remove all data-active
      elApp2.querySelectorAll("[data-active]").forEach(el => {
        el.removeAttribute("data-active");
      });
      
      article2.setAttribute("data-active", true);
      bg.setAttribute('data-active', true);
    });
  });

  elArticles3.forEach(article3 => {
    article3.addEventListener("click", e => {
      const index = elArticles3.indexOf(article3);
      const bg = elBackgrounds3[index];
      
      // Remove all data-active
      elApp3.querySelectorAll("[data-active]").forEach(el => {
        el.removeAttribute("data-active");
      });
      
      article3.setAttribute("data-active", true);
      bg.setAttribute('data-active', true);
    });
  });
}

$(".show-btn").click(function(){
  $(".sm-menu").fadeToggle("fast")
})

$("#add-btn").click(function(){
  $("#addModal").fadeIn("fast")
  $("#cover").css('display','block')
})

$("#theme-btn").click(function(){
  $("#themeModal").fadeIn("fast")
  $("#cover").css('display','block')
})

$("#out-btn").click(function(){
  if(confirm("确定要退出登录吗?"))
  {
    let key =sessionStorage.key('loginUserEmail')
    sessionStorage.removeItem(key)
    window.location.href = "login.html"
  }
})

$("#close-btn").click(function(){
  $("#addModal").fadeOut("fast")
  $("#themeModal").fadeOut("fast")
  $("#cover").css('display','none')
  $("#title").val("")
  $("#detail").val("")
  $("#hour").val("")
  $("#minute").val("")
})

$("#deleteAll-btn").click(function(){
  deleteAll()
})

$("#hour").blur(function(){
  if($("#hour").val() != '')
  {
    if($("#hour").val()>23 || $("#hour").val()<6)
    {
      $.growl.error({message: '请输入正确的时间格式~'})
      $("#hour").css('border','1px solid red')
      $("#hour").focus()
    }
    else
    {
      $("#hour").css('border','1px solid #ccc')
    }
  } 
})

$("#minute").blur(function(){
  if($("#minute").val() != '')
  {
    if($("#minute").val()>59 || $("#minute").val()<0)
    {
      $.growl.error({message: '请输入正确的时间格式~'})
      $("#minute").css('border','1px solid red')
      $("#minute").focus()
    }
    else
    {
      $("#minute").css('border','1px solid #ccc')
    }
  } 
})

function finished(pid)
{
  $.ajax({
    method: 'GET',
    url: 'http://127.0.0.1:5050/user/finished',
    data: `pid=${pid}`,
    success:function(data,msg,xhr)
    {
      console.log('异步请求完成API成功：')
      $.growl.notice({message: data.msg });
      flash()
      AllFinished()
    },
    error:function(xhr,err)
    {
      console.log('异步请求完成API失败：')
      $.growl.notice({err});
    }
  })
}

function unfinished(pid)
{
  $.ajax({
    method: 'GET',
    url: 'http://127.0.0.1:5050/user/unfinished',
    data: `pid=${pid}`,
    success:function(data,msg,xhr)
    {
      console.log('异步请求未完成API成功：')
      $.growl.notice({message: data.msg });
      flash()
      AllFinished()
    },
    error:function(xhr,err)
    {
      console.log('异步请求未完成API失败：')
      $.growl.notice({err});
    }
  })
}

function deleteone(pid)
{
  $.ajax({
    method: 'GET',
    url: 'http://127.0.0.1:5050/user/delete',
    data: `pid=${pid}`,
    success:function(data,msg,xhr)
    {
      console.log('异步请求删除API成功：')
      $.growl.notice({message: data.msg });
      flash()
    },
    error:function(xhr,err)
    {
      console.log('异步请求删除API失败：')
      $.growl.notice({err});
    }
  })
}

function AllFinished()
{
  let key =sessionStorage.key('loginUserEmail')
  // let loginUserEmail = sessionStorage.getItem(key)
  // let loginUserEmail = '2429747506@qq.com'
  let loginUserEmail = '20172005046@m.scnu.edu.cn'
  $.ajax({
    method: 'GET',
    url: 'http://127.0.0.1:5050/user/allfinished',
    data: `email=${loginUserEmail}`,
    success:function(data,msg,xhr)
    {
      let str = ''
      if(data.length!=0)
      {
        console.log('异步请求已完成列表API成功：')
        for(var i=0;i<data.length;i++)
        {
          str += `<div class="task">
                    <span style="font-size: 20px;">${data.list[i].time}</span>
                    <span style="font-size: 20px;">${data.list[i].title}</span>
                    <button type="button" class="unfinished" onclick="unfinished(${data.list[i].pid})">
                      <svg t="1575900448704" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1833" width="32" height="32"><path d="M728.32 62.0032a38.4 38.4 0 1 0-33.28 69.2224A424.96 424.96 0 0 1 934.4 512c0 232.9088-189.4912 422.4-422.4 422.4S89.6 744.9088 89.6 512 279.0912 89.6 512 89.6a38.4 38.4 0 0 0 0-76.8C236.7488 12.8 12.8 236.7488 12.8 512s223.9488 499.2 499.2 499.2 499.2-223.9488 499.2-499.2a502.1184 502.1184 0 0 0-282.88-449.9968z" fill="#ffffff" p-id="1834"></path><path d="M731.4432 331.008a38.4 38.4 0 0 0-65.5872-27.136L512 457.728 358.144 303.8208a38.4 38.4 0 0 0-54.3232 54.272L457.728 512l-153.856 153.856a38.2976 38.2976 0 0 0 27.136 65.536 38.0928 38.0928 0 0 0 27.136-11.264L512 566.3232l153.856 153.856a38.2976 38.2976 0 0 0 65.536-27.136 38.0928 38.0928 0 0 0-11.264-27.136L566.3232 512l153.856-153.856a38.0928 38.0928 0 0 0 11.264-27.136z" fill="#ffffff" p-id="1835"></path></svg>                        
                    </button>
                  </div>`
        }
      }
      else
      {
        str += "<span>空空如也~</span>"
      }
      $(".badge").text(data.length)
      $(".completed").html(str)
    },
    error:function(xhr,err)
    {
      console.log('异步请求已完成列表API失败：')
      $.growl.error({err});
    }
  })
}

function deleteAll()
{
  let truthBeTold = confirm("确定要全部删除吗?")
  if(!truthBeTold)
  {
    //点击了否则返回
    return
  }
  let key =sessionStorage.key('loginUserEmail')
  // let loginUserEmail = sessionStorage.getItem(key)
  // let loginUserEmail = '2429747506@qq.com'
  let loginUserEmail = '20172005046@m.scnu.edu.cn'
  $.ajax({
    method: 'GET',
    url: 'http://127.0.0.1:5050/user/deleteAll',
    data: `email=${loginUserEmail}`,
    success:function(data,msg,xhr)
    {
      $.growl.notice({message: data.msg });
      flash()
      AllFinished()
    },
    error:function(xhr,err)
    {
      console.log('异步请求删除全部API失败：')
      $.growl.notice({err});
    }
  })
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function tag(obj)
{
  let value = $(obj).text()
  console.log(value)
  $("#title").val(value)
}

function selectColor(obj)
{
  let colorName = $(obj).attr("data-name")
  $("body").removeClass()
  $("body").addClass(colorName)
  $("#themeModal").fadeOut("fast")
  $("#cover").css('display','none')
}

$(".color").click(function(){
  selectColor(this)
})

function nextHelpModal(obj)
{
  let oneTop = $("header").offset().top + 35
  let oneLeft = $("header").offset().left + 135
  $("#one").css({top:oneTop+'px',left:oneLeft+'px'})

  let twoTop = $(".delete").offset().top -31
  let twoLeft = $(".delete").offset().left + 68
  $("#two").css({top:twoTop+'px',left:twoLeft+'px'})

  let threeTop = $(".finished").offset().top -130
  let threeLeft = $(".finished").offset().left - 84
  $("#three").css({top:threeTop+'px',left:threeLeft+'px'})

  let fourTop = $(".badge").offset().top -43
  let fourLeft = $(".badge").offset().left +50
  $("#four").css({top:fourTop+'px',left:fourLeft+'px'})
  fourTop = fourTop - 60
  fourLeft = fourLeft - 10
  $("#five").css({top:fourTop+'px',left:fourLeft+'px'})
  fourLeft = fourLeft + 255
  $("#Six").css({top:fourTop+'px',left:fourLeft+'px'})

  if($(obj).is($(".helpModal:last")))
  {
    $(obj).fadeOut("fast")
    $("#closeHelp-btn").css('display','none')
    $("#cover").css('display','none')
    return
  }
  $(obj).fadeOut("fast")
  $(obj).next().fadeIn("fast")
  return
}

$("#help-btn").click(function(){
  $("#closeHelp-btn").css('display','block')
  $(".helpModal:first").fadeIn("fast")
  $("#cover").css('display','block')
})

$("#closeHelp-btn").click(function(){
  $(".helpModal:visible").fadeOut("fast")
  $("#cover").fadeOut("fast")
  $(this).fadeOut("fast")
})

$(".helpModal").click(function(){
  nextHelpModal(this)
})

$(".cover").click(function(){
  nextHelpModal($(".helpModal:visible"))
})


