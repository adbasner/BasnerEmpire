// *****************************
//
// Components 
//
// *****************************

Vue.component('client-navbar', {
  props: ['page'],
  template:`
    <nav id="client-navbar">
      <router-link to="/" class="nav-link" v-bind:class="[page==
      'home' ? 'nav-active':'']">basner media</router-link>
      <router-link to="/about" class="nav-link" v-bind:class="[page==
      'about' ? 'nav-active':'']">about</router-link>
      <router-link to="/contact" class="nav-link" v-bind:class="[page==
      'contact' ? 'nav-active':'']">contact</router-link>
      <router-link to="/articles" class="nav-link nav-no-right-border" v-bind:class="[page==
      'articles' ? 'nav-active':'']">articles</router-link>
      <a class="nav-link nav-no-right-border" id="toggle-icon" @click="toggleNav">&#9776;</a>
    </nav>
  `,
  methods: {
    toggleNav: function() {
      const navItems = document.querySelectorAll(".nav-link");
      navItems.forEach(navItem => 
        navItem.classList.toggle('responsive')
      );
    }
  }
});

Vue.component('admin-navbar', {
  template:`
    <nav id="admin-navbar">
      <router-link to="/" class="nav-link" target="_blank">BASNER MEDIA</router-link>
      <router-link to="/dashboard" class="nav-link">DASHBOARD</router-link>
      <router-link to="/dashboard" class="nav-link">EDIT PROFILE</router-link>
      <a class="nav-link" @click="logout">LOG OUT</a>
    </nav>
  `,
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
    `<div id="admin-sidebar">
      <router-link to="/dashboard/posts" class="side-link">view posts</router-link>
      <router-link to="/dashboard/posts/new" class="side-link">new post</router-link>
      <router-link to="/dashboard/messages" class="side-link">messages</router-link>
    </div>`,
  methods: {
  },
});

Vue.component('header-img', {
  template:`
    <div id="header">
      <h1 id="header-text" class="center">{{ headerText }}</h1>
      <h2 id="header-subtext" class="center">{{ headerSubText }}</h2>
    </div>
  `,
  data: function() {
    return {
      headerText: "Welcome to Basner Media",
      headerSubText: "Info and insight on web development"
    };
  }
});

Vue.component('about-section', {
  template:`
    <div id="about"  class="content-wrapper">
      <h2 class="center">{{ headerMsg }}</h2>
      <p>{{ message }}</p>
      <p>{{ message }}</p>
      <p>{{ message }}</p>
      <p>{{ message }}</p>
      <p>{{ message }}</p>
      <p>{{ message }}</p>
    </div>
  `,
  data: function() {
    return {
      headerMsg: "Welcome to Basner media",
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    };
  },
});

Vue.component('contact-me', {
  props: ['message'],
  template:`
    <div id="contact" class="content-wrapper">
      <h2 class="center">Contact Me</h2>
      <p class="center">Fill out the form below or find me on social media</p>
      <div class="center socials">
        <a href="https://github.com/adbasner" title="GitHub" target="_blank" ><i class="fab fa-github-square"></i></a>
        <a href="https://www.facebook.com/adbasner" title="Facebook" target="_blank" ><i class="fab fa-facebook"></i></a>
        <a href="https://www.linkedin.com/in/adbasner/" title="LinkedIn" target="_blank" ><i class="fab fa-linkedin"></i></a>
        <a href="https://twitter.com/AndrewBasner" title="Twitter" target="_blank" ><i class="fab fa-twitter-square"></i></a>
        <a href="https://medium.com/@andrewbasner" title="Medium Blog" target="_blank" ><i class="fab fa-medium"></i></a>
        <a href="https://www.freecodecamp.org/adbasner" title="Free Code Camp" target="_blank" ><i class="fab fa-free-code-camp"></i></a>
        <a href="https://www.instagram.com/andrewbasner/" title="Instagram" target="_blank" ><i class="fab fa-instagram"></i></a>
        <a href="https://www.youtube.com/channel/UCh-x5PjpgcLiud7kebyZbXg/" title="Youtube" target="_blank" ><i class="fab fa-youtube"></i></a>
      </div>

      <form method="post" @submit.prevent>

        <div class="inputbox">
          <label for="name">Name: </label>
          <input id="name" type="text" name="name" v-model="message.name" required>
        </div>

        <div class="inputbox">
          <label for="email">Email: </label>
          <input id="email" type="email" name="email" v-model="message.email" required>
        </div>

        <div class="inputbox">
         <label for="message">Message: </label>
          <textarea rows="10" id="message" type="textarea" name="message" v-model="message.message" required></textarea>
        </div>
       
        <div class="inputbox">
          <input class="btn" type="submit" name="submit" v-on:click="$emit('submit')">
        </div>

      </form>
    </div>
  `,
  data: function() {
    return {
      messages: {}
    };
  }
});

Vue.component('last-blog-post', {
  template:
    '<div id="posts" class="content-wrapper">' +
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

Vue.component('post-form', {
  props: ['post', 'formType'],
  template:`
    <div class="post-form">
      <div class="post-wrapper">
        <form  method="post" @submit.prevent>
          <div class="inputbox">
            <label for="title">Title: </label>
            <input id="title" type="text" name="title" v-model="post.title">
          </div>
          <div class="inputbox">
           <label for="content">Content: </label>
            <textarea rows="10" id="content" type="textarea" name="content" v-model="post.content"></textarea>
          </div>
          <div class="inputbox">
            <input class="btn" type="submit" v-bind:value="formType" name="submit" v-on:click="$emit('submit')" >
          </div>
        </form>
      </div>
      <div>
        <h3>Use the editor below to copy and paste.</h3>
        <textarea id='editor'>
        </textarea>
      </div>
      <button @click="replace()">Switch this box to advanced mode</button>
    </div>`,
  methods: {
    replace: function() {
      CKEDITOR.replace( 'editor' );
    }
  }
});
          
// *****************************
//
// Pages 
//
// *****************************

let TheHomePage = {
  template:`
    <div id="vue-home-main">
      <client-navbar v-bind:page='page'></client-navbar>
      <header-img></header-img>
    </div> <!-- main -->`,
  data: function() {
    return {
      page: 'home'
    }; 
  },
  methods: {
    submit: function() {
      
      var params = {
        name: this.messages.name || '',
        email: this.messages.email || '',
        message: this.messages.message || ''
      };
      if (params.name !== '' && params.email !== '' && params.message !== '') {
        axios
          .post('/api/v1/messages/', params)
          .then(function(response) {
            alert('Your message was sent');
            window.scrollTo(0, 0);
            location.reload(true);
          });
      } else {
        alert('You must fill in a name, email and message if you want to sent a message!');
      }
    }
  }
};

let TheAboutPage = {
  template:`
    <div id="vue-home-main">
      <client-navbar v-bind:page='page'></client-navbar>
      <about-section></about-section>
    </div> <!-- main -->`,
  data: function() {
    return {
      page: 'about'
    }; 
  }
};

let TheContactPage = {
  template:`
    <div id="vue-home-main">
      <client-navbar v-bind:page='page'></client-navbar>
      <contact-me v-bind:message="messages" v-on:submit="submit"></contact-me>
    </div> <!-- main -->`,
  data: function() {
    return {
      page: 'contact',
      messages: {},
      emailrrors: [],
    }; 
  },
  methods: {
    submit: function() {  
      var params = {
        name: this.messages.name || '',
        email: this.messages.email || '',
        message: this.messages.message || ''
      };
      if (params.name !== '' && params.email !== '' && params.message !== '') {
        axios
          .post('/api/v1/messages/', params)
          .then(function(response) {
            alert('Your message was sent');
            window.scrollTo(0, 0);
            location.reload(true);
          });
      } else {
        alert('You must fill in a name, email and message if you want to sent a message!');
      }
    }
  }
};

let TheArticlesPage = {
  template:`
    <div id="vue-home-main">
      <client-navbar v-bind:page='page'></client-navbar>
      <last-blog-post></last-blog-post>
    </div> <!-- main -->`,
  data: function() {
    return {
      page: 'articles'
    }; 
  }
};
      // '<div class="content-wrapper">' +
      //   '<about-section></about-section>' +
      //   '<contact-me v-bind:message="messages" v-on:submit="submit"></contact-me>' +
      //   '<last-blog-post></last-blog-post>' +
      //   '<footer-section></footer-section>' +
      // '</div> <!-- content-wrapper -->' +

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
          '<input id="email" required type="email" class="form-control" v-model="email">' +
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
    `<div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 

        <div class="alert-box">
          <div class="alert alert-danger" v-for="error in errors">
            {{ error }} 
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          </div>
        </div>
         
        <div class="post-wrapper" v-for="post in posts"> 
          <p>{{ post.title }} | 
             {{ post.content }} | 
             {{ post.created_at }} | 
             <a v-bind:href="'/#/dashboard/posts/' + post.id">View Post</a>                     
          </p>
        </div>
      </div>
    </div>`,
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
        this.posts = response.data.posts;
      }.bind(this))
      .catch(function(error) {
        this.errors = ['There seems to be a problem with the server right now.  Try again later'];
      }.bind(this));
  }
};

var AdminMessagesIndexPage = {
  template: 
    `<div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 

        <div class="alert-box">
          <div class="alert alert-danger" v-for="error in errors">
            {{ error }} 
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          </div>
        </div>
         
        <div class="post-wrapper" v-for="message in messages"> 
          <p>{{ message.name }} | 
             {{ message.email }} | 
             {{ message.message }} | 
             {{ message.created_at }} | 
             <a v-bind:href="'/#/dashboard/messages/' + message.id">View Message</a>                     
          </p>
        </div>
      </div>
    </div>`,
  data: function() {
    return {
      messages: [],
      errors: []
    };
  },
  created: function() {
    axios
      .get('/api/v1/messages')
      .then(function(response) {
        this.messages = response.data.messages;
      }.bind(this))
      .catch(function(error) {
        this.errors = ['There seems to be a problem with the server right now.  Try again later'];
      }.bind(this));
  }
};

var AdminPostNewPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 

        <div class="alert-box">
          <div class="alert alert-danger" v-for="error in errors">
            {{ error }} 
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          </div>
        </div>

        <post-form v-bind:post='post' v-bind:formType='formType' v-on:submit="submit" ></post-form>


      </div>
    </div>`,
  data: function() {
    return {
      post: {},
      errors: [],
      postId: this.$route.params.id,
      formType: 'New Post'
    };
  },
  methods: {
    submit: function() {
      var params = {
        title: this.post.title || '',
        content: this.post.content || ''
      };

      axios
        .post('/api/v1/posts/', params)
        .then(function(response) {
          router.push('/dashboard/posts/' + response.data.id );
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var AdminPostShowPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 

        <div class="alert-box">
          <div class="alert alert-danger" v-for="error in errors">
            {{ error }} 
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          </div>
        </div>
         
        <div class="post-wrapper"> 
          <p>{{ post.title }} | 
             <span  v-html="post.content">{{ post.content }}</span> | 
             {{ post.created_at }} | 
             <a v-bind:href="'/#/dashboard/posts/' + post.id + '/edit'">Edit Post</a> |                      
             <a v-bind:href="'/#/dashboard/posts/' + post.id + '/delete'">Delete Post</a> |                      
             <a v-bind:href="'/#/dashboard/posts/'">View all posts</a> |
          </p>
        </div>
      </div>
    </div>`,
  data: function() {
    return {
      post: {},
      errors: [],
      postId: this.$route.params.id
    };
  },
  created: function() {
    axios
      .get('/api/v1/posts/' + this.postId)
      .then(function(response) {
        this.post = response.data;
      }.bind(this))
      .catch(function(error) {
        this.errors = ['There seems to be a problem with the server right now.  Try again later'];
      }.bind(this));
  },
};

var AdminMessageShowPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 

        <div class="alert-box">
          <div class="alert alert-danger" v-for="error in errors">
            {{ error }} 
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          </div>
        </div>
         
        <div class="post-wrapper"> 
          <p>{{ message.name }} | 
              {{ message.email }} | 
              {{ message.message }} | 
             {{ message.created_at }} |                       
             <a @click="handleDelete()">Delete Message</a> |                      
             <a v-bind:href="'/#/dashboard/messages/'">View all messages</a> |
          </p>
        </div>
      </div>
    </div>`,
  data: function() {
    return {
      message: {},
      errors: [],
      messageId: this.$route.params.id
    };
  },
  created: function() {
    axios
      .get('/api/v1/messages/' + this.messageId)
      .then(function(response) {
        this.message = response.data;
      }.bind(this))
      .catch(function(error) {
        this.errors = ['There seems to be a problem with the server right now.  Try again later'];
      }.bind(this));
  },
  methods: {
    handleDelete: function() {
      axios
        .delete("/api/v1/messages/" + this.messageId)
        .then(function(response) {
          router.push("/dashboard/messages");
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var AdminPostEditPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 

        <div class="alert-box">
          <div class="alert alert-danger" v-for="error in errors">
            {{ error }} 
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          </div>
        </div>

        <post-form v-bind:post='post' v-bind:formType='formType' v-on:submit="submit" ></post-form>


      </div>
    </div>`,
  data: function() {
    return {
      post: {},
      errors: [],
      postId: this.$route.params.id,
      formType: 'Edit'
    };
  },
  created: function() {
    axios
      .get('/api/v1/posts/' + this.postId)
      .then(function(response) {
        this.post = response.data;
      }.bind(this))
      .catch(function(error) {
        this.errors = ['There seems to be a problem with the server right now.  Try again later'];
      }.bind(this));
  },
  methods: {
    submit: function() {
      var params = {
        title: this.post.title,
        content: this.post.content
      };
      var route = "/dashboard/posts/" + this.postId;
      axios
        .patch("/api/v1/posts/" + this.postId, params)
        .then(function(response) {
          router.push(route);
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var AdminPostDeletePage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 

        <div class="alert-box">
          <div class="alert alert-danger" v-for="error in errors">
            {{ error }} 
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
          </div>
        </div>
         
        <div class="post-wrapper"> 
          <p>{{ post.title }} | 
             {{ post.content }} | 
             {{ post.created_at }} | 
             <button class='btn' @click="submit()">Delete this Post?</button>
             <button class='btn'>No</button>
          </p>
        </div>
      </div>
    </div>`,
  data: function() {
    return {
      post: {},
      errors: [],
      postId: this.$route.params.id
    };
  },
  created: function() {
    axios
      .get('/api/v1/posts/' + this.postId)
      .then(function(response) {
        this.post = response.data;
      }.bind(this))
      .catch(function(error) {
        this.errors = ['There seems to be a problem with the server right now.  Try again later'];
      }.bind(this));
  },
  methods: {
    submit: function() {
      axios
        .delete("/api/v1/posts/" + this.postId)
        .then(function(response) {
          router.push("/dashboard/posts");
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var router = new VueRouter({
  routes: [ 
    { path: "/", component: TheHomePage },
    { path: "/about", component: TheAboutPage },
    { path: "/contact", component: TheContactPage },
    { path: "/articles", component: TheArticlesPage },
    { path: "/login", component: LoginPage },
    { path: "/dashboard", component: DashboardPage },
    { path: "/dashboard/posts", component: AdminPostIndexPage },
    { path: "/dashboard/posts/new", component: AdminPostNewPage },
    { path: "/dashboard/posts/:id", component: AdminPostShowPage },
    { path: "/dashboard/posts/:id/edit", component: AdminPostEditPage },
    { path: "/dashboard/posts/:id/delete", component: AdminPostDeletePage },
    { path: "/dashboard/messages", component: AdminMessagesIndexPage },
    { path: "/dashboard/messages/:id", component: AdminMessageShowPage }

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