<template>
  <div>
    <v-card>
      <v-card-title>Update your password</v-card-title>
      <v-card-text class="mt-4">
        <v-form @submit.prevent="update">
          <v-row>
            <v-flex xs10 offset-xs1>
              <v-text-field
                v-model="password"
                label="New password"
                type="password">
              </v-text-field>
            </v-flex>
          </v-row>
          <v-row>
            <v-flex xs12 align="center" style="text-align: center">
              <v-btn type="submit" rounded color="secondary" :disabled="!password">update</v-btn>
            </v-flex>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  props: [ 'id' ],
  data: () => ({
    password: ''
  }),
  methods: {
    update () {
      if (this.password) {
        this.$emit('loading', true)
        axios.put('http://localhost:5151/api/user/update/'+this.id, { password: this.password })
        .then(res => {
          this.password = ''
          this.$emit('loading', false)
          this.$emit('alert', 'success', 'Your password has been updated')
        }).catch(err => {
          this.$emit('loading', false)
          this.$emit('alert', 'error', 'Unable to update your password. Please retry')
        })
      }
    }
  }
}
</script>