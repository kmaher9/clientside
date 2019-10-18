<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm8 offset-sm2 mt-10>
        <Update :profile="profile" @alert="alert" @loading="loadingState"/>
      </v-flex>
      <v-flex xs10 sm6 offset-sm3 offset-xs1 mt-10>
        <Password @alert="alert" @loading="loadingState" :id="profile._id"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
/* eslint-disable */
import Update from '../../components/settings/UpdateProfile'
import Password from '../../components/settings/UpdatePassword'
import axios from 'axios'

export default {
  components: { Update, Password },
  data: () => ({
    profile: ''
  }),
  methods: {
    alert (color, msg) { this.$emit('alert', color, msg) },
    loadingState (state) { this.$emit('loading', state) },
    getProfile () {
      axios.get('http://localhost:5151/api/user/profile')
      .then(res => {
        this.profile = res.data
      }).catch(err => {
        this.$emit('alert', 'error', 'Unable to get your profile')
      })
    }
  },
  beforeMount () {
    this.getProfile()
  }
}
</script>