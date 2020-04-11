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
      <tr>
        <th>Telepon</th>
        <td>-</td>
      </tr>
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
