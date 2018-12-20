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
      <router-link to="/" class="nav-link" target="_blank">basner media</router-link>
      <router-link to="/dashboard" class="nav-link">dashboard</router-link>
      <router-link to="/dashboard/users" class="nav-link">edit profile</router-link>
      <a class="nav-link nav-no-right-border" @click="logout">log out</a>
      <a class="nav-link nav-no-right-border" id="toggle-icon" @click="toggleNav">&#9776;</a>
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
    toggleNav: function() {
      const navItems = document.querySelectorAll(".nav-link");
      navItems.forEach(navItem => 
        navItem.classList.toggle('responsive')
      );
    }
  }
});

Vue.component('admin-sidebar', {
  template:`
    <div id="admin-sidebar">
      <router-link to="/dashboard/articles" class="side-link">view posts</router-link>
      <router-link to="/dashboard/articles/new" class="side-link">new post</router-link>
      <router-link to="/dashboard/messages" class="side-link">messages</router-link>
    </div>
  `
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
      <div class="about-wrapper">
        <h2 class="center">{{ headerMsg }}</h2>
        <p>{{ message }}</p>
        <p>{{ message }}</p>
        <p>{{ message }}</p>
        <p>{{ message }}</p>
        <p>{{ message }}</p>
        <p>{{ message }}</p>
      </div>
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
          <input class="btn form-btn" type="submit" name="submit" v-on:click="$emit('submit')">
        </div>

      </form>
    </div>
  `,
});

Vue.component('client-articles-index', {
  props: ['posts'],
  template:`
    <div id="posts" class="content-wrapper">         
      <div class="post-wrapper" v-for="post in posts"> 
        <a v-bind:href="'/#/articles/' + post.id">
          <div class="inner-post-wrapper">
            <h2>{{ post.title }}</h2> 
            <p>Created on: {{ post.created_at }}</p>
          </div>
        </a>
      </div>
    </div>
  `
});

Vue.component('client-articles-show', {
  props: ['post'],
  template:`
    <div id="posts" class="content-wrapper">
      <router-link to="/articles"><div class="btn back-btn">Back to all articles</div></router-link>

      <div class="post-wrapper inner-post-wrapper"> 
        <h2> {{ post.title }} </h2> 
        <p>{{ post.created_at }}</p>
        <div v-html="post.content" class="post-content">{{ post.content }}</div>
      </div>
    </div>
  `
});

Vue.component('admin-articles-index', {
  props: ['posts'],
  template:`
    <div id="admin-posts" class="admin-form-wrapper">         
      <div class="post-wrapper" v-for="post in posts"> 
        <a v-bind:href="'/#/dashboard/articles/' + post.id">
          <div class="inner-post-wrapper">
            <h2>{{ post.title }}</h2> 
            <p>Created on: {{ post.created_at }}</p>
          </div>
        </a>
      </div>
    </div>
  `
});

Vue.component('admin-articles-show', {
  props: ['post'],
  template:`
    <div id="admin-show-post" class="admin-form-wrapper">
      <router-link to="/dashboard/articles"><div class="btn back-btn">Back to all articles</div></router-link>

      <div class="post-wrapper inner-post-wrapper"> 
        <h2> {{ post.title }} </h2> 
        <p>{{ post.created_at }}</p>
        <div v-html="post.content" class="post-content">{{ post.content }}</div>
      </div>

      <a v-bind:href="'/#/dashboard/articles/' + post.id + '/edit'"><div class="btn edit-btn">Edit</div></a>
      <a v-bind:href="'/#/dashboard/articles/' + post.id + '/delete'"><div class="btn delete-btn">Delete</div></a>
    </div>
  `
});

Vue.component('article-form', {
  props: ['post', 'formType'],
  template:`
    <div class="admin-form-wrapper">
      <a v-bind:href="'/#/dashboard/articles/' + post.id"><div class="btn back-btn">Back</div></a>
      <form class="admin-article-form" method="post" @submit.prevent>
        <div class="inputbox">
          <label for="title">Title: </label>
          <input id="title" type="text" name="title" v-model="post.title">
        </div>
        <div class="inputbox">
         <label for="content">Content: </label>
          <textarea rows="10" id="content" type="textarea" name="content" v-model="post.content"></textarea>
        </div>
        <div class="inputbox">
          <input class="btn edit-btn" type="submit" v-bind:value="formType" name="submit" v-on:click="$emit('submit')" >
        </div>
      </form>

      <div>
        <h3>Use the editor below to copy and paste.</h3>
        <textarea id='editor'>
        </textarea>
      </div>
      <button @click="replace()">Switch this box to advanced mode</button>
    </div>
  `,
  methods: {
    replace: function() {
      CKEDITOR.replace( 'editor' );
    }
  }
});

Vue.component('article-delete', {
  props: ['post'],
  template:`
    <div id="delete-page" class="admin-form-wrapper">
      <h2 class="center">Delete this post?</h2>
      <a v-bind:href="'/#/dashboard/articles/' + post.id"><div class="btn back-btn">Go Back</div></a>
      <a v-on:click="$emit('submit')"><div class="btn delete-btn">Delete</div></a>

      <div class="post-wrapper inner-post-wrapper"> 
        <h2> {{ post.title }} </h2> 
        <p>{{ post.created_at }}</p>
        <div v-html="post.content" class="post-content">{{ post.content }}</div>
      </div>
    </div>
  `,
});
      
Vue.component('alert-box', {
  props: ['errors'],
  template:`
      <div class="alert-box">
        <div class="alert alert-danger" v-for="error in errors">
          {{ error }} <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        </div>
      </div>
  `
}); 

Vue.component('message-index', {
  props: ['messages'],
  template:`
    <div id="messages" class="admin-form-wrapper">         
      <div class="post-wrapper" v-for="message in messages"> 
        <a v-bind:href="'/#/dashboard/messages/' + message.id">
          <div class="inner-post-wrapper">
            <p>From: {{ message.name }}</p> 
            <p>Email: {{ message.email }}</p> 
            <p>Written on: {{ message.created_at }}</p>
          </div>
        </a>
      </div>
    </div>
  `
});    

Vue.component('message-show', {
  props: ['message'],
  template:`
    <div id="message-show" class="admin-form-wrapper">
      <div class="message-wrapper post-wrapper inner-post-wrapper">       
        <p>From: {{ message.name }}</p>
        <p>Email: {{ message.email }}</p>
        <p>Written on: {{ message.created_at }}</p>
        <p>Message: {{ message.message }}</p>
      </div>
      <a v-bind:href="'/#/dashboard/messages/'"><div class="btn back-btn">Go Back</div></a>
      <a v-on:click="$emit('handleDelete')"><div class="btn delete-btn">Delete</div></a> 
    </div>
  `
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
    </div>
  `,
  data: function() {
    return {
      page: 'home'
    }; 
  }
};

let TheAboutPage = {
  template:`
    <div id="vue-home-main">
      <client-navbar v-bind:page='page'></client-navbar>
      <about-section></about-section>
    </div>
  `,
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
    </div>
  `,
  data: function() {
    return {
      page: 'contact',
      messages: {}
    }; 
  },
  methods: {
    submit: function() {  
      let params = {
        name: this.messages.name || '',
        email: this.messages.email || '',
        message: this.messages.message || ''
      };
      if (params.name !== '' && params.email !== '' && params.message !== '') {
        axios
          .post('/api/v1/messages/', params)
          .then(function(response) {
            alert('Your message was sent');
            location.reload(true);
          });
      } else {
        alert('You must fill in a name, email and message if you want to sent a message!');
      }
    }
  }
};

let TheArticlesIndexPage = {
  template:`
    <div id="vue-home-main">
      <client-navbar v-bind:page='page'></client-navbar>
      <alert-box v-bind:errors="errors"></alert-box>
      <client-articles-index v-bind:posts="posts"></client-articles-index>
    </div>
  `,
  data: function() {
    return {
      page: 'articles',
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

let TheArticlesShowPage = {
  template:`
    <div id="vue-home-main">
      <client-navbar v-bind:page='page'></client-navbar>
      <alert-box v-bind:errors="errors"></alert-box>
      <client-articles-show v-bind:post="post"></client-articles-show>
    </div>
  `,
  data: function() {
    return {
      page: 'articles',
      post: {},
      errors: [],
      articleId: this.$route.params.id
    }; 
  },
  created: function() {
    axios
      .get('/api/v1/posts/' + this.articleId)
      .then(function(response) {
        this.post = response.data;
      }.bind(this))
      .catch(function(error) {
        this.errors = ['There seems to be a problem with the server right now.  Try again later'];
      }.bind(this));
  }
};

let LoginPage = {
  template:`
    <div id="vue-login-main">  
      <div id="login">
        <alert-box v-bind:errors="errors"></alert-box>
        <div id="login-form">
          <h1>LOGIN</h1>
          <div class="login-box">
            <label for="email">Email:</label>
            <input id="email" required type="email" class="form-control" v-model="email">
          </div>
          <div class="login-box">
            <label for="password">Password:</label>
            <input id="password" type="password" class="form-control" v-model="password">
          </div>
          <div class="login-box">
            <input id="login-btn" class="btn form-btn" type="submit" @click="submit()" name="Submit">
          </div>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      let params = {
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
              localStorage.setItem("userId", response.data.uid);
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

let DashboardPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar>
      <div class="admin-wrapper">
        <div class="admin-welcome-message">
          <h2 class="center">Welcome Andrew</h2>
          <h2 class="center">You are going to have an awesome day</h2>
        </div>
      </div>
    </div>
  `
};

let AdminPostIndexPage = {
  template: 
    `<div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 
        <alert-box v-bind:errors="errors"></alert-box>
        <admin-articles-index v-bind:posts="posts"></admin-articles-index>
      </div>
    </div>
  `,
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

let AdminPostShowPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 
        <alert-box v-bind:errors="errors"></alert-box>
        <admin-articles-show v-bind:post="post"></admin-articles-show>
      </div>
    </div>
  `,
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

let AdminPostEditPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 
        <alert-box v-bind:errors="errors"></alert-box>
        <article-form v-bind:post='post' v-bind:formType='formType' v-on:submit="submit" ></article-form>
      </div>
    </div>
  `,
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
      let params = {
        title: this.post.title,
        content: this.post.content
      };
      let route = "/dashboard/articles/" + this.postId;
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

let AdminPostDeletePage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 
        <alert-box v-bind:errors="errors"></alert-box>
        <article-delete v-bind:post='post' v-on:submit="submit" ></article-delete>
      </div>
    </div>
  `,
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
          router.push("/dashboard/articles");
        }.bind(this))
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

let AdminPostNewPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 
        <alert-box v-bind:errors="errors"></alert-box>
        <article-form v-bind:post='post' v-bind:formType='formType' v-on:submit="submit" ></article-form>
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
      let params = {
        title: this.post.title || '',
        content: this.post.content || ''
      };

      axios
        .post('/api/v1/posts/', params)
        .then(function(response) {
          router.push('/dashboard/articles/' + response.data.id );
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

let AdminMessagesIndexPage = {
  template: 
    `<div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 
        <alert-box v-bind:errors="errors"></alert-box>
        <message-index v-bind:messages="messages"></message-index>
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

let AdminMessageShowPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <div class="admin-wrapper"> 
        <alert-box v-bind:errors="errors"></alert-box>
        <message-show v-bind:message="message" v-on:handleDelete="handleDelete"></message-show>
      </div>
    </div>
  `,
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

let UserShowPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <alert-box v-bind:errors="errors"></alert-box>
      <div class="admin-wrapper"> 
        <div class="admin-form-wrapper"> 
          <h2>Name: {{ message.name }}</h2>
          <p>Email: {{ message.email }}</p>
          <a v-bind:href="'/#/dashboard/users/edit'"><div class="btn edit-btn">Edit</div></a>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      message: {},
      errors: [],
      messageId: this.$route.params.id
    };
  },
  created: function() {
    let userId = localStorage.getItem("userId");
    axios
      .get('/users/' + userId)
      .then(function(response) {
        this.message = response.data;
      }.bind(this))
      .catch(function(error) {
        this.errors = ["Something seems to be wrong with the server!"];
      }.bind(this));
  },
  methods: {
  }
};

let UserEditPage = {
  template:`
    <div id="vue-admin-main">
      <admin-navbar></admin-navbar>
      <admin-sidebar></admin-sidebar> 
      <alert-box v-bind:errors="errors"></alert-box>
      <div class="admin-wrapper"> 

        <div class="admin-form-wrapper">
          <a v-bind:href="'/#/dashboard/users/'"><div class="btn back-btn">Back</div></a>
          
          <form method="post" class="admin-article-form" @submit.prevent>
            <div class="inputbox">
              <label for="name">Name: </label>
              <input id="name" type="text" name="name" v-model="user.name">
            </div>
            <div class="inputbox">
              <label for="email">Email: </label>
              <input id="email" type="textarea" name="email" v-model="user.email"></input>
            </div>
            <div class="inputbox">
              <label for="password">Password: </label>
              <input id="password" type="password" name="password" v-model="user.password"></input>
            </div>
            <div class="inputbox">
              <label for="password_confirmation">Confirm Password: </label>
              <input id="password_confirmation" type="password" name="passwordConfirmation" v-model="user.passwordConfirmation"></input>
            </div>
            <div class="inputbox">
              <input class="btn edit-btn" type="submit" name="submit" v-on:click=submit() >
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  data: function() {
    return {
      user: {},
      errors: [],
      userId: "",
      postId: this.$route.params.id,
    };
  },
  created: function() {
    this.userId = localStorage.getItem("userId");
    console.log(this.userId);
    axios
      .get('/users/' + userId)
      .then(function(response) {
        this.user = response.data;
      }.bind(this))
      .catch(function(error) {
        this.errors = error.response.data.errors;
      }.bind(this));
  },
  methods: {
    submit: function() {
      let params = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        password_confirmation: this.user.passwordConfirmation,
      };
      let route = "/dashboard/users";
      axios
        .patch('/users/' + this.userId, params)
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

let router = new VueRouter({
  routes: [ 
    { path: "/", component: TheHomePage },
    { path: "/about", component: TheAboutPage },
    { path: "/contact", component: TheContactPage },
    { path: "/articles", component: TheArticlesIndexPage },
    { path: "/articles/:id", component: TheArticlesShowPage },
    { path: "/login", component: LoginPage },
    { path: "/dashboard", component: DashboardPage },
    { path: "/dashboard/articles", component: AdminPostIndexPage },
    { path: "/dashboard/articles/new", component: AdminPostNewPage },
    { path: "/dashboard/articles/:id", component: AdminPostShowPage },
    { path: "/dashboard/articles/:id/edit", component: AdminPostEditPage },
    { path: "/dashboard/articles/:id/delete", component: AdminPostDeletePage },
    { path: "/dashboard/messages", component: AdminMessagesIndexPage },
    { path: "/dashboard/messages/:id", component: AdminMessageShowPage },
    { path: "/dashboard/users/", component: UserShowPage },
    { path: "/dashboard/users/edit", component: UserEditPage },

  ], 
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

let app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    let jwt = localStorage.getItem("jwt");
    console.log('jwt');
    console.log(jwt);
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }
});