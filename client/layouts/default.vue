<template>
  <fragment>
    <div :class="['home', toggled && 'toggled']">
      <nav-header @on-toggled="onToggled"/>
      <div class="home-container">
        <nav-sidebar/>
        <div class="home-content" ref="content">
          <div class="container-fluid" style="padding-top: 0.1px">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
    <notif/>
  </fragment>
</template>

<script>
  import Notif from '@/components/common/notif'
  import NavHeader from '@/components/common/nav-header'
  import NavSidebar from '@/components/common/nav-sidebar'

  export default {
    components: {
      Notif,
      NavHeader,
      NavSidebar
    },
    data() {
      return {
        toggled: false
      }
    },
    methods: {
      onToggled() {
        this.toggled = !this.toggled
      },
      windowClick(e) {
        let winWidth = $(window).width()
        if (this.$refs.content.contains(e.target)) {
          if (winWidth < 992) {
            if (this.toggled) this.toggled = false
          }
        }
      }
    },
    mounted() {
      $(window).on('click', this.windowClick)
    },
    beforeDestroy() {
      $(window).off('click', this.windowClick)
    }
  }
</script>
