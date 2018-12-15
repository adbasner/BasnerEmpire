Vue.component('nav-bar', {
  template:
    '<nav>' +
      '<a class="nav-link" href="/#">BASNER MEDIA</a>' +
      '<a class="nav-link" href="#about">ABOUT</a>' +
      '<a class="nav-link" href="/#posts">ARTICLES</a>' +
      '<a class="nav-link" href="/#contact">CONTACT</a> ' +
    '</nav>' 
});

Vue.component('header-img', {
  template: 
  '<div id="header">' +
    '<div id="header-img">' +
      '<p id="header-text">Hello World!</p>' +
    '</div>' +
  '</div>'
});

Vue.component('about-section', {
  template: 
    '<div id="about">' +
      '<h1>{{ headerMsg }}</h1>' +
      '<p>{{ message }}</p>' +
      '<p>{{ message }}</p>' +
      '<p>{{ message }}</p>' +
      '<p>{{ message }}</p>' +
      '<p>{{ message }}</p>' +
      '<p>{{ message }}</p>' +
    '</div>',
  data: function() {
    return {
      headerMsg: "Welcome to Basner Media Empire",
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };
  } 
});

Vue.component('intro-blog-posts', {
  template:
    '<div id="posts">' +
      '<h2 class="center">Recent Blog Posts</h2>' +
      '<div id="post-wrapper">' +
        '<div id="postOne" class="main-page-post"><h1>{{ posts[0]["title"] }}</h1></div>' +
        '<div id="postTwo" class="main-page-post"><h1>{{ posts[1]["title"] }}</h1></div>' +
        '<div id="postThree" class="main-page-post"></div> ' +
      '</div>' +
      '<div class="btn-wrapper">' +
        '<button class="btn btn-primary">View all posts</button>' +
      '</div>' +
    '</div>',
  data: function() {
    return {
      posts: []
    };
  },
  created: function() {
    axios
      .get("/api/v1/posts")
      .then(function(response) {
        console.log(response.data.posts);
        let i = 0;
        this.posts = response.data.posts;
      }.bind(this));
  },
  methods: {},
  computes: {}
});

var HomePage = {
  template:
      '<div id="main">' + 
        '<nav-bar></nav-bar>' +
        '<header-img></header-img>' +
        '<intro-blog-posts></intro-blog-posts>' +
        '<about-section></about-section>' +
      '</div> <!-- main -->',
  data: function() {
    return {
      message: "Welcome to Basner Media Empire",
    };
  }
};

var LoginPage = {
  // components: {
  //   Navbar
  // },
  template:
    '<div>' +  
      '<nav-bar></nav-bar>' +
      '<div class="">' + 
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
      '</div>' +
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
    { path: "/logout", component: LogoutPage },
    { path: "/about", component: HomePage }   
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