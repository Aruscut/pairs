const Pairs = {
  first : null,
  second : null,
  timer : 'OFF',
  pairsNumb : '',
  started : false,
  theme: 'normal',
}

Pairs.clear = function() {
  this.first = null
  this.second = null
  this.timer = 'OFF'
}

Pairs.compare = function() {
  var first = this.first
  var second = this.second
  if(first === null || second === null) {
    log('Pairs.compare不能在数字对未满时调用')
    return
  }
  var equal = (first.dataset.value === second.dataset.value)
  if(equal === true) {
    //log('Pairs.compare === equal' )
    this.pairsNumb --
    this.clear()
    return
  } else {
    //log('Pairs.compare === unequal' )
    if(this.timer === 'OFF') {
      this.timer = setTimeout(function() {
        reCover(first)
        reCover(second)
        Pairs.clear()
      }, 1000)
    }
    return
  }
}
Pairs.checkEnd = function() {
  if(this.pairsNumb === 0) {
    //log('WIN!')
    Clock.pause()
    _alert('win')
  }
}
Pairs.setTheme = function(theme) {
  var started = this.started
  //log('setTheme', started, typeof started)
  if(started === false) {
    this.theme = theme
    //log('setTheme', this.theme)
  } else {
    return
  }
}

//设定开始，结束
Pairs.setStarted = function(bool) {
  var status = bool
  this.started = status
}

//检查是否相等并处理
Pairs.checkPairs = function(target) {
  var inFirst = (this.first === null)
  var inSecond = (this.first !== null && this.second === null)
  var full = (this.first !== null && this.second !== null)

  if(inFirst === true) {
    this.first = target
    unCover(target)
  }
  if (inSecond === true) {
    this.second = target
    unCover(target)
    this.compare()
  }
  if (full === true) {
    return 'full'
  }
}

//重设矩阵
Pairs.reset = function() {
  this.first = null,
  this.second = null,
  this.timer = 'OFF',
  this.pairsNumb = '',
  this.started = false,
  this.theme = 'normal',

  insertTable('table', 4, 7)
  bindCells()
  //log('Pairs.reset', Pairs)
}

//时钟模块
const Clock = {
  timer: 'OFF',
  time: 0,
  lastTime: 0,
}

Clock.on = function() {
  var target = e('#clock')
  if(this.timer === 'OFF') {
    this.timer = setInterval(function() {
      Clock.time++
      target.innerHTML = `TIME : ${Clock.time}S`
      //log('time', time)
    }, 1000)
  }
}
Clock.pause = function() {
  //log('clockOff', this.endTime, this.time)
  var target = e('#clock')
  clearInterval(this.timer)

  this.timer = 'OFF'
  //弹窗时冻结时间
}
Clock.reset = function() {
  this.timer = 'OFF'
  this.lastTime = this.time
  this.time = 0

  var target = e('#clock')
  target.innerHTML = `TIME : ${this.time}S`
}

// alert 模块
var templateAlert = function(message) {
  var alerts = {
    win : {
      title: 'YOU WIN!!!',
      button: 'OK' ,
    },
    pause : {
      title: '暂停',
      button: '继续',
    },
  }
  var key = message
  var t1 = `
      <div class="alert-content">
        <div class="alert-mask"></div>
        <div class="alert-cell">
          <div id="alert1-message">${alerts[key].title}</div>
          <div class='alert1-button'>${alerts[key].button}</div>
        </div>
      </div>
      `
  return t1
}

var insertAlert = function(string) {
  var target = e('body')
  var alert = templateAlert(string)
  appendHtml(target, alert)
  //log('inserted')
}

var alertReset = function() {
  var t = event.target
  //log('bindDelete', t)
  var alert = t.classList.contains("alert1-button")
  if(alert) {
    //log('alert1-button clicked')
    var p = e('.alert-content')
    p.remove()

    Clock.reset()
    Pairs.reset()

    var b = e('body')
    b.removeEventListener('click', alertReset)//回收deleteAlert
  }
}

var alertPause = function() {
  var t = event.target
  //log('bindDelete', t)
  var alert = t.classList.contains("alert1-button")
  if(alert) {
    //log('alert1-button clicked')
    var p = e('.alert-content')
    p.remove()

    Clock.on()

    var b = e('body')
    b.removeEventListener('click', alertPause)//回收deleteAlert
  }
}

var bindAlert = function(message) {
  var key = message
  alerts = {
    win: alertReset,
    pause: alertPause,
  }
  bind('body', 'click', alerts[key])
}

var _alert = function(message) {
  bindAlert(message)
  insertAlert(message)
}

//插入矩阵模块
const numbMartrix = function(row, column) {
  var r = row
  var c = column
  var total = r * c
  if(total % 2 !== 0) {
    log('numbMartrix error', `总数非偶数个!`)
    return
  }
  total = total / 2
  Pairs.pairsNumb = total
  var square = martrix(r, c)
  var x = 0
  var y = 0
  for (let i = 1; i < total; i++) {
    while(square[x][y] !== 0) {
      x = randomInt(r-1)
      y = randomInt(c-1)
    }
    //log('numbMartrix', x,  y, i)
    square[x][y] = i
    while(square[x][y] !== 0) {
      x = randomInt(r-1)
      y = randomInt(c-1)
    }
    square[x][y] = i
    //log('numbMartrix', x,  y)
  }
  log('答案numbMartrix ：', square)
  return square
}

const rowTemp = function(array) {
  var row = array
  var temp = '<tr>'
  for (let i = 0; i < row.length; i++) {
    temp += `<th class='cover' data-value=${row[i]}></th>`
  }
  temp += '</tr>'
  return temp
}

const createTemp = function(row, column) {
  var r = row
  var c = column
  var martrix = numbMartrix(r, c)
  var temp = ''
  for (let i = 0; i < r; i++) {
    temp += rowTemp(martrix[i])
  }
  return temp
}

const insertTable = function(selector, row, column) {
  var r = row
  var c = column
  var table = e(selector)
  var temp = createTemp(r, c)
  table.innerHTML = temp
}

//揭开，覆盖方块
const imgTemp = function(n, theme) {
  var key = theme
  var themes = {
    active: {
      name: 'active',
      style: 'gif',
    },
    normal: {
      name: 'normal',
      style: 'jpg',
    }
  }
  var x = themes[key]
  //log('imgTemp', x)
  var src = `img-panda/${x.name}/${n}.${x.style}`
  var alt = `img-panda/${x.name}/${n}.${x.style}`
  var temp = `<img src="${src}" alt='${alt}'>`
  return temp
}

const unCover = function(target) {
  classRemove(target, 'cover')
  var value = target.dataset.value
  value = parseInt(value)
  theme = Pairs.theme
  target.innerHTML = imgTemp(value, theme)
}

const reCover = function(target) {
  target.innerHTML = ''
  classAdd(target, 'cover')
}


//
var bindCells = function() {
  var table = e('table')
  var cells = findAll(table, 'th')
  //log('bindCells', cells)
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function(event) {
      var target = event.target
      var covered = target.classList.contains('cover')
      Pairs.setStarted(true)
      Clock.on()
      if(covered === true) {
        Pairs.checkPairs(target)
        Pairs.checkEnd()
      }
    })
  }
}

var bindButtons = function() {
  var buttons = eAll('#buttons button')
  //log('bindButtons', buttons, buttons.length)
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(event) {
      var target = event.target
      //log('bindButtons clicked', target)
      var theme = target.dataset.theme
      Pairs.setTheme(theme)
    })
  }
}

var bindPause = function() {
  bind('#pause', 'click', function() {
    Clock.pause()
    _alert('pause')
  })
}

//test函数
const unCoverAll = function() {
  var all = eAll('th')
  for (var i = 0; i < all.length; i++) {
    unCover(all[i])
  }
}

var _main = function() {
  Pairs.reset()
  bindButtons()
  bindPause()
}

_main()
