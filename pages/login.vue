<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form action="#" method="POST">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Email address
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="mt-6">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >
              Password
            </label>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              />
            </div>
          </div>

          <div class="mt-6">
            <button
              type="button"
              class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              :disabled="signingIn"
              @click="login"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'empty',
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      signingIn: false,
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated
    },
  },
  methods: {
    async login() {
      try {
        this.signingIn = true
        await this.$fireAuth.signInWithEmailAndPassword(
          this.email,
          this.password
        )
      } catch (err) {
        console.log(err)
      }
      this.signingIn = false
    },
  },
  watch: {
    authenticated(newVal) {
      console.log('chjanged')
      if (newVal) {
        this.$router.push('/')
      }
    },
  },
})
</script>