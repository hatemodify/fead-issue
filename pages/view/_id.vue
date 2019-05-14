<template>
  <div id="wrap">
    <div class="container">
      <h3 class="tit_cont">{{content.tit}}</h3>
      <div class="wrap_cont" v-html="content.cont"/>
      <write-reply :id="$data._idx"/>
      <reply-list :replyData="content.reply"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { async } from 'q'
import { WriteReply, ReplyList } from '@/components'

export default {
  asyncData({ params, query }) {
    return axios.get(`/view/${query.id}`).then(res => {
      console.log(res.data)
      return { content: res.data, _idx: query.id }
    })
  },

  data() {
    return {}
  },
  components: {
    WriteReply,
    ReplyList
  }
}
</script>
