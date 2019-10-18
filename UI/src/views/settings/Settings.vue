<template>
  <v-tabs fixed-tabs dark background-color="primary">
      <v-tab>Settings</v-tab>
      <v-tab>Profile</v-tab>
      <v-tab-item></v-tab-item>
      <v-tab-item><v-container><Profile @alert="alert" @loading="loadingState"/></v-container></v-tab-item>
  </v-tabs>
</template>

<script>
/* eslint-disable */
import Profile from './Profile'

export default {
  components: { Profile },
  data: () => ({
    
  }),
  methods: {
    alert (color, msg) { this.$emit('alert', color, msg) },
    loadingState (state) { this.$emit('loading', state) }
  }
}
</script>