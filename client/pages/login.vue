<template>
  <form action="#" class="card guest-content" @submit.prevent="onSubmit">
    <b-card-header>
      Login
    </b-card-header>
    <b-card-body>
      <b-input-group class="mb-3">
        <template v-slot:prepend>
          <b-input-group-text>
            <fa-layer class="fa-fw">
              <fa :icon="['fas', 'user']"></fa>
            </fa-layer>
          </b-input-group-text>
        </template>
        <b-input placeholder="Username"
                 :state="validUsername"
                 v-model="$v.username.$model"></b-input>
      </b-input-group>
      <b-input-group>
        <b-input-group-prepend>
          <b-input-group-text>
            <fa-layer class="fa-fw">
              <fa :icon="['fas', 'lock']"></fa>
            </fa-layer>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-input :type="typePassword ? 'password' : 'text'"
                 placeholder="Password"
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
    </b-card-body>
    <b-card-footer>
      <div class="btn-group d-flex">
        <b-button type="submit" variant="primary">
          Login
        </b-button>
        <b-button type="link" variant="info" to="/register">
          Register
        </b-button>
      </div>
    </b-card-footer>
  </form>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'

  export default {
    middleware: ['isnt-auth'],
    layout: 'guest',
    head: {
      title: 'Login'
    },
    data() {
      return {
        username: '',
        password: '',
        typePassword: true
      }
    },
    validations: {
      username: {required},
      password: {required}
    },
    computed: {
      validUsername() {
        let {username} = this.$v
        if (username.$dirty) {
          return !username.$error && username.required
        }
        return null
      },
      validPassword() {
        let {password} = this.$v
        if (password.$dirty) {
          return !password.$error && password.required
        }
        return null
      }
    },
    methods: {
      async onSubmit() {
        try {
          this.$v.$touch()
          if (this.$v.$invalid) return
          await this.$store.dispatch('authentication/signin', {
            username: this.username,
            password: this.password
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
