<template>
  <form action="#" class="card guest-content content-md" @submit.prevent="onSubmit">
    <b-card-header>
      Register
    </b-card-header>
    <b-card-body>
      <b-form-group label="Nama Awal"
                    label-for="nama_awal">
        <b-input placeholder="Nama Awal"
                 id="nama_awal"
                 :state="validNamaAwal"
                 v-model="$v.nama_awal.$model"></b-input>
        <template v-if="$v.nama_awal.$error">
          <b-form-invalid-feedback v-if="!$v.nama_awal.required">
            Harus isi nama awal anda
          </b-form-invalid-feedback>
        </template>
      </b-form-group>
      <b-form-group label="Nama Akhir"
                    label-for="nama_akhir">
        <b-input placeholder="Nama Akhir"
                 id="nama_akhir"
                 :state="validNamaAkhir"
                 v-model="$v.nama_akhir.$model"></b-input>
        <template v-if="$v.nama_akhir.$error">
          <b-form-invalid-feedback v-if="!$v.nama_akhir.required">
            Harus isi nama akhir anda
          </b-form-invalid-feedback>
        </template>
      </b-form-group>
      <b-form-group label="Username"
                    label-for="username">
        <b-input placeholder="Username"
                 id="username"
                 :state="validUsername"
                 v-model="$v.username.$model"></b-input>
        <template v-if="$v.username.$error">
          <b-form-invalid-feedback v-if="!$v.username.required">
            Harus isi username anda
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.username.isUnique">
            Username sudah ada
          </b-form-invalid-feedback>
        </template>
      </b-form-group>
      <b-form-group label="Password"
                    label-for="password"
                    description="Note: password harus memiliki huruf dan huruf besar, angka, special character melebihi 5">
        <b-input-group>
          <b-input :type="typePassword ? 'password': 'text'"
                   placeholder="Password"
                   id="password"
                   :state="validPassword"
                   v-model="$v.password.$model"></b-input>
          <b-input-group-append>
            <b-button type="button" variant="primary" @click="typePassword = !typePassword">
              <fa-layer class="fa-fw">
                <fa :icon="['fas', typePassword ? 'eye' : 'eye-slash']" />
              </fa-layer>
            </b-button>
          </b-input-group-append>
        </b-input-group>
        <template v-if="$v.password.$error">
          <b-form-invalid-feedback v-if="!$v.password.required" class="d-block">
            Harus isi password anda
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.password.requirment" class="d-block">
            Password anda tidak memnuhi requirment
          </b-form-invalid-feedback>
        </template>
      </b-form-group>
      <b-form-group class="mb-0"
                    label="Pemilik"
                    label-for="pemilik">
        <b-input placeholder="Pemilik"
                 id="pemilik"
                 :state="validPemilik"
                 v-model="$v.pemilik.$model"></b-input>
        <template v-if="$v.pemilik.$error">
          <b-form-invalid-feedback v-if="!$v.pemilik.required">
            Harus isi pemilik pass code anda
          </b-form-invalid-feedback>
        </template>
      </b-form-group>
    </b-card-body>
    <b-card-footer>
      <div class="btn-group d-flex">
        <b-button type="submit" variant="primary">
          Register
        </b-button>
        <b-button type="link" variant="info" to="/login">
          Login
        </b-button>
      </div>
    </b-card-footer>
  </form>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'
  import Auth from '@/api/Auth'

  export default {
    middleware: ['isnt-auth'],
    layout: 'guest',
    head: {
      title: 'Register'
    },
    data() {
      return {
        username: '',
        password: '',
        nama_awal: '',
        nama_akhir: '',
        pemilik: '',
        typePassword: true
      }
    },
    validations: {
      username: {
        required,
        async isUnique(val) {
          if (_.isEmpty(val)) return true
          try {
            await Auth.checkUsername({
              username: val
            })
            return true
          } catch (_err) {
            return false
          }
        }
      },
      password: {
        required,
        requirment(val) {
          if (_.isEmpty(val)) return true
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{5,}$/.test(val)
        }
      },
      nama_awal: {required},
      nama_akhir: {required},
      pemilik: {required}
    },
    computed: {
      validUsername() {
        let {username} = this.$v
        if (username.$dirty) {
          return !username.$error && (username.required && username.isUnique)
        }
        return null
      },
      validPassword() {
        let {password} = this.$v
        if (password.$dirty) {
          return !password.$error && (password.required && password.requirment)
        }
        return null
      },
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
      validPemilik() {
        let {pemilik} = this.$v
        if (pemilik.$dirty) {
          return !pemilik.$error && pemilik.required
        }
        return null
      }
    },
    methods: {
      async onSubmit() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          if (this.pemilik !== 'waluyo7777') return this.$utils.notification({
            title: 'Error',
            type: 'error',
            text: 'Anda bukan pemilik'
          })
          await this.$store.dispatch('authentication/register', {
            username: this.username,
            password: this.password,
            nama_awal: this.nama_awal,
            nama_akhir: this.nama_akhir,
            roles: 'pemilik'
          })
          this.$router.push('/')
        } catch (err) {
          this.$utils.notification({
            title: 'Error',
            type: 'error',
            text: err.message
          })
        }
      }
    }
  }
</script>
