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
  })(window,document,'script',('//embed.lgio.net/lg-f.js?v='+(Date.now())),'lgf');
    lgf('config', {
      width: '100%',
      height: '800', //optimum game frame height
      container: 'lgf-container', //id of html frame container element
      origin: '', //frame top parent site origin url (default: document.referrer) (required for fullscreen)
      game: 3, //game id/name
      params: { // for all additional parameters
        sign:  'funmode', //
        homepage: '', //
        cashierUrl: '', //
        room: '' //
      },
      generateURL: {}, //
      tpl: '', //
      env: ''
    });
</script>
```

**Note:** *If there is no element with id **lgf-container** in the html dom, generator script will append new container element to the html body element.*

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
**T:String**
```js
  {
    game: 'tombala' //will open tombala game
  }
```

**T:Number**
```js
  {
    game: 1 //will open tombala game
  }
```

**T:Object**
```js
  {
    game: {
      id: 1, //game id,
      type: 'card' //game type/sub page name
    }
  }//will open directly tombala card game
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
    env: '' //test/prod
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
### Generate Custom Url
```js
  {
    generateURL: {
        sign: '', //required: player sign jwt
        and other custom params: ... //custom integration parameters
    }
  }
```
