<template>
  <li class="sidebar-subsmenu-list">
    <nuxt-link :to="subsmenu.to" class="sidebar-subsmenu-link">
      {{subsmenu.name}}
    </nuxt-link>
  </li>
</template>

<script>
  export default {
    props: ['subsmenu']
  }
</script>
