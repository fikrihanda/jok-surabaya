<template>
  <li class="sidebar-menu-list">
    <nuxt-link :to="menu.to" :class="['sidebar-menu-link', active && 'active']">
      <fa-layer class="fa-fw">
        <fa :icon="menu.icon" />
      </fa-layer>
      {{menu.name}}
    </nuxt-link>
  </li>
</template>

<script>
  export default {
    props: ['menu'],
    computed: {
      active() {
        let {fullPath} = this.$route
        if (this.menu.to === '/' && fullPath === '/') return true
        else if (this.menu.to !== '/') {
          return fullPath.startsWith(this.menu.to)
        }
      }
    }
  }
</script>
