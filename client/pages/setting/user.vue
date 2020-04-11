<template>
  <form action="#" class="card mb-3" @submit.prevent="onSubmit">
    <b-card-header>
      Ganti Password
    </b-card-header>
    <b-card-body>
      <b-form-group label="Password"
                    label-for="password"
                    description="Note: password harus memiliki huruf dan angka melebihi 5">
        <b-input type="password"
                 id="password"
                 placeholder="Password"
                 :state="validPassword"
                 v-model="$v.password.$model"/>
        <template v-if="!validPassword">
          <b-form-invalid-feedback v-if="!$v.password.required">
            Silahkan isi password anda
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.password.requirment">
            Password anda tidak memnuhi requirment
          </b-form-invalid-feedback>
        </template>
      </b-form-group>
      <b-form-group label="Konfirmasi Password"
                    label-for="konpass"
                    class="mb-0">
        <b-input type="password"
                 id="konpass"
                 placeholder="Konfirmasi Password"
                 :state="validKonpass"
                 v-model="$v.konpass.$model"/>
        <template v-if="!validKonpass">
          <b-form-invalid-feedback v-if="!$v.konpass.sameAs">
            Konfirmasi password tidak sama dengan password
          </b-form-invalid-feedback>
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
  import {required, sameAs} from 'vuelidate/lib/validators'

  export default {
    props: ['set-items'],
    data() {
      return {
        password: '',
        konpass: ''
      }
    },
    validations: {
      password: {
        required,
        requirment(val) {
          if (_.isEmpty(val)) return true
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/.test(val)
        }
      },
      konpass: {
        sameAs: sameAs('password')
      }
    },
    computed: {
      validPassword() {
        let {password} = this.$v
        if (password.$dirty) {
          return !password.$error && (password.required && password.requirment)
        }
        return null
      },
      validKonpass() {
        let {konpass} = this.$v
        if (konpass.$dirty) {
          return !konpass.$error && konpass.sameAs
        }
        return null
      }
    },
    created() {
      this.setItems([
        {text: 'Setting', to: '/setting'},
        {text: 'User', active: true}
      ])
    },
    methods: {
      async onSubmit() {
        this.$v.$touch()
        if (this.$v.$error) return
      }
    }
  }
</script>
