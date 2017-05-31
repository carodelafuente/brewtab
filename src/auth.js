import Auth0Lock from 'auth0-lock'
import IdTokenVerifier from 'idtoken-verifier'
import { observable, autorun, computed, action } from 'mobx'
import { mutation } from './api'

const CLIENT_ID = 'c4BMDGFG1Q_z1y8qs9LiuTVguR0Fd1wk'
const CLIENT_DOMAIN = 'carodelafuente.auth0.com'

class Auth {
  @observable token
  @observable profile
  @observable userId

  constructor () {
    this.token = window.localStorage.getItem('auth:token')
    this.profile = JSON.parse(window.localStorage.getItem('auth:profile'))
    this.lock = new Auth0Lock(CLIENT_ID, CLIENT_DOMAIN)
    this.lock.on('authenticated', ({ idToken }) => {
      this.token = idToken
      this.lock.getProfile(idToken, (error, profile) => {
        if (error) {
          this.lock.show({
            flashMessage: {
              type: 'error',
              text: error.error_description
            }
          })
        }
        this.profile = profile
        console.log(profile)
      })
    })

    autorun(() => {
      this.checkExpiration()
      this.createUser()
      if (this.isSignedIn) {
        window.localStorage.setItem('auth:token', this.token)
        window.localStorage.setItem('auth:profile', JSON.stringify(this.profile))
      } else {
        window.localStorage.removeItem('auth:token')
        window.localStorage.removeItem('auth:profile')
      }
    })
  }

  checkExpiration () {
    if (this.token) {
      const jwt = new IdTokenVerifier().decode(this.token)
      const now = new Date()
      const exp = new Date(0)
      exp.setUTCSeconds(jwt.payload.exp)
      if (now > exp) {
        this.signOut()
        return false
      }
      return true
    }
  }

  @action signIn () {
    this.lock.show()
    console.log(this.profile)
  }

  @action signOut () {
    this.token = null
  }

  @computed get isSignedIn () {
    return this.token && this.profile && this.userId
  }

  @action createUser () {
    console.log('is this running')
    if (this.token) {
      console.log('YES')
      mutation(`signinUser(auth0: { idToken: "${this.token}" }) {
        user {
          id
        }
      }`).then(({ data }) => {
        if (data) {
          this.userId = data.signinUser.user.id
        } else {
          mutation(`
            createUser(authProvider: {
              auth0: {
                idToken: "${this.token}"
              }
            }) {
              id
            }
            signinUser(auth0: { idToken: "${this.token}" }) {
              token
            }
          `).then(({ data }) => {
            this.userId = data.createUser.id
          })
        }
      })
    }
  }
}

const auth = new Auth()
window.auth = auth
export default auth
