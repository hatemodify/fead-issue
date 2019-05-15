<template>
  <ul class="list_reply" v-if="replyData">
    <li v-for="item in replyData" :key="item.id">
      <span class="txt_name">{{item.name}}</span>
      <span class="txt_date">{{ item.regdate}}</span>
      <div class="txt_cont">{{item.content}}</div>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: ['replyData']
}
</script>
