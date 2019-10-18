<template>
  <div>
    <v-card class="pa-5">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details/>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="clients"
        multi-sort
        :search="search">
        <template v-slot:item.name="{ item }">
          <router-link :to='"/client/"+item._id' style="color: black; text-decoration: none;">{{ item.name }}</router-link>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: [ 'clients' ],
  data: () => ({
    search: '',
    headers: [
      { text: 'Name',  value: 'name', sortable: true },
      { text: 'Status', value: 'status', sortable: true },
      { text: 'Company', value: 'company', sortable: true },
      { text: 'Title', value: 'title', sortable: true },
      { text: 'Email', value: 'email', sortable: true },
      { text: 'Liason', value: 'contactName', sortable: true }
    ]
  }),
  methods: {
    getColor (status) {
      if (status === 'Uncontacted')
        return 'default'
      else if (status === 'Regular')
        return 'success'
      else if (status === 'Approached')
        return 'warning'
      else if (status === 'Rejected')
        return 'error'
    }
  }
}
</script>