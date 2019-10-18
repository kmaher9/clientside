<template>
  <div>
    <v-card>
      <v-card-title>Your profile information</v-card-title>
      <v-card-text class="mt-4">
        <v-form @submit.prevent="update">
          <v-row>
            <v-flex xs10 offset-xs1>
              <v-text-field
                v-model="profile.email"
                label="Email Address">
              </v-text-field>
            </v-flex>
          </v-row>
          <v-row>
            <v-flex xs10 offset-xs1 sm4 offset-sm1>
              <v-text-field
                v-model="profile.firstName"
                label="First Name">
              </v-text-field>
            </v-flex>
            <v-flex xs10 offset-xs1 sm5 offset-sm1>
              <v-text-field
                v-model="profile.lastName"
                label="Last Name">
              </v-text-field>
            </v-flex>
          </v-row>
          <v-row>
            <v-flex xs10 offset-xs1 sm4 offset-sm1>
              <v-text-field
                v-model="profile.title"
                label="Title">
              </v-text-field>
            </v-flex>
            <v-flex xs10 offset-xs1 sm5>
              <v-text-field
                v-model="profile.phone"
                label="Phone">
              </v-text-field>
            </v-flex>
          </v-row>
          <v-row>
            <v-flex xs12 align="center" style="text-align: center">
              <v-btn type="submit" rounded color="secondary" :disabled="!profile">update</v-btn>
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
  props: ['profile'],
  data: () => ({

  }),
  methods: {
    update () {
      if (this.profile.email) {
        this.$emit('loading', true)
        axios.put('http://localhost:5151/api/user/update/'+this.profile._id, this.profile)
        .then(res => {
          this.$emit('loading', false)
          this.$emit('alert', 'success', 'Your profile information has been updated')
        }).catch(err => {
          this.$emit('loading', false)
          this.$emit('alert', 'error', 'Unable to update your profile information. Please retry')
        })
      }
    }
  }
}
</script>