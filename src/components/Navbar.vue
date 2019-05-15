<template>
  <div class="navbar">
    <!-- <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{name: 'LogIn'}">
          <span class="nav-title">Mine Plod</span>
        </router-link>
        <ul class="right user">
          <li><router-link :to="{ name: 'SignUp' }">Signup</router-link></li>
          <li><router-link :to="{ name: 'LogIn' }">Login</router-link></li>
          <li><a @click="logout">Logout</a></li>
        </ul>
      </div>
    </nav> -->
     <nav class=" indigo darken-2">
     <div class="nav-wrapper ">

       <router-link :to="{name: 'LogIn'}">
          
          <span class="brand-logo">Mine Plod</span>
        </router-link>
      
      <ul id="nav-mobile" class="right hide-on-med-and-down ">
        <li><router-link :to="{ name: 'SignUp' }">Signup</router-link></li>
        <li><router-link :to="{ name: 'LogIn' }">Login</router-link></li>
        <li><a @click="logout">Logout</a></li>
      </ul>
    </div>
   </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Navbar',
  data(){
    return {

    }
  },
  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'LogIn' })
      })
    }
  }
}
</script>

<style>
.navbar nav{
  padding: 0 20px;
}
.navbar .user{
  margin-top:20px;
}
</style>
