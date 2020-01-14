const numbMartrix = function(row, column) {
  var r = row
  var c = column
  var total = r * c
  if(total % 2 !== 0) {
    log('numbMartrix error', `总数非偶数个!`)
    return
  }
  total = total / 2
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
  return square
}
