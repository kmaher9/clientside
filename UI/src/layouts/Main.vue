<template>
  <div>
    <v-toolbar color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="$vuetify.breakpoint.xs"></v-app-bar-nav-icon>
      <v-toolbar-title to="/dashboard"><router-link to="/dashboard"><img src="/assets/logo-light.png" alt="IT Group logo" style="width: 60%" class="mt-1"></router-link></v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon><v-icon>refresh</v-icon></v-btn>
        <v-btn text to="/clients">clients</v-btn>
        <v-btn text to="/companies">companies</v-btn>
        <v-btn text>internal</v-btn>
        <v-btn icon to="/settings"><v-icon>settings</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute right temporary>
      <v-list nav dense> 
        <v-list-item-group v-model="group" active-class="primary--text text--accent-4">
          <v-list-item to="/clients">
            <v-list-item-title>Clients</v-list-item-title>
          </v-list-item>
          <v-list-item to="/companies">
            <v-list-item-title>Companies</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Internal</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Refresh</v-list-item-title>
          </v-list-item>
          <v-list-item to="/settings">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
      <v-snackbar top="top" v-model="snackbar" :multi-line="true" :color="snackbarColor" class="mt-10">
        {{ snackbarMessage }}
        <v-btn color="white" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
      <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
      <router-view @alert="alert" @loading="loadingState"/>
  </div>
</template>

<script>
export default {
    data: () => ({
      drawer: false,
      group: null,
      snackbarMessage: '',
      snackbarColor: '',
      snackbar: false,
      loading: false
    }),
    methods: {
      alert (color, msg) {
        this.snackbar = true
        this.snackbarColor = color
        this.snackbarMessage = msg
      },
      loadingState (state) {
        this.loading = state
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    }
}
</script>

<style lang="css">
  a {
    text-decoration: none;
  }
</style>