// 登录
$("#loginbtn").click(function(){
  //读取所有的表单输入
  var email = $("#email").val()
  var upwd = $("#upwd").val()
  //验证表单输入的合法性
  if(email.length == 0)
  {
      $("#email").focus()
      alert("请输入邮箱地址~")
      return
  }
  if(upwd.length == 0)
  {
      $("#upwd").focus()
      alert("请输入密码~")
      return
  }
  //异步提交用户的输入给后台API
  $.ajax({
      method: 'POST',
      // url: 'http://ricardo.applinzi.com/user/login',
      url: 'http://127.0.0.1:5050/user/login',
      data: `email=${email}&upwd=${upwd}`,
      success:function(data,msg,xhr)
      {
          console.log('异步请求登录API成功：')
          alert(data.msg)
          if(data.code == 200)
          {
            sessionStorage.setItem('loginUserEmail',email)
            window.location.href = "index.html"
          }
          if(data.code == 403)
          {
            $("#upwd").val("")
            $("#upwd").focus()
          }
          if(data.code == 404)
          {
            $("#upwd").val("")
            $("#email").val("")
            $("#email").focus()
          } 
      },
      error:function(xhr,err)
      {
          console.log('异步请求登录API失败：')
          alert(err)
      }
  })
})

//注册
$("#registerbtn").click(function(){
  //读取所有的表单输入
  var email = $("#registerEmail").val()
  var upwd = $("#registerPwd").val()
  var rpwd = $("#registerRpwd").val()
  //验证表单输入的合法性
  if(email.length == 0)
  {
      $("#registerEmail").focus()
      alert("请输入邮箱地址~")
      return
  }
  if(upwd.length == 0)
  {
      $("#registerPwd").focus()
      alert("请输入密码~")
      return
  }
  if(rpwd.length == 0)
  {
    $("#registerRpwd").focus()
    alert("请再次输入密码~")
    return
  }
  if(rpwd != upwd)
  {
    alert("两次输入的密码不一致~")
    $("#registerPwd").val("")
    $("#registerRpwd").val("")
    return
  }
  //异步提交用户的输入给后台API
  $.ajax({
      method: 'POST',
      // url: 'http://ricardo.applinzi.com/user/register',
      url: 'http://127.0.0.1:5050/user/register',
      data: `email=${email}&upwd=${upwd}&rpwd=${rpwd}`,
      success:function(data,msg,xhr)
      {
          console.log('异步请求注册API成功：')
          alert(data.msg)
      },
      error:function(xhr,err)
      {
          console.log('异步请求注册API失败：')
          alert(err)
      }
  })
})

//点击不同按钮移动到不同的表单
var overlay = document.getElementById("overlay");

// Buttons to 'switch' the page
var openSignUpButton = document.getElementById("slide-left-button");
var openSignInButton = document.getElementById("slide-right-button");

// The sidebars
var leftText = document.getElementById("sign-in");
var rightText = document.getElementById("sign-up");

// The forms
var accountForm = document.getElementById("sign-in-info")
var signinForm = document.getElementById("sign-up-info");

// Open the Sign Up page
openSignUp = () =>{
  // Remove classes so that animations can restart on the next 'switch'
  leftText.classList.remove("overlay-text-left-animation-out");
  overlay.classList.remove("open-sign-in");
  rightText.classList.remove("overlay-text-right-animation");
  // Add classes for animations
  accountForm.className += " form-left-slide-out"
  rightText.className += " overlay-text-right-animation-out";
  overlay.className += " open-sign-up";
  leftText.className += " overlay-text-left-animation";
  // hide the sign up form once it is out of view
  setTimeout(function(){
    accountForm.classList.remove("form-left-slide-in");
    accountForm.style.display = "none";
    accountForm.classList.remove("form-left-slide-out");
  }, 700);
  // display the sign in form once the overlay begins moving right
  setTimeout(function(){
    signinForm.style.display = "flex";
    signinForm.classList += " form-right-slide-in";
  }, 200);
}

// Open the Sign In page
openSignIn = () =>{
  // Remove classes so that animations can restart on the next 'switch'
  leftText.classList.remove("overlay-text-left-animation");
  overlay.classList.remove("open-sign-up");
  rightText.classList.remove("overlay-text-right-animation-out");
  // Add classes for animations
  signinForm.classList += " form-right-slide-out";
  leftText.className += " overlay-text-left-animation-out";
  overlay.className += " open-sign-in";
  rightText.className += " overlay-text-right-animation";
  // hide the sign in form once it is out of view
  setTimeout(function(){
    signinForm.classList.remove("form-right-slide-in")
    signinForm.style.display = "none";
    signinForm.classList.remove("form-right-slide-out")
  },700);
  // display the sign up form once the overlay begins moving left
  setTimeout(function(){
    accountForm.style.display = "flex";
    accountForm.classList += " form-left-slide-in";
  },200);
}

// When a 'switch' button is pressed, switch page
openSignUpButton.addEventListener("click", openSignUp, false);
openSignInButton.addEventListener("click", openSignIn, false);