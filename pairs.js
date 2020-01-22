const Pairs = {
  first : null,
  second : null,
  timer : 'OFF',
  pairsNumb : '',
  started : false,
  theme: 'normal',
}

Pairs.reset = function() {
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
    log('Pairs.compare === equal' )
    this.pairsNumb --
    this.reset()
    return
  } else {
    log('Pairs.compare === unequal' )
    if(this.timer === 'OFF') {
      this.timer = setTimeout(function() {
        reCover(first)
        reCover(second)
        Pairs.reset()
      }, 1000)
    }
    return
  }
}
Pairs.result = function() {
  if(this.pairsNumb === 0) {
    log('WIN!')
    Clock.off()
  }
}
Pairs.setTheme = function(theme) {
  var started = this.started
  //log('setTheme', started, typeof started)
  if(started === false) {
    this.theme = theme
    log('setTheme', this.theme)
  } else {
    return
  }
}
//设定开始，结束
Pairs.setStarted = function(bool) {
  var status = bool
  this.started = status
}

//时钟模块
const Clock = {
  timer: 'OFF',
  time: 0,
  endTime: 0,
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
Clock.off = function() {
  //log('clockOff', this.endTime, this.time)
  var target = e('#clock')
  clearInterval(this.timer)

  this.timer = 'OFF'
  this.endTime = this.time
  this.time = 0
  //弹窗时冻结时间
}
Clock.reset = function() {
  this.timer = 'OFF'
  this.endTime = 0
  this.time = 0

  var target = e('#clock')
  target.innerHTML = `TIME : ${this.time}S`
}

//插入图片模块
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
  log('numbMartrix', square)
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
  log('imgTemp', x)
  var src = `img-panda/${x.name}/${n}.${x.style}`
  var alt = `img-panda/${x.name}/${n}.${x.style}`
  var temp = `<img src="${src}" alt='${alt}'>`
  return temp
}

//揭开，覆盖方块
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

//检查是否相等
const checkPairs = function(target) {
  var p = Pairs
  var inFirst = (p.first === null)
  var inSecond = (p.first !== null && p.second === null)
  var full = (p.first !== null && p.second !== null)
  if(inFirst === true) {
    p.first = target
    unCover(target)
  }
  if (inSecond === true) {
    p.second = target
    unCover(target)
    p.compare()
  }
  if (full === true) {
    return 'full'
  }
}

//
var bindCells = function() {
  var table = e('table')
  var cells = findAll(table, 'th')
  log('bindCells', cells)
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function(event) {
      var target = event.target
      var covered = target.classList.contains('cover')
      Pairs.setStarted(true)
      Clock.on()
      if(covered === true) {
        checkPairs(target)
        Pairs.result()
      }
    })
  }
}

var bindButtons = function() {
  var buttons = eAll('#buttons button')
  log('bindButtons', buttons, buttons.length)
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(event) {
      var target = event.target
      log('bindButtons clicked', target)
      var theme = target.dataset.theme
      Pairs.setTheme(theme)
    })
  }
}

var _main = function() {
  insertTable('table', 4, 5)
  bindCells()
  bindButtons()
}

//test函数
const unCoverAll = function() {
  var all = eAll('th')
  for (var i = 0; i < all.length; i++) {
    unCover(all[i])
  }
}

_main()
