<script>
import {useAppOptionStore} from '@/stores/app-option';

const appOption = useAppOptionStore();

export default {
  mounted() {
    appOption.appSidebarHide = true;
    appOption.appHeaderHide = true;
    appOption.appContentClass = 'p-0';
  },
  beforeRouteLeave(to, from, next) {
    appOption.appSidebarHide = false;
    appOption.appHeaderHide = false;
    appOption.appContentClass = '';
    next();
  },
  methods: {
    checkForm: function (e) {
      e.preventDefault();
      this.$router.push({path: '/dashboard/v3'})
    }
  }
}
</script>
<template>
  <!-- BEGIN login -->
  <div className="login login-with-news-feed">
    <!-- BEGIN news-feed -->
    <div className="news-feed">
      <div className="news-image" style="background-image: url(/assets/img/login-bg/login-bg-11.jpg)"></div>
      <div className="news-caption">
        <h4 className="caption-title"><b>INX</b> Admin App</h4>
<!--        <p>
          Download the Color Admin app for iPhone®, iPad®, and Android™. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </p>-->
      </div>
    </div>
    <!-- END news-feed -->

    <!-- BEGIN login-container -->
    <div className="login-container">
      <!-- BEGIN login-header -->
      <div className="login-header mb-30px">
        <div className="brand">
          <div className="d-flex align-items-center">
            <span className="logo"></span>
            <b>INX</b> - Admin
          </div>
          <small>INX 관리자 프로그램</small>
        </div>
        <div className="icon">
          <i className="fa fa-sign-in-alt"></i>
        </div>
      </div>
      <!-- END login-header -->

      <!-- BEGIN login-content -->
      <div className="login-content">
        <form v-on:submit="checkForm" method="GET" className="fs-13px">
          <div className="form-floating mb-15px">
            <input type="text" className="form-control h-45px fs-13px" placeholder="Email Address" id="emailAddress"/>
            <label htmlFor="emailAddress" className="d-flex align-items-center fs-13px text-gray-600">Email
              Address</label>
          </div>
          <div className="form-floating mb-15px">
            <input type="password" className="form-control h-45px fs-13px" placeholder="Password" id="password"/>
            <label htmlFor="password" className="d-flex align-items-center fs-13px text-gray-600">Password</label>
          </div>
          <div className="form-check mb-30px">
            <input className="form-check-input" type="checkbox" value="1" id="rememberMe"/>
            <label className="form-check-label" htmlFor="rememberMe">
              Remember Me
            </label>
          </div>
          <div className="mb-15px">
            <button type="submit" className="btn btn-success d-block h-45px w-100 btn-lg fs-14px">Sign me in</button>
          </div>
<!--          <div className="mb-40px pb-40px text-dark">
            Not a member yet? Click
            <router-link to="/user/register-v3" className="text-success">here</router-link>
            to register.
          </div>-->
          <hr className="bg-gray-600 opacity-2"/>
          <div className="text-gray-600 text-center text-gray-500-darker mb-0">
            &copy; Color Admin All Right Reserved 2022
          </div>
        </form>
      </div>
      <!-- END login-content -->
    </div>
    <!-- END login-container -->
  </div>
  <!-- END login -->
</template>
