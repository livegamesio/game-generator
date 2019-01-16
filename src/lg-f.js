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
        '1': 'tombala',
        '2': 'tombalaslot',
        '3': 'overunder',
        '4': 'kilic'
      }
    },
    config: {
      width: '100%',
      height: 800,
      container: 'lgf-container',
      game: null,
      origin: document.referrer,
      params: null,
      generateURL: null
    },
    frame: null,
    container: null,
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
      const params = Object.keys(obj).map((key) => {
        return window.encodeURIComponent(key) + '=' + window.encodeURIComponent(obj[key])
      }).join('&')
      let origin = `&origin=${LGFrame.config.origin}`
      let game = `game=${LGFrame.config.game}&`
      if (typeof LGFrame.config.game === 'number') {
        game = `game=${LGFrame.constants.games[LGFrame.config.game]}&`
      } else if (typeof LGFrame.config.game === 'object') {
        game = `game=${LGFrame.constants.games[LGFrame.config.game.id]}&type=${LGFrame.config.game.type}&`
      }
      return `/?${game}${params}${origin}`
    },
    createFrameSource: () => {
      const protocolMatch = /^(https?)/
      const protocol = base.location.protocol
      return `${!protocolMatch.test(LGFrame.constants.baseUrl) ? `${protocol}` : ''}${LGFrame.constants.baseUrl}${LGFrame.paramsToQueryString()}`
    },
    appendIframe: () => {
      LGFrame.container = document.getElementById(LGFrame.config.container)
      if (LGFrame.container === null) {
        console.log('LGWIframe container could not found.')
        return
      }

      LGFrame.container.style.display = 'inline-block'
      LGFrame.container.style.width = `${LGFrame.config.width}px`
      LGFrame.container.style.height = `${window.innerHeight}px`

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
    parseMessage: (message) => {
      if (message) {
        const data = message.split('&')
        let params = {}
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
        window.location.href = LGFrame.config.redirectUrl
      } else {
        console.log('LGFrame redirect url is not defined.')
      }
    },
    resize: () => {
      LGFrame.container.style.height = `${window.innerHeight}px`
    },
    init: () => {
      window.addEventListener('resize', LGFrame.resize, false)
      if (typeof base.LGFrameObject === 'undefined') {
        console.log('LGFrameObject is not defined.')
        return
      }
      LGFrame.constants.baseUrl = `${LGFrame.constants.baseUrl}`
      const options = base[base.LGFrameObject]
      if (options.q && options.q.length) {
        for (let x = 0; x < options.q.length; x++) {
          if (options.q[x].length > 1 && options.q[x][0] === 'config' && options.q[x][1] instanceof Object) {
            LGFrame.config = Object.assign({}, LGFrame.config, options.q[x][1])
            LGFrame.appendIframe()
          } else {
            console.log('LGFrame config is not defined.')
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
