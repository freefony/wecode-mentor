
const root = location.protocol + '//' + location.host
const auth = (function () {
  const options = {
    allowedConnections: ['twitter', 'facebook', 'github'],
    autoclose: true,
    theme: {
      logo: '../../images/wecode-logo.jpeg',
      primaryColor: '#00BFA5',
      socialButtonStyle: 'big'
    },
    auth: {
      responseType: 'token',
      sso: true,
      audience: 'https://freefony.auth0.com/userinfo',
      params: {
        scope: 'openid email user_metadata app_metadata picture',
      }
    },
    oidcConformant: true
  }

  const lock = new Auth0Lock('6JoB5KuW4ExtfGvaTc37HFDm3WGDvVpq','freefony.auth0.com', options)

  lock.on('authenticated', function (authResult) {
    lock.getUserInfo(authResult.accessToken, function (err, profile) {
      if (err) {
        console.error('Error: Authentication failed with the following error'+ err)
        return
      }
      console.log(profile)
      localStorage.setItem('accessToken', authResult.accessToken)
      localStorage.setItem('profile', JSON.stringify(profile))
      location.replace(root + '/app/home')
    })
  })

  const showAuthPop = function () {
    lock.show()
  }

  return {
    showAuthPop
  }
  
})()
