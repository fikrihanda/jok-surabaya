<template>
  <div class="sidebar">
    <template v-for="(list, li) in lists">
      <fragment>
        <div class="sidebar-head">
          {{list.name}}
        </div>
        <ul class="sidebar-menu">
          <template v-for="(menu, mi) in list.menu">
            <with-subs v-if="menu.subsmenu"
                       :index="index(li, mi)"
                       :menu="menu"
                       :key="mi"
                       @set-index="setIndex"/>
            <without-subs v-else
                          :menu="menu"
                          :key="mi"/>
          </template>
        </ul>
      </fragment>
    </template>
  </div>
</template>

<script>
  import WithSubs from '@/components/sidebar/WithSubs'
  import WithoutSubs from '@/components/sidebar/WithoutSubs'

  export default {
    components: {
      WithSubs,
      WithoutSubs
    },
    data() {
      return {
        liActive: -1,
        miActive: -1
      }
    },
    computed: {
      lists() {
        return this.$utils.lists
      }
    },
    watch: {
      $route() {
        this.liActive = -1
        this.miActive = -1
      }
    },
    methods: {
      setIndex(index) {
        let {li, mi} = index
        this.liActive = li
        this.miActive = mi
      },
      index(li, mi) {
        let {liActive, miActive} = this
        return {
          liActive,
          miActive,
          li, mi
        }
      }
    }
  }
</script>
