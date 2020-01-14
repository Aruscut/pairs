const Pairs = {
  first : null,
  second : null,
  timer : 'OFF',
  pairsNumb : '',
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
  }
}

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

const unCover = function(target) {
  classRemove(target, 'cover')
  var value = target.dataset.value
  target.innerHTML = value
}

const reCover = function(target) {
  target.innerHTML = ''
  classAdd(target, 'cover')
}

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

var bindCells = function() {
  var table = e('table')
  var cells = findAll(table, 'th')
  log('bindCells', cells)
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function(event) {
      var target = event.target
      var covered = target.classList.contains('cover')
      if(covered === true) {
        checkPairs(target)
        Pairs.result()
      }
    })
  }
}

var main = function() {
  insertTable('table', 6, 2)
  bindCells()
}

main()
