<template>
  <form action="#" class="card mb-3" @submit.prevent="onSubmit">
    <b-card-header>
      Ganti Password
    </b-card-header>
    <b-card-body>
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
                <fa :icon="['fas', typePassword ? 'eye' : 'eye-slash']"/>
              </fa-layer>
            </b-button>
          </b-input-group-append>
        </b-input-group>
        <template v-if="$v.password.$error">
          <b-form-invalid-feedback v-if="!$v.password.required" class="d-block">
            Silahkan isi password anda
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.password.requirment" class="d-block">
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
        <template v-if="$v.konpass.$error">
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
        konpass: '',
        typePassword: true,
        typeKonpass: true
      }
    },
    validations: {
      password: {
        required,
        requirment(val) {
          if (_.isEmpty(val)) return true
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{5,}$/.test(val)
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
      resetField() {
        this.$v.$reset()
        this.password = ''
        this.konpass = ''
      },
      async onSubmit() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('authentication/ganti', {
            password: this.password,
            method: 'user'
          })
          this.$utils.notification({
            title: 'Success',
            type: 'success',
            text: 'Berhasil update password anda'
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
    }
  }
</script>
