<template>
  <div>
    <v-card style="min-height: 45em;" elevation="10">
      <v-subheader>Notes</v-subheader>
      <v-divider/>
      <v-card-text style="min-height: 45em; max-height: 45em; overflow-y: scroll;" v-chat-scroll>
        <v-layout row wrap v-for="note in notes" :key="note.note._id">
          <v-flex xs12 class="ml-5 mt-1">
            <span><p class="font-weight-light" style="display: inline-block;">on {{ note.note.createdAt }}, {{ note.note.createdByName }} wrote...</p>
            <v-btn style="display: inline; block; float: right;" text small v-if="note.note.createdByID === id" @click="removeID = note.note._id; removeDialog = true">
              <v-icon>mdi-delete</v-icon>
            </v-btn></span><br>
            <v-avatar color="indigo" size="40" style="display: inline-block;">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
            <p style="display: inline-block; color: black;" class="ml-4">{{ note.note.note }}</p>
            <v-divider class="mt-3"/>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-form @submit.prevent="create">
        <v-layout row wrap class="ml-2 mr-2 mt-3">
          <v-flex xs12>
            <v-subheader><v-file-input name="attachment" v-model="attachment" label="Add an Attachment (only one right now)..."></v-file-input></v-subheader>
            <v-textarea 
              placeholder="Enter a new note here" 
              style="vertical-align: middle;" 
              rows="2" 
              append-outer-icon="mdi-send"
              outlined filled rounded auto-grow 
              class="ml-2 mr-2" 
              background-color="white"
              v-model="note"
              @click:append-outer="create()">
            </v-textarea>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="removeDialog" persistent max-width="310">
        <v-card class="pt-10">
          <v-card-text>Would you like to remove your comment?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="removeID = ''; removeDialog = false;">Disagree</v-btn>
            <v-btn color="default" text @click="remove()">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  props: [ 'id', 'notes' ],
  data: () => ({
    note: '',
    removeID: '',
    removeDialog: false,
    attachment: []
  }),
  methods: {
    create () {
      if (this.note) {
        this.$emit('loading', true)
        axios.post('http://localhost:5151/api/client/create/note', { note: this.note, attachedTo: this.$route.params.id})
        .then(res => {
          this.note = ''
          if (this.attachment[0]) {
            let form = new FormData ()
            form.append('attachment', this.attachment)
            axios.post('http://localhost:5151/api/general/upload/'+res.data._id, form)
            .then(res => {
              this.attachment = new Array
              this.$emit('loading', false)
              this.$emit('alert', 'success', 'New note added')
              this.$emit('refresh')
            }).catch(err => {
              this.$emit('loading', false)
              this.$emit('alert', 'error', 'Unable to add note')
            })
          } else {
            this.$emit('loading', false)
            this.$emit('alert', 'success', 'New note added')
            this.$emit('refresh')
          }
        }).catch(err => {
          this.$emit('loading', false)
          this.$emit('alert', 'error', 'Unable to add note')
        })
      }
    },
    remove () {
      this.$emit('loading', true)
      axios.delete('http://localhost:5151/api/client/note/'+this.removeID)
      .then(res => {
        this.$emit('loading', false)
        this.$emit('alert', 'success', 'Note removed')
        this.$emit('refresh')
        this.removeDialog = false
      }).catch(err => {
        this.$emit('loading', false)
        this.$emit('alert', 'error', 'Unable to remove note')
      })
    }
  },
  mounted () {

  }
}
</script>