<template>
  <fragment>
    <div class="home">
      <nav-header/>
      <div class="home-container">
        <nav-sidebar/>
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
    }
  }
</script>
