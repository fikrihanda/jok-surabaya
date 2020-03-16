<template>
  <div>a</div>
</template>

<script>
  export default {
    props: ['set-items'],
    created() {
      this.setItems([
        {text: 'Setting', active: true}
      ])
    }
  }
</script>
