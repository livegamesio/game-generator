# LiveGames Game Frame Generator
*lg-f.js* fundamentally is a pure js tool for embeding our games to your site. Below you will find some information on how to implement games.

# Generator Script Embedding
``` html
<div id="lgf-container"></div> // html frame container element

<script type="text/javascript">
  (function(l,i,v,e,t,c,h){
    l['LGFrameObject']=t;l[t]=l[t]||function(){(l[t].q=l[t].q||[]).push(arguments)},
    l[t].l=1*new Date();c=i.createElement(v),h=i.getElementsByTagName(v)[0];
    c.async=1;c.src=e;h.parentNode.insertBefore(c,h)
  })(window,document,'script',('//static.lgio.net/lg-f.js?v='+(Date.now())),'lgf');
    lgf('config', {
      container: 'lgf-container', //id of html frame container element #:required
      origin: '', //frame top parent site origin url (default: document.referrer) (required for fullscreen)
      params: { // for all additional parameters
        sign:  'funmode', // #:required
        homepage: '', //
        cashierUrl: '', //
        room: '' //
      }
    });
</script>
```

## Config Parameters

- [Dimension Properties](#dimension-properties)
- [Container Html Element ID](#container-html-element-id)
- [Parent Webpage Origin](#parent-webpage-origin)
- [Game Options](#game-options)
- [Game Template](#game-template)
- [Additional Parameters](#additional-parameters)
- [Generate Custom Url](#generate-custom-url)

### Dimension Properties
```js
  {
    width: '100%', //expected game frame width
    height: '800', //optimum game frame height
  }
```
### Container Html Element ID
```js
  {
    container: 'lgf-container' //default: lgf-container
  }
```
### Parent Webpage Origin
```js
  {
    origin: '' //example: //pageurl.ext
  }
```
### Game Options
**Game ID List**
```js
  {
    tombala: {
      id: 1,
      types: ['card','reward','color']
    },
    tombalaslot: 2,
    overunder: 3,
    kilic: 4
  }
```

**T:Integer**
```js
  {
    game: 3 //will open directly overunder game
  }
```

**T:Object (Tombala has sub games under it, id and type param required!)**
```js
  {
    game: {
      id: 1, //game id,
      type: 'card' //game type/sub page name
    }
  }//will open directly tombala card game
  
  Live Tombala Sub Games
  game: { id: 1, type: 'card' } => Canlı Tombala => Live Tombala
  game: { id: 1, type: 'color' } => Tombala - Renk => Tombala Bet on Color
  game: { id: 1, type: 'reward' } => Tombala - Ödül => Tombala Bet on Reward

  RNG Tombala Sub Games
  game: { id: 1, type: 'card', auto: true  } => Auto Tombala => Auto Tombala
  game: { id: 1, type: 'color', auto: true } => Tombala - Renk => Tombala Bet on Color
  game: { id: 1, type: 'reward', auto: true } => Tombala - Ödül => Tombala Bet on Reward

  Tombala Slot:
  { game: 2 }

  OverUnder:
  { game: 3 }

  Kilic:
  { game: 4 }
```
### Game Template
```js
  {
    tpl: '' //custom game template
  }
```
### Game Environment
```js
  {
    env: '' //example: test
  }
```
### Additional Parameters
```js
  {
    params: {
        sign: '', //required: player sign jwt
        homepage: '', //homepage redirect url for unexpected troubles
        cashierUrl: '', //cash add page redirect url for insufficient balance,
        room: '' //custom room id for campaigns or special situations
    }
  }
```
### Generate Custom Url ( Just for specific integrations )
```js
  {
    generateURL: {
        sign: '', //required: player sign jwt
        and other custom params: ... //custom integration parameters
    }
  }
```
