<template>
  <div>
    <v-layout row wrap class="mb-10">
      <v-flex sm10 offset-sm1 md4 offset-md1 class="mt-10">
        <v-flex xs12>
          <Profile :client="client" @alert="alert" @loading="loadingState" @refresh="refresh"/>
        </v-flex>
        <v-flex md10 offset-md1 xs12 class="mt-10">
          <Feed :client="client" :comments="comments" @alert="alert" @loading="loadingState"/>
        </v-flex>
      </v-flex>
      <v-flex sm10 offset-sm1 md5 offset-md1>
        <v-flex xs12 class="mt-10 mb-10">
          <Notes @alert="alert" @loading="loadingState" :id="id" :notes="notes" @refresh="refresh"/>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
/* eslint-disable */
import Profile from '../../components/client/Profile'
import Feed from '../../components/client/Feed'
import Notes from '../../components/client/Notes'

export default {
  components: { Profile, Feed, Notes },
  data: () => ({
    client: {},
    comments: [],
    notes: [],
    id: ''
  }),
  methods: {
    getClient () {
      this.$emit('loading', true)
      axios.get('http://localhost:5151/api/client/profile/'+this.$route.params.id)
      .then(res => {
        this.$emit('loading', false)
        this.client = res.data
      }).catch(err => {
        this.$emit('loading', false)
        this.$emit('alert', 'error', 'unable to retrieve client')
      })
    },
    getFeed () {
      this.$emit('loading', true)
      axios.get('http://localhost:5151/api/client/feed/'+this.$route.params.id)
      .then(res => {
        this.$emit('loading', false)
        this.comments = res.data
        for (let i=0;i<this.comments.length;i++)
          this.comments[i].createdAt = new Date(this.comments[i].createdAt).toDateString() + ' at ' + new Date(this.comments[i].createdAt).toLocaleTimeString()
      }).catch(err => {
        this.$emit('loading', false)
        this.$emit('alert', 'error', 'unable to retrieve feed')
      })
    },
    getNotes () {
      this.$emit('loading', true)
      axios.get('http://localhost:5151/api/client/notes/'+this.$route.params.id)
      .then(res => {
        console.log(res)
        this.$emit('loading', false)
        this.notes = res.data
        for (let i=0;i<this.notes.length;i++)
          this.notes[i].createdAt = new Date(this.notes[i].createdAt).toDateString() + ' at ' + new Date(this.notes[i].createdAt).toLocaleTimeString()
      }).catch(err => {
        this.$emit('loading', false)
        this.$emit('alert', 'error', 'unable to retrieve notes')
      })
    },
    getUser () {
      this.$emit('loading', true)
      axios.get('http://localhost:5151/api/user/profile/')
      .then(res => {
        this.$emit('loading', false)
        this.id = res.data._id
      }).catch(err => {
        this.$emit('loading', false)
        this.$emit('alert', 'error', 'unable to retrieve profile')
      })
    },
    refresh () { this.getClient(); this.getFeed(); this.getNotes() },
    alert (color, msg) { this.$emit('alert', color, msg) },
    loadingState (state) { this.$emit('loading', state) },
  },
  mounted () {
    this.getUser()
    this.refresh()
  }
}
</script>