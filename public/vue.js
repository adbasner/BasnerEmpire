// *****************************
//
// Components 
//
// *****************************

Vue.component('home-navbar', {
  template:
    '<nav id="home-navbar">' +
      '<router-link to="" class="nav-link nav-active" @click.native="goto(\'header\')">BASNER MEDIA</router-link>' +
      '<router-link to="" class="nav-link" @click.native="goto(\'about\')">ABOUT</router-link>' +
      '<router-link to="" class="nav-link" @click.native="goto(\'contact\')">CONTACT</router-link>' +
      '<router-link to="" class="nav-link" @click.native="goto(\'posts\')">RECENT POST</router-link>' +
      '<router-link to="" class="nav-link" @click.native="goto(\'posts\')">ALL ARTICLES</router-link>' +
    '</nav>',
  methods: {
    goto(anchor) {
      let el = document.getElementById(anchor);
      window.scrollTo({left: 0, top: el.offsetTop, behavior: 'smooth' });
    }
  }
});

Vue.component('admin-navbar', {
  template:
    '<nav id="admin-navbar">' +
      '<router-link to="/" class="nav-link" target="_blank">BASNER MEDIA</router-link>' +
      '<router-link to="/dashboard" class="nav-link">DASHBOARD</router-link>' +
      '<router-link to="/dashboard" class="nav-link">EDIT PROFILE</router-link>' +
      '<router-link to="to" class="nav-link" @click.native="logout">LOG OUT</router-link>' +
    '</nav>',
  created: function() {
    if (!localStorage.getItem('jwt')) {
      router.push('login');
    }
  },
  methods: {
    logout: function() {
      axios.defaults.headers.common["Authorization"] = undefined;
      localStorage.removeItem('jwt');
      axios.delete('/logout');
      router.push('/login');
    },
  }
});

Vue.component('admin-sidebar', {
  template:
    '<div id="admin-sidebar">' +
      '<router-link to="/dashboard/posts" class="side-link">view posts</router-link>' +
      '<router-link to="/dashboard" class="side-link">new post</router-link>' +
      '<router-link to="to" class="side-link" @click.native="logout">messages</router-link>' +
    '</div>',
  methods: {
  },
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

Vue.component('contact-me', {
  template:
    '<div id="contact" class="anchor">' +
      '<div id="contact-wrapper">' +
        '<h2 class="center">Contact Me</h2>' +
       ' <form>' +

          '<div class="inputbox">' +
            '<label for="name">Name: </label>' +
            '<input id="name" type="text" name="name" placeholder="name">' +
          '</div>' +

          '<div class="inputbox">' +
            '<label for="email">Email: </label>' +
            '<input id="email" type="email" name="email" placeholder="email@example.com">' +
          '</div>' +

          '<div class="inputbox">' +
            '<label for="message">Message: </label>' +
            '<textarea rows="10" type="textarea" name="message"placeholder="Enter your message here"></textarea>' +
          '</div>' +

          '<div class="inputbox">' +
            '<input class="btn" type="submit" name="submit">' +
          '</div>' +

        '</form>' +
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

Vue.component('last-blog-post', {
  template:
    '<div id="posts" class="anchor">' +
      '<div class="main-page-post">' +
        '<h3>{{ lastpost.title }}</h3>' + 
        '<div class="post-content" v-html="lastpost.content">' + 
          '{{ lastpost.content }}' + 
        '</div>' +
        '<div id="vpb-div" class="center"><button id="view-posts-btn" class="btn">View all blog posts</button></div>' +
      '</div> <!-- main-page-post -->'  +
    '</div>',
  data: function() {
    return {
      lastpost: {}
    };
  },
  created: function() {
    axios
      .get("/api/v1/lastpost")
      .then(function(response) {
        let i = 0;
        this.lastpost = response.data;
      }.bind(this));
  }
});

Vue.component('footer-section', {
  template: 
  '<footer id="footer"">' +
      '<a href="/#/dashboard">Dashboard</a>' +
  '</footer>'
});


// *****************************
//
// Pages 
//
// *****************************

var HomePage = {
  template:
    '<div id="vue-home-main">' + 
      '<home-navbar></home-navbar>' +
      '<header-img></header-img>' +
      '<div class="content-wrapper">' +
        '<about-section></about-section>' +
        '<contact-me></contact-me>' +
        '<last-blog-post></last-blog-post>' +
        '<footer-section></footer-section>' +
      '</div> <!-- content-wrapper -->' +
    '</div> <!-- main -->'
};

var LoginPage = {
  template:
    '<div id="vue-login-main">' +  
      '<div id="login">' +
        '<div class="alert-box">' +
          '<div class="alert alert-danger" v-for="error in errors">' +
            '{{ error }}' + 
            '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
          '</div>' +
        '</div>' +
        '<h1>LOGIN</h1>' +
        '<div class="login-box">' +
          '<label for="email">Email:</label>' +
          '<input id="email" type="email" class="form-control" v-model="email">' +
        '</div>' +
        '<div class="login-box">' +
         ' <label for="password">Password:</label>' +
          '<input id="password" type="password" class="form-control" v-model="password">' +
        '</div>' +
        '<div class="login-box">' +
          '<input id="login-btn" class="btn" type="submit" @click="submit()" name="Submit">' +
        '</div>' +
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
              router.push("/dashboard");
            } else {
              this.giveErrors();
            }
          })
          .catch(
            function(error) {
              this.errors = ['Incorrect email or password'];
              this.email = "";
              this.password = "";
            }.bind(this)
          );
      } 
    },
    giveErrors: function() {
      if (!localStorage.getItem("jwt")) {
        this.errors = ['Incorrect email or password'];
        this.email = "";
        this.password = "";
      }
    } 
  }
};

var DashboardPage = {
  template: 
    '<div id="vue-admin-main">' +
      '<admin-navbar></admin-navbar>' +
      '<admin-sidebar></admin-sidebar>' + 
      '<div class="admin-wrapper">' + 
        '<div>Welcome Andrew, you are going to have an awesome day</div>' +
      '</div>' +
    '</div>',
};

var AdminPostIndexPage = {
  template: 
    '<div id="vue-admin-main">' +
      '<admin-navbar></admin-navbar>' +
      '<admin-sidebar></admin-sidebar>' + 
      '<div class="admin-wrapper">' + 

        '<div class="alert-box">' +
          '<div class="alert alert-danger" v-for="error in errors">' +
            '{{ error }}' + 
            '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
          '</div>' +
        '</div>' +
         
        '<div class="post-wrapper" v-for="post in posts">' + 
          '<p>{{ post.title }}</p>' +
          '<p>{{ post.content }}</p>' +
        '</div>' +
      '</div>' +
    '</div>',
  data: function() {
    return {
      posts: [],
      errors: []
    };
  },
  created: function() {
    axios
      .get('/api/v1/posts')
      .then(function(response) {
        console.log(response.data.posts);
        this.posts = response.data.posts;
      }.bind(this))
      .catch(function(error) {
        this.errors = ['There seems to be a problem with the server right now.  Try again later'];
      }.bind(this));
  },
};

var router = new VueRouter({
  routes: [ 
    { path: "/", component: HomePage },    
    { path: "/login", component: LoginPage },
    { path: "/dashboard", component: DashboardPage },
    { path: "/dashboard/posts", component: AdminPostIndexPage },

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