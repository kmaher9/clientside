<template>
  <v-row justify="center">
    <v-dialog v-model="showNew" persistent max-width="500px">
      <v-form @submit.prevent="createClient">
        <v-card>
          <v-card-title>Information for new client</v-card-title>
          <v-card-text>
            <v-row>
              <v-flex xs10 offset-xs1>
                <v-text-field
                  v-model="client.email"
                  label="Email Address">
                </v-text-field>
              </v-flex>
            </v-row>
            <v-row>
              <v-flex xs10 offset-xs1>
                <v-text-field
                  v-model="client.name"
                  label="Name">
                </v-text-field>
              </v-flex>
            </v-row>
            <v-row>
              <v-flex xs5 offset-xs1>
                <v-text-field
                  v-model="client.title"
                  label="Title">
                </v-text-field>
              </v-flex>
              <v-flex xs4 offset-xs1>
                <v-text-field
                  v-model="client.phone"
                  label="Phone">
                </v-text-field>
              </v-flex>
            </v-row>
            <v-row>
              <v-flex xs10 offset-xs1>
                <v-select
                  :items="companies"
                  label="Company"
                  v-model="client.company"
                ></v-select>
              </v-flex>
            </v-row>
            <v-alert border="left" color="red lighten-2" dark v-if="error">
              Unable to create client.
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-btn color="danger" text @click="closeDialog">Cancel</v-btn>
            <div class="flex-grow-1"></div>
            <v-btn color="secondary" type="submit">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  props: [ 'showNew' ],
  data: () => ({
    client: {},
    companies: [],
    error: false
  }),
  methods: {
    closeDialog () {
      this.$emit('closeDialog', true)
    },
    createClient () {
      this.$emit('loading', true)
      axios.post('http://localhost:5151/api/client/create', this.client)
      .then(res => {
        this.$emit('loading', false)
        this.$emit('closeDialog')
        this.client = {}
        this.$emit('alert', 'success', 'New client created')
        this.$emit('reloadClients')
      }).catch(err => {
        this.$emit('loading', false)
        this.error = true
      })
    },
    getCompanies () {
      this.$emit('loading', true)
      axios.get('http://localhost:5151/api/client/companies')
      .then(res => {
        this.$emit('loading', false)
        res.data.forEach(company => {
          this.companies.push(company.name)
        });
      }).catch(err => {
        this.$emit('loading', false)
        this.$emit('alert', 'error', 'Unable to load companies')
      })
    }
  },
  beforeMount() {
    this.companies = new Array()
    this.getCompanies() 
  }
}
</script>