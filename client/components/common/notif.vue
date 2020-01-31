<template>
  <notifications group="alert-group" position="bottom right">
    <template v-slot:body="props">
      <b-alert show :variant="parsingType(props.item.type)">
        <h4 class="alert-heading">{{props.item.title}}</h4>
        <p class="mb-0">{{props.item.text}}</p>
      </b-alert>
    </template>
  </notifications>
</template>

<script>
  export default {
    methods: {
      parsingType(type) {
        if (_.includes(['error'], type)) return 'danger'
        if (_.includes(['warn'], type)) return 'warning'
        return type
      }
    }
  }
</script>
