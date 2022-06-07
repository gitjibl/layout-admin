'use strict'

import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // && response.config.url !== 'http://192.168.0.30:7003/polymerization/getMsgErrorLst'
    const response = error.response
    if (response && response.status === 403) {
      window.location.href = response.headers['token_url'] + window.location.href
    }
  })
