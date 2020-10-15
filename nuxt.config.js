export default {
  ssr: false,
  target: 'static',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    htmlAttrs: {
      lang: 'en'
    },
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: ['@/plugins/composition-api', { src: '~/plugins/validate' }],
  components: true,
  buildModules: [
    '@nuxtjs/composition-api',
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
  ],
 
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: '<api-key>',
          authDomain: '<domain>',
          databaseURL: '<databaseURL>',
          projectId: '<projectId>',
          storageBucket: '<storageBucket>',
          appId: '<appId>',
          messagingSenderId: '<messageSenderId>',
        },
        services: {
          auth: {
            persistence: 'local', // default

            // it is recommended to configure either a mutation or action but you can set both
            initialize: {
              onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
              // onAuthStateChangedAction: 'onAuthStateChangedAction'
            },

            ssr: false, // default
          },
          firestore: true,
          functions: true,
        },
      },
    ],
  ],
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },
  },
}
