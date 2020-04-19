<template>
  <form action="#" class="card mb-3" @submit.prevent="onSubmit">
    <b-card-header>
      Ganti Data Diri
    </b-card-header>
    <b-card-body>
      <b-form-group label="Nama Awal"
                    label-for="nama_awal">
        <b-input placeholder="Nama Awal"
                 id="nama_awal"
                 :state="validNamaAwal"
                 v-model="$v.nama_awal.$model"/>
      </b-form-group>
      <b-form-group label="Nama Akhir"
                    label-for="nama_akhir">
        <b-input placeholder="Nama Akhir"
                 id="nama_akhir"
                 :state="validNamaAkhir"
                 v-model="$v.nama_akhir.$model"/>
      </b-form-group>
      <b-form-group label="Alamat"
                    label-for="alamat">
        <b-textarea placeholder="Alamat"
                    id="alamat"
                    :state="validAlamat"
                    v-model="$v.alamat.$model"/>
      </b-form-group>
      <b-form-group label="Telepon" class="mb-0">
        <template v-for="(v, i) in $v.telepon.$each.$iter">
          <b-input-group prepend="+62"
                         :key="i"
                         :class="marginTelepon(i)">
            <b-input type="number"
                     :placeholder="`Telepon Ke ${parseInt(i) + 1}`"
                     :state="validNomor(v)"
                     v-model="v.nomor.$model"/>
            <b-input-group-append>
              <b-button v-if="parseInt(i) === 0"
                        type="button"
                        variant="primary"
                        @click="addTelepon">
                <fa-layer class="fa-fw">
                  <fa :icon="['fas', 'plus']" />
                </fa-layer>
              </b-button>
              <b-button v-else
                        type="button"
                        variant="danger"
                        @click="removeTelepon(i)">
                <fa-layer class="fa-fw">
                  <fa :icon="['fas', 'trash-alt']" />
                </fa-layer>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </template>
      </b-form-group>
    </b-card-body>
    <b-card-footer>
      <b-button type="submit" variant="primary">
        Save
      </b-button>
    </b-card-footer>
  </form>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {required, minLength} from 'vuelidate/lib/validators'

  export default {
    props: ['set-items'],
    data() {
      return {
        nama_awal: '',
        nama_akhir: '',
        alamat: '',
        telepon: [
          {nomor: ''}
        ]
      }
    },
    validations: {
      nama_awal: {required},
      nama_akhir: {required},
      alamat: {required},
      telepon: {
        required,
        minLength: minLength(1),
        $each: {
          nomor: {required}
        }
      }
    },
    computed: {
      ...mapGetters('authentication', {
        user: 'info'
      }),
      validNamaAwal() {
        let {nama_awal} = this.$v
        if (nama_awal.$dirty) {
          return !nama_awal.$error && nama_awal.required
        }
        return null
      },
      validNamaAkhir() {
        let {nama_akhir} = this.$v
        if (nama_akhir.$dirty) {
          return !nama_akhir.$error && nama_akhir.required
        }
        return null
      },
      validAlamat() {
        let {alamat} = this.$v
        if (alamat.$dirty) {
          return !alamat.$error && alamat.required
        }
        return null
      }
    },
    methods: {
      addTelepon() {
        this.telepon.push({
          nomor: ''
        })
      },
      removeTelepon(i) {
        i = parseInt(i)
        if (_.isEmpty(this.telepon[i]) || _.isNaN(i)) return
        this.telepon.splice(i, 1)
      },
      marginTelepon(i) {
        i = parseInt(i)
        if (_.isNaN(i)) return ''
        return this.telepon.length === (i + 1) ? '' : 'mb-3'
      },
      validNomor(v) {
        let {nomor} = v
        if (nomor.$dirty) {
          return !nomor.$error && nomor.required
        }
        return null
      },
      async onSubmit() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          let telepon = this.telepon.map(tlp => `+62${tlp.nomor}`)
          await this.$store.dispatch('authentication/ganti', {
            nama_awal: this.nama_awal,
            nama_akhir: this.nama_akhir,
            alamat: this.alamat,
            telepon,
            method: 'data-diri'
          })
          this.$utils.notification({
            title: 'Success',
            type: 'success',
            text: 'Berhasil update data diri anda'
          })
          this.$router.push('/setting')
        } catch (err) {
          this.$utils.notification({
            title: 'Error',
            type: 'error',
            text: err.message
          })
          this.$router.push('/setting')
        }
      }
    },
    created() {
      this.setItems([
        {text: 'Setting', to: '/setting'},
        {text: 'Data Diri', active: true}
      ])
      this.nama_awal = this.user.nama_awal
      this.nama_akhir = this.user.nama_akhir
      this.alamat = this.user.alamat
      this.telepon = _.isEmpty(this.user.telepon) ? [{nomor: ''}] : this.user.telepon.map(tlp => {
        return {nomor: tlp.replace('+62', '')}
      })
    }
  }
</script>
