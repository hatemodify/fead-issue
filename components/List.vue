<template>
  <li>
    <nuxt-link :to="`/view/?id=${content._id}`" class="link_cont">
      {{content.tit}}
      <span class="txt_date">{{content.createdAt}}</span>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['content']
}
</script>
