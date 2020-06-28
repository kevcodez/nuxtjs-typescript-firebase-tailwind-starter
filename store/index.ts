import { GetterTree, MutationTree } from 'vuex'

interface RootState {
  user: any | null
}

export const state = (): RootState => ({
  user: null,
})

export const getters: GetterTree<RootState, RootState> = {
  isAuthenticated: (state: RootState) => state.user !== null,
}

export const mutations: MutationTree<RootState> = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, _claims }) => {
    if (authUser) {
      const { uid, email, emailVerified } = authUser
      state.user = { uid, email, emailVerified }
    } else {
      state.user = null
    }
  },
}
