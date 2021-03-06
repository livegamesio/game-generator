/*
 * LiveGames Game Frame Generator
 * @version: 1.0.0
*/
((run) => {
  run(window)
})((base) => {
  const LGFrame = {
    constants: {
      baseUrl: '//lobby.lgio.net',
      games: {
        1: 'tombala',
        2: 'tombalaslot',
        3: 'overunder',
        4: 'kilic'
      },
      gameConfig: {
        tombala: {
          type: true
        },
        overunder: {
          type: false
        },
        tombalaslot: {
          type: false
        },
        kilic: {
          type: false
        }
      }
    },
    config: {
      width: '100%',
      height: 1000,
      container: 'lgf-container',
      game: 0,
      origin: null,
      params: null,
      generateURL: null
    },
    frame: null,
    container: null,
    device: (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1),
    getGameName: (game) => {
      if (typeof game === 'string' && isNaN(game)) return game
      const id = typeof game === 'number' ? game : typeof game === 'object' && game.id ? game.id : ''
      return LGFrame.constants.games[id] || ''
    },
    setCookie: (name, value, days) => {
      const date = new Date()
      let expires = ''
      if (days) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      } else {
        date.setTime(date.getTime() + (60 * 1000))
      }
      expires = `; expires=${date.toUTCString()}`
      base.document.cookie = `${name}=${value || ''}${expires}; path=/`
    },
    getCookie: (name) => {
      const nameEQ = `${name}=`
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    },
    paramsToQueryString: () => {
      const obj = LGFrame.config.generateURL || LGFrame.config.params
      if (!Object.keys(obj).length) return ''
      const params = []
      Object.keys(obj).forEach((key) => {
        if (obj[key]) {
          params.push(`${window.encodeURIComponent(key)}=${window.encodeURIComponent(obj[key])}`)
        }
      })
      const origin = `&origin=${LGFrame.config.origin ? LGFrame.config.origin : window.location.origin}`
      let game = ``
      if (LGFrame.config.game !== 0) {
        if (typeof LGFrame.config.game === 'string') {
          game = `game=${LGFrame.config.game}&`
        } else if (typeof LGFrame.config.game === 'number') {
          game = `game=${LGFrame.constants.games[LGFrame.config.game]}&${LGFrame.constants.games[LGFrame.config.game] === 'tombala' ? 'type=card&' : ''}`
        } else if (typeof LGFrame.config.game === 'object') {
          game = `game=${LGFrame.constants.games[LGFrame.config.game.id]}&`
          if (typeof LGFrame.config.game.auto !== 'undefined' && String(LGFrame.config.game.auto) === 'true') {
            game += `auto=${LGFrame.config.game.auto}&`
          }
          if (LGFrame.constants.gameConfig[LGFrame.constants.games[LGFrame.config.game.id]].type) {
            game += `type=${LGFrame.config.game.type}&`
          }
        }
      }

      return `/${LGFrame.config.generateURL ? 'init' : ''}?${game}${params.join('&')}${origin}`
    },
    transportToLobby: () => {
      if (!LGFrame.config.game) return null
      LGFrame.config.game = 0
      return LGFrame.createFrameSource()
    },
    createFrameSource: () => {
      const protocolMatch = /^(https?)/
      const protocol = base.location.protocol
      let only = LGFrame.config.only ? `/${LGFrame.config.only}` : ''
      if (LGFrame.device && LGFrame.config.game) {
        only = `/${LGFrame.getGameName(LGFrame.config.game)}`
      }
      return `${!protocolMatch.test(LGFrame.constants.baseUrl) ? `${protocol}` : ''}${LGFrame.constants.baseUrl}${only}${LGFrame.paramsToQueryString()}`
    },
    appendIframe: () => {
      const source = LGFrame.createFrameSource()

      if (LGFrame.config.generateURL && LGFrame.config.generateURL.platformType && LGFrame.config.generateURL.platformType.toLowerCase() === 'mobile') {
        window.location.href = source
        return
      }

      if (LGFrame.device && LGFrame.config.params && LGFrame.config.params.platformType && LGFrame.config.params.platformType.toLowerCase() === 'mobile') {
        const parts = source.split(LGFrame.constants.baseUrl)
        parts[1] = `${LGFrame.constants.games[LGFrame.config.game.id]}${parts[1]}`
        window.location.href = `${parts[0]}${LGFrame.constants.baseUrl}/${parts[1]}`
        return
      }

      LGFrame.container = document.getElementById(LGFrame.config.container)
      if (LGFrame.container === null) {
        console.log('LGWIframe container could not found.')
        return
      }

      const iframe = document.getElementById(LGFrame.config.container.concat('-iframe'))
      if (iframe !== null) {
        iframe.src = source
        // console.log('LGWIframe already created.')
        return
      }

      let height = `${window.innerHeight}px`
      if (LGFrame.config.height && !LGFrame.device) {
        if (!isNaN(LGFrame.config.height)) {
          height = `${LGFrame.config.height}px`
        } else {
          height = LGFrame.config.height
        }
      }

      LGFrame.container.style.display = 'inline-block'
      LGFrame.container.style.width = `100%`
      LGFrame.container.style.height = height

      LGFrame.frame = document.createElement('iframe')
      LGFrame.frame.name = LGFrame.config.container
      LGFrame.frame.id = LGFrame.config.container.concat('-iframe')
      LGFrame.frame.width = '100%'
      LGFrame.frame.height = '100%'
      LGFrame.frame.setAttribute('frameborder', '0')
      LGFrame.frame.setAttribute('allowFullScreen', 'true')
      LGFrame.frame.setAttribute('webkitallowfullscreen', 'true')
      LGFrame.frame.setAttribute('mozallowfullscreen', 'true')
      LGFrame.frame.scrolling = 'no'
      LGFrame.frame.src = LGFrame.createFrameSource()

      LGFrame.container.appendChild(LGFrame.frame)
    },
    prefixIgniter: (obj, method) => {
      let pfx = ['webkit', 'moz', 'ms', 'o', '']; let p = 0; let m; let t
      while (p < pfx.length && !obj[m]) {
        m = method
        if (pfx[p] === '') {
          m = m.substr(0, 1).toLowerCase() + m.substr(1)
        }
        m = pfx[p] + m
        t = typeof obj[m]
        if (t !== 'undefined') {
          pfx = [pfx[p]]
          return (t === 'function' ? obj[m]() : obj[m])
        }
        p++
      }
    },
    toggleFullScreen: () => {
      if (LGFrame.prefixIgniter(document, 'FullScreen') || LGFrame.prefixIgniter(document, 'IsFullScreen')) {
        document.exitFullscreen()
      } else {
        LGFrame.prefixIgniter(LGFrame.frame, 'RequestFullScreen')
      }
    },
    parseMessage: (message) => {
      if (message) {
        const data = message.split('&')
        const params = {}
        for (let x = 0; x < data.length; x++) {
          const pair = data[x].split('=')
          params[pair[0]] = decodeURIComponent(pair[1])
        }
        return params
      }
      return null
    },
    messageResolver: () => {
      if (typeof window.postMessage !== 'undefined') {
        let eventListener, eventMessage
        if (typeof window.addEventListener !== 'undefined') {
          eventListener = 'addEventListener'
          eventMessage = 'message'
        } else if (typeof window.attachEvent !== 'undefined') {
          eventListener = 'attachEvent'
          eventMessage = 'onmessage'
        } else {
          return
        }

        const handleMessage = (message) => {
          const list = (message.data instanceof Object) ? message.data : LGFrame.parseMessage(message.data)
          if (list instanceof Object) {
            const types = Object.keys(list)
            for (let x = 0; x < types.length; x++) {
              if (types[x] === 'openGame') {
                LGFrame.openGame(list[types[x]])
              } else if (list[types[x]] === 'redirectLobby' && LGFrame.config.params.lobbyUrl) {
                LGFrame.redirect(LGFrame.config.params.lobbyUrl)
              } else if (list[types[x]] === 'toggleFullscreen') {
                LGFrame.toggleFullScreen()
              } else if (list[types[x]] === 'refreshLobby') {
                const url = LGFrame.transportToLobby()
                url && LGFrame.redirect(url)
              }
            }
          }
        }

        window[eventListener](eventMessage, (e) => {
          handleMessage(e)
        }, false)
      }
    },
    openGame: (type) => {
      LGFrame.setCookie('LGFrameGame', type)
      if (typeof LGFrame.config.redirectUrl !== 'undefined') {
        LGFrame.redirect(LGFrame.config.redirectUrl)
      } else {
        console.log('LGFrame redirect url is not defined.')
      }
    },
    redirect: (url) => {
      window.location.href = url
    },
    resize: () => {
      let height = LGFrame.config.height
      if (isNaN(height)) {
        return
      }
      height = window.innerHeight > height ? window.innerHeight : height
      LGFrame.container.style.height = height
    },
    init: () => {
      window.addEventListener('resize', LGFrame.resize, false)
      if (typeof base.LGFrameObject === 'undefined') {
        console.log('LGFrameObject is not defined.')
        return
      }
      LGFrame.constants.baseUrl = `${LGFrame.constants.baseUrl}`
      const options = base[base.LGFrameObject]
      if (typeof options.update === 'undefined') {
        options.update = (params) => {
          options.q[0] = []
          options.q[0].push('config', params)
          LGFrame.init()
        }
      }
      if (options.q && options.q.length) {
        for (let x = 0; x < options.q.length; x++) {
          if (options.q[x].length > 1 && options.q[x][0] === 'config' && options.q[x][1] instanceof Object) {
            LGFrame.config = Object.assign({}, LGFrame.config, options.q[x][1])
            LGFrame.appendIframe()
          } else {
            console.log('LGFrame config is not defined.')
            return
          }
        }
      } else {
        console.log('LGFrame config is not defined.')
        return
      }
      LGFrame.messageResolver()
      return true
    }
  }
  LGFrame.init()
})
