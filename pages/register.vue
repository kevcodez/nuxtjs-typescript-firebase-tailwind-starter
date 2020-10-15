<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        style="max-height: 150px"
        src="~assets/logo.svg"
      />
      <h2 class="text-center text-2xl md:text-3xl leading-9 font-extrabold text-gray-900">
        Register a new account
      </h2>

      <p class="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
        Or
        <nuxt-link
          to="/"
          class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
        >sign in to your existing account.</nuxt-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <ValidationObserver
          tag="form"
          @submit.prevent="passes(register)"
        >
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-5 text-gray-700"
            >Email address</label>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required|email"
            >
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  name="Email"
                  v-model="email"
                  type="email"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>

              <span class="mt-2 text-red-700 block text-sm">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-6">
            <label
              for="password"
              class="block text-sm font-medium leading-5 text-gray-700"
            >Password</label>

            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
            >
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="Password"
                  v-model="password"
                  type="password"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>

              <span class="mt-2 text-red-700 block text-sm">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="mt-6">
            <span class="block w-full rounded-md shadow-sm">
              <button
                type="button"
                class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Register
              </button>
            </span>
          </div>
        </ValidationObserver>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm leading-5">
              <span class="px-2 bg-white text-gray-700">Or continue with</span>
            </div>
          </div>

          <SocialAuthenticationSection
            class="mt-4"
            @onSuccess="onSuccessfulAuthentication"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  layout: 'empty',
  middleware: ['guest'],
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async register() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        }

        await this.$fireAuth.createUserWithEmailAndPassword(this.email, this.password)
        this.$router.push(`/`)
      } catch (err) {
        console.log(err)
      }
    },
    onSuccessfulAuthentication() {
      this.$router.push('/')
    }
  },
})
</script>