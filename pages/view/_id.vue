<template>
  <div id="wrap">
    <div class="container">
      <h3 class="tit_cont">{{content.tit}}</h3>
      <div class="wrap_cont" v-html="content.cont"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { async } from 'q'

export default {
  asyncData({ params, query }) {
    console.log(query)
    return axios.get(`/view/${query.id}`).then(res => {
      console.log(res.data)
      return { content: res.data }
    })
  },

  data() {
    return {}
  }
}
</script>
