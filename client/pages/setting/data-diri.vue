<template>
  <div>a</div>
</template>

<script>
  export default {
    props: ['set-items'],
    created() {
      this.setItems([
        {text: 'Setting', to: '/setting'},
        {text: 'Data Diri', active: true}
      ])
    }
  }
</script>
