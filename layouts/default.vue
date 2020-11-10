<template>
  <div>
    <div v-if="$store.getters.isAuthenticated">
      <span>{{ $store.state.user.email }}</span>
      <a @click="logout">Logout</a>
    </div>

    <!-- navigation/user-info -->
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    async logout() {
      await this.$fire.auth.signOut()
      this.$router.push('/login')
    },
  },
})
</script>
