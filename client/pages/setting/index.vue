<template>
  <b-card no-body header="Info" class="mb-3">
    <table class="table mb-0">
      <tbody>
      <tr>
        <th>Nama</th>
        <td>{{karyawan.nama_awal}} {{karyawan.nama_akhir}}</td>
      </tr>
      <tr>
        <th>Alamat</th>
        <td>{{karyawan.alamat || '-'}}</td>
      </tr>
      <template v-for="(v, i) in karyawan.telepon">
        <tr v-if="i === 0">
          <th :rowspan="karyawan.telepon.length">Telepon</th>
          <td>{{v}}</td>
        </tr>
        <tr v-else>
          <td>{{v}}</td>
        </tr>
      </template>
      <tr>
        <th>Roles</th>
        <td>{{karyawan.roles | capitalize}}</td>
      </tr>
      </tbody>
    </table>
  </b-card>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    props: ['set-items'],
    computed: {
      ...mapGetters('authentication', {
        karyawan: 'info'
      })
    },
    created() {
      this.setItems([
        {text: 'Setting', active: true}
      ])
    },
    filters: {
      capitalize(val) {
        return _.capitalize(val)
      }
    }
  }
</script>
