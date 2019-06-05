import AjaxRequest from'../libs/axios.js'
export let loginApi = (user,pass)=>{
return AjaxRequest.request({
        url:'/login',
        method:'post',
        data:{
            user,
            pass,
        },
    });
};
//验证是否登录的请求
export let isloginApi =()=>
    AjaxRequest.request({
        url:'/validate',
        method:'post'
});