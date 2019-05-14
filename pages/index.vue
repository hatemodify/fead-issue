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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
