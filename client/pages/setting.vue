<template>
  <fragment>
    <page-title title="Setting" :items="items" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4">
          <setting-menu />
        </div>
        <div class="col-md-8">
          <nuxt-child :set-items="setItems" />
        </div>
      </div>
    </div>
  </fragment>
</template>

<script>
  import SettingMenu from '@/components/setting/menu'

  export default {
    middleware: ['is-auth'],
    components: {
      SettingMenu
    },
    head: {
      title: 'Setting'
    },
    data() {
      return {
        items: [
          {text: 'Dashboard', to: '/'},
          {text: 'Setting', active: true}
        ]
      }
    },
    methods: {
      setItems(items) {
        this.items = [
          {text: 'Dashboard', to: '/'},
          ...items
        ]
      }
    }
  }
</script>
