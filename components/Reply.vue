<template>
  <div class="form_reply">
    <input type="hidden">
    <input type="text" placeholder="이름" id="inpName" v-model="replyData.name">
    <input
      type="password"
      placeholder="비밀번호"
      id="inpPassword"
      v-model="replyData.password"
      autocomplete
    >
    <textarea name="content" placeholder="내용" id="inpCont" v-model="replyData.content"></textarea>
    <button type="submit" class="btn_save" @click="writeReply">등록</button>
  </div>
</template>



<script>
import axios from 'axios'
import Vue from 'vue'
export default {
  data() {
    return {
      replyData: {
        name: '',
        password: '',
        content: ''
      }
    }
  },

  props: {
    id: {
      type: String
    }
  },
  methods: {
    writeReply() {
      axios
        .post(`/writeReply/${this.id}`, this.replyData)
        .then(res => {
          this.$router.go(this.$router.currentRoute)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
