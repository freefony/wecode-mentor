window.addEventListener('load', function() {
    
      // Design the auth theme
      var options = {
    
        //socialButtonStyle: 'small',
    
        theme: {
            logo: 'images/wecode-logo.jpeg',
            primaryColor: '#0A73E3'
    
        },
    
        // auth: {
        //   redirectUrl: location.href,
        //   responseType: 'code'
        // },
    
        // Add the name field to the signup page
        // additionalSignUpFields: [{
        //   name: "name",
        //   placeholder: "your name",
        //   icon: "images/wecode-logo.jpeg",
        //   validator: function(name) {
        //     return {
        //         valid: name.length >= 3,
        //         hint: "Must have atleast 3 chars" // optional
        //     };
        //   }
        // }]
    
      };
    
      // Initialize Lock
      var lock = new Auth0Lock('7sdueqxUJ5GET4yCSeXX2Yzyj7iHVLCF','mentor.auth0.com', options, {
        
        auth: {
          redirectUrl: location.href,
          responseType: 'token id_token',
          audience: 'https://mentor.auth0.com/userinfo',
          params: {
            scope: 'openid'
          }
        }
      });
    
      lock.on('authenticated', function(authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult);
        }
      });
    
      lock.on('authorization_error', function(err) {
        console.log(err);
        alert('Error: ' + err.error + '. Check the console for further details.');
      });
    
      // buttons and event listeners
      var loginBtn = document.getElementById('login');
      var signupBtn = document.getElementById('signup');
    
      loginBtn.addEventListener('click', login);
      signupBtn.addEventListener('click', signup);
    
    // show only the login and forgot password page
    function login() {
        lock.show(
          { 
            allowSignUp: false,
            
            languageDictionary: {
              title: "Wecode Mentoring",
              emailInputPlaceholder: "example@youremail.com",
              loginSubmitLabel: 'Log In',
              forgotPasswordAction: 'Forgot your password?'
            }
          }
        );
    }
    
    // show only the sign up page
    function signup() {
    lock.show(
        { 
        allowLogin: false,
            
            languageDictionary: {
            signupTitle: 'Join Wecode Community',
            emailInputPlaceholder: "example@youremail.com",
            signUpSubmitLabel: 'Join Us',
            signUp: 'Thanks for joining the wecode community'
            }
        }
    ); 
    }
    
    function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    }

    function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
    }

    
});