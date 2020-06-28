import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate'

import { required, email, regex, max, min, confirmed } from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', required)
extend('email', email)
extend('regex', regex)
extend('max', max)
extend('min', min)
extend('confirmed', confirmed)

// @ts-ignore
setInteractionMode('eager')
