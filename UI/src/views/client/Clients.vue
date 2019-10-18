<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 class="mt-10 text-center">
        <v-btn rounded color="secondary" dark @click="showNew = true">Add a New Client</v-btn>
        <New :showNew="showNew" @closeDialog="closeDialog" @alert="alert" @reloadClients="getClients"/>
      </v-flex>
      <v-flex xs12 mt-10>
        <Table @alert="alert" @loading="loadingState" :clients="clients"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
/* eslint-disable */
import Table from '../../components/client/ViewAll.vue'
import New from '../../components/client/New.vue'

export default {
  components: { Table, New },
  data: () => ({
    clients: [],
    showNew: false
  }),
  methods: {
    alert (color, msg) { this.$emit('alert', color, msg) },
    loadingState (state) { this.$emit('loading', state) },
    getClients () {
      this.$emit('loading', true)
      axios.get('http://localhost:5151/api/client/profiles')
      .then(res => {
        this.$emit('loading', false)
        this.clients = res.data
      }).catch(err => {
        this.$emit('loading', false)
        this.$emit('alert', 'error', 'Unable to load clients')
      })
    },
    closeDialog () {
      this.showNew = false
    }
  },
  mounted () {
    this.getClients()
  }
}
</script>