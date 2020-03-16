<template>
  <div class="col-12">
    <h1 class="mt-4">
      {{title}}
    </h1>
    <b-breadcrumb :items="items" class="mb-4"/>
  </div>
</template>

<script>
  export default {
    props: ['title', 'items']
  }
</script>
