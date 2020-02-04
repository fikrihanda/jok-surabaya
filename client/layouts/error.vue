<template>
  <div class="text-center mt-4">
    <h1 class="display-1">
      {{error.statusCode}}
    </h1>
    <p class="lead">
      {{message}}
    </p>
    <nuxt-link :to="to">
      <fa-layer class="fa-fw">
        <fa :icon="['fas', 'arrow-left']" />
      </fa-layer>
      {{link}}
    </nuxt-link>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    head() {
      return {
        title: this.error.statusCode
      }
    },
    props: ['error'],
    layout: 'err-layout',
    computed: {
      ...mapGetters('authentication', [
        'token'
      ]),
      isAuth() {
        return !_.isEmpty(this.token)
      },
      message() {
        let {statusCode} = this.error
        if (statusCode === 404) {
          return 'This requested URL was not found on this server.'
        } else if (statusCode === 401) {
          return 'Access to this resource is denied.'
        } else {
          return 'Internal server error'
        }
      },
      to() {
        return this.isAuth ? '/' : '/login'
      },
      link() {
        return this.isAuth ? 'Return to Dashboard' : 'Return to Login'
      }
    }
  }
</script>
