import Vue from 'vue';
import iView from 'iview';
import App from './App.vue';
import router from './router'; 
import store from './views/store';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
//如果使用了这个钩子必须调用next方法才会继续往下执行
  //to到哪去 from从哪来
router.beforeEach(async (to,from,next)=>{
  let islogin = await store.dispatch('valilogin');
  console.log(islogin)
  if(islogin){//已经登陆了
    if(to.name=='login'){ //并且是登录页就跳转到首页
      next('/');
    }else{
      next();
    }
  }else{
    next();
  }
})