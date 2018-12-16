Vue.component('nav-bar', {
  template:
    '<nav>' +
      '<button class="nav-link nav-active">BASNER MEDIA</button>' +
      '<button class="nav-link">ABOUT</button>' +
      '<button class="nav-link">CONTACT</button> ' +
      '<button class="nav-link">RECENT POST</button>' +
      '<button class="nav-link">ALL ARTICLES</button>' +
    '</nav>'
});

Vue.component('header-img', {
  template: 
  '<div id="header" class="anchor">' +
    '<div id="header-img">' +
      '<h1 id="header-text" class="center">Welcome to Basner Media</h1>' +
      '<h2 id="header-subtext" class="center">Info and insight on web development</h2>' +
    '</div>' +
  '</div>'
});

Vue.component('about-section', {
  template: 
    '<div id="about"  class="anchor">' +
      '<h1 class="center">{{ headerMsg }}</h1>' +
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
    '<div id="posts" class="anchor">' +
      '<h2 class="center">Recent Blog Posts</h2>' +
      '<div id="post-wrapper">' +
        '<div class="main-page-post" v-for="post in posts">' +
          '<h2 class="center">{{ post.title }}</h2>' + 
          '<div class="post-content" v-html="post.content">' + 
            '{{ post.content }}' + 
          '</div>' +
          '<button class="btn small-post-btn">' +
            'Read post' +
          '</button></a>' +
        '</div> <!-- main-page-post -->'  +
      '</div> <!-- post-wrapper -->' +
      '<div class="center view-posts-wrapper">' +
        '<button id="view-posts-btn" class="btn">View all posts</button>' +
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
        let i = 0;
        this.posts = response.data.posts.slice(0, 3);
      }.bind(this));
  }
});

Vue.component('contact-me', {
  template:
    '<div id="contact" class="anchor">' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
      '<p>Contact</p>' +
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
        let i = 0;
        this.posts = response.data.posts.slice(0, 3);
      }.bind(this));
  }
});

Vue.component('footer-section', {
  template: 
  '<footer id="footer" class="anchor-last">' +
      '<a href="/#/login">Login</a>' +
      '<a href="/#/logout">Logout</a>' +
  '</footer>'
});

var HomePage = {
  template:
      '<div id="vue-main">' + 
        '<nav-bar></nav-bar>' +
        '<header-img></header-img>' +
        '<div class="content-wrapper">' +
          '<about-section></about-section>' +
          '<contact-me></contact-me>' +
          '<intro-blog-posts></intro-blog-posts>' +
          '<footer-section></footer-section>' +
        '</div> <!-- content-wrapper -->' +
      '</div> <!-- main -->',
  data: function() {
    return {
      message: "Welcome to Basner Media Empire",
    };
  }
};

var LoginPage = {
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