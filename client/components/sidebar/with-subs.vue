<template>
  <li class="sidebar-menu-list">
    <button type="button" :class="['sidebar-menu-link',active && 'active']" @click="handleClick">
      <fa-layer class="fa-fw">
        <fa :icon="menu.icon" />
      </fa-layer>
      {{menu.name}}
      <fa-layer :class="['fa-fw', 'sidebar-menu-angle', open && 'open']">
        <fa :icon="['fas', 'angle-right']" />
      </fa-layer>
    </button>
    <transition :css="false"
                @before-enter="beforeEnter"
                @enter="enter"
                @leave="leave">
      <ul v-if="open" class="sidebar-subsmenu">
        <template v-for="(subsmenu, si) in menu.subsmenu">
          <subs-menu :subsmenu="subsmenu" :key="si" />
        </template>
      </ul>
    </transition>
  </li>
</template>

<script>
  import SubsMenu from '@/components/sidebar/subs-menu'

  export default {
    props: ['menu', 'index'],
    components: {
      SubsMenu
    },
    computed: {
      open() {
        let {li, mi, liActive, miActive} = this.index
        return li === liActive && mi === miActive
      },
      active() {
        let {fullPath} = this.$route
        return this.menu.subsmenu.some(subsmenu => {
          return fullPath.startsWith(subsmenu.to)
        })
      }
    },
    methods: {
      handleClick() {
        let {li, mi} = this.index
        if (this.open) {
          this.$emit('set-index', {li: -1, mi: -1})
        } else {
          this.$emit('set-index', {li, mi})
        }
      },
      beforeEnter(el) {
        $(el).height(0)
      },
      enter(el, done) {
        let $el = $(el)
        $el.animate({
          height: $el.get(0).scrollHeight
        }, 150, function () {
          $el.height('auto')
          done()
        })
      },
      leave(el, done) {
        let $el = $(el)
        $el.animate({
          height: 0
        }, 150, function () {
          done()
        })
      }
    }
  }
</script>
