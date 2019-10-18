<template>
  <div>
    <v-card style="min-height: 30em;">
      <v-subheader>Profile Details</v-subheader>
      <v-card-text class="mt-4">
        <v-form @submit.prevent="update">
          <v-row>
            <v-flex xs10 offset-xs1>
              <v-text-field
                v-model="client.email"
                label="Email Address"
                :readonly="isLocked">
              </v-text-field>
            </v-flex>
          </v-row>
          <v-row>
            <v-flex xs10 offset-xs1>
              <v-text-field
                v-model="client.name"
                label="Full Name"
                :readonly="isLocked">
              </v-text-field>
            </v-flex>
          </v-row>
          <v-row>
            <v-flex xs10 offset-xs1 sm6 offset-sm1>
              <v-text-field
                v-model="client.title"
                label="Title"
                :readonly="isLocked">
              </v-text-field>
            </v-flex>
            <v-flex xs10 offset-xs1 sm3>
              <v-text-field
                v-model="client.phone"
                label="Phone"
                :readonly="isLocked">
              </v-text-field>
            </v-flex>
          </v-row>
          <v-row>
            <v-flex xs10 offset-xs1 sm6 offset-sm1>
              <v-select
                :items="companies"
                item-text="name"
                v-model="client.company"
                label="Company"
                :readonly="isLocked">
              </v-select>
            </v-flex>
            <v-flex xs10 offset-xs1 sm3>
              <v-select
                :items="statuses"
                v-model="client.status"
                label="Status"
                :readonly="isLocked">
              </v-select>
            </v-flex>
          </v-row>
          <v-row>
            <v-flex xs12 align="center" style="text-align: center">
              <v-btn absolute dark fab top right color="secondary" @click="isLocked = !isLocked">
                <v-icon v-if="isLocked">mdi-lock</v-icon>
                <v-icon v-else>mdi-lock-open</v-icon>
              </v-btn>
              <v-btn v-if="!isLocked" text color="error" @click="remove">remove</v-btn>
              <v-btn v-if="!isLocked" type="submit" rounded color="secondary" :disabled="!client" class="ml-10">update</v-btn>
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
  props: [ 'client', 'height' ],
  data: () => ({
    isLocked: true,
    statuses: [ 'Uncontacted', 'Regular', 'Approached', 'Rejected' ],
    companies: []
  }),
  methods: {
    update () {
      if (this.client.email) {
        this.$emit('loading', true)
        axios.put('http://localhost:5151/api/client/update/'+this.client._id, this.client)
        .then(res => {
          this.$emit('loading', false)
          this.isLocked = true
          this.$emit('alert', 'success', 'Client information has been updated')
          this.$emit('refresh')
        }).catch(err => {
          this.$emit('loading', false)
          this.$emit('alert', 'error', 'Unable to update client information. Please retry')
        })
      }
    },
    remove () {
      this.$emit('loading', true)
      axios.delete('http://localhost:5151/api/client/profile/'+this.$route.params.id)
      .then(res => {
        this.$emit('loading', false)
        this.$emit('alert', 'success', 'Client removed')
        this.$router.push('/clients')
      }).catch(err => {
        this.$emit('loading', false)
        this.$emit('alert', 'error', 'Unable to remove client')
      })
    },
    getCompanies () {
      this.$emit('loading', true)
      axios.get('http://localhost:5151/api/client/companies')
      .then(res => {
        this.$emit('loading', false)
        this.companies = res.data
      }).catch(err => {
        this.$emit('loading', false)
        this.$emit('alert', 'error', 'unable to retrieve companies')
      })
    }
  },
  mounted () {
    this.getCompanies()
  }
}
</script>