var HomePage = {
  template: 
      '<h1>{{ message }}</h1>',
  data: function() {
    return {
      message: "Welcome to Basner Media Empire",
    };
  }
};

var LoginPage = {
  template: '<div class="">' + 
      '<h1>Login</h1>' +
      '<ul>' +
        '<li class="" v-for="error in errors">{{ error }}</li>' +
      '</ul>' +
      '<div class="">' +
        '<label>Email:</label>' +
        '<input type="email" class="form-control" v-model="email">' +
      '</div>' +
      '<div class="">' +
       ' <label>Password:</label>' +
        '<input type="password" class="form-control" v-model="password">' +
      '</div>' +
      '<button class="" v-on:click="submit()">Submit</button>' +
    '</div>',
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email, 
        password: this.password
      };

      if (this.errors.length >= 1) {
        this.errors = [];
      }

      if (this.email === '') {
        this.errors.push("Email required");
      }

      if (this.password === '') {
        this.errors.push("Password required");
      }
      
      if (this.errors.length === 0) {
        axios
          .post("/sessions", params)
          .then(function(response) {
            if (response.data.jwt) {
              axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
              localStorage.setItem("jwt", response.data.jwt);
              console.log('logged in');
              router.push("/");
            }
          })
          .catch(
            function(error) {
              this.errors = ['Incorrect email or password'];
              this.email = "";
              this.password = "";
            }.bind(this)
          );
        if (!localStorage.getItem("jwt")) {
          console.log('not logged in');
          this.errors = ['Incorrect email or password'];
          this.email = "";
          this.password = "";
        } 
      } 
    } 
  }
};

var LogoutPage = {
  template: '<h1>Logout</h1>',
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem('jwt');
    axios.delete('/logout');
    router.push('/');
  }
};

var router = new VueRouter({
  routes: [ 
    { path: "/", component: HomePage },    
    { path: "/login", component: LoginPage },
    { path: "/logout", component: LogoutPage}   
  ], 
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    console.log('jwt');
    console.log(jwt);
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});