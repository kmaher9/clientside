<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid id="container">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-row align="center" justify="center" class="mb-10">
                <img src="/assets/logo.png" alt="blackrockx logo" class="mt-5">
              </v-row>
              <v-form @submit.prevent="login">
                <v-card-text>
                    <v-text-field
                      label="Username"
                      type="text"
                      v-model="username"/>
                    <v-text-field
                      label="Password"
                      type="password"
                      v-model="password"/>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" type="submit" :disabled="loading">Login</v-btn>
                </v-card-actions>
                <v-col xs="10">
                  <v-alert border="left" color="red lighten-2" dark v-if="loginError">
                    Unable to log in. Check credentials and try again
                  </v-alert>
                </v-col>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  /* eslint-disable */
  import axios from 'axios'

  export default {
    data: () => ({
      loading: false,
      loginError: false,
      username: '',
      password: ''
    }),
    methods: {
      login () {
        this.loading = true
        this.loginError = false
        axios.post('http://localhost:5151/api/user/login', {
          email: this.username,
          password: this.password
        }).then(res => {
          this.loading = false
          localStorage.setItem('token', res.data)
          this.$router.go()
          this.$router.push({ name: 'dashboard' })
        }).catch(err => {
          this.loading = false
          this.password = ''
          this.loginError = true
        })
      }
    },
    beforeCreate () {
      if (window.localStorage.getItem('token')) {
        this.$router.push({ name: 'dashboard' })
      }
        
    }
  }
</script>

<style lang="css">
  #container {
    background-image: url('/assets/background.jpg');
    background-size:auto;
  }
</style>