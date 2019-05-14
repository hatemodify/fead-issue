<template>
  <div id="wrap">
    <section class="container">
      <ul class="list_cont">
        <list :content="item" v-for="item in data" :key="item.id"/>
      </ul>
    </section>
  </div>
</template>

<script>
import { List } from '@/components'
import { async } from 'q'
import axios from 'axios'
export default {
  asyncData() {
    return axios.get(`/list`).then(res => {
      console.log(res.data)
      return { data: res.data }
    })
  },
  components: {
    List
  },
  data() {
    return {}
  }
}
</script>
