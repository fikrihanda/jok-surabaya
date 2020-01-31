<template>
  <fragment>
    <div class="guest">
      <nuxt />
    </div>
    <notif />
  </fragment>
</template>

<script>
  import Notif from '@/components/common/notif'
  export default {
    components: {
      Notif
    }
  }
</script>
