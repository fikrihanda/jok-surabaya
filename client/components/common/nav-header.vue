<template>
  <b-navbar type="dark" variant="dark" fixed="top" class="header">
    <b-navbar-brand to="/">Jok Surabaya</b-navbar-brand>
    <b-button variant="link" size="sm" class="order-1 order-lg-0 header-btn" @click="$emit('on-toggled')">
      <fa-layer class="fa-fw">
        <fa :icon="['fas', 'bars']" />
      </fa-layer>
    </b-button>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <template v-slot:button-content>
          {{karyawan.nama_awal}} {{karyawan.nama_akhir}}
        </template>
        <b-dropdown-item to="/setting">
          <fa-layer class="fa-fw">
            <fa :icon="['fas', 'cog']" />
          </fa-layer>
          Setting
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click="logout">
          <fa-layer class="fa-fw">
            <fa :icon="['fas', 'sign-out-alt']" />
          </fa-layer>
          Log Out
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters('authentication', {
        karyawan: 'info'
      })
    },
    methods: {
      logout() {
        this.$store.commit('authentication/removeInfo')
        this.$store.commit('authentication/removeToken')
        this.$router.push('/login')
      }
    }
  }
</script>
