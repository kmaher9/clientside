<template>
  <div>
    <v-card>
      <v-subheader>Activity Feed</v-subheader>
      <v-divider/>
      <v-card-text style="min-height: 35em; max-height: 35em; overflow: hidden; overflow-y: scroll;" v-chat-scroll>
        <v-layout row wrap v-for="comment in comments" :key="comment._id">
          <v-flex xs12 class="ml-5 mt-1">
            <p class="font-weight-light ml-2">{{ comment.createdAt }}</p>
            <p style="display: inline-block; color: black;" class="ml-2">{{ comment.createdByName }} {{ comment.action }}.</p>
            <v-divider class="mt-2"/>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  props: [ 'client', 'comments' ],
  data: () => ({
    
  }),
  methods: {

  },
  mounted () {
    
  } 
}
</script>