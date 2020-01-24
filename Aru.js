var log = function(){
  console.log.apply(console , arguments)
}

var ajax = function(method, path, headers, data, responseCallback){
  var r = new XMLHttpRequest()
  // 设置请求方法和请求地址
  r.open(method, path, true)
  // 设置发送的数据的格式
  r.setRequestHeader('Content-Type', 'application/json')//headers
  // 注册响应函数
  r.onreadystatechange = function() {
    if(r.readyState === 4){
      response(r)
    }
  }
}

var e = function(input){
  var target = document.querySelector(input)
  //log('querySelector', input, target)
  return target
}

var eAll = function(input){
  //log('eAll', document.querySelectorAll(input))
  return document.querySelectorAll(input)
}

var setAttri = function(target, atri, newvalue) {
  target.setAttribute(atri, newvalue)
}

var removeAttri = function(target, attri) {
  target.removeAttribute(attri)
}

var time = function(){
  var d = new Date()
  var year = d.getFullYear()
  var mon = d.getMonth()+1
  if(mon < 10) {
    mon = '0'+JSON.stringify(mon)
  }
  var date = d.getDate()
  if(date < 10) {
    date = '0'+JSON.stringify(date)
  }
  var hour = d.getHours()
  if(hour < 10) {
    hour = '0'+JSON.stringify(hour)
  }
  var min = d.getMinutes()
  if(min < 10) {
    min = '0'+JSON.stringify(min)
  }
  var second = d.getSeconds()
  if(second < 10) {
    second = '0'+JSON.stringify(second)
  }
  var day = d.getDay()
  if(day == 7){day = '日'}
  var time = `${year}/${mon}/${date} ${hour}:${min}:${second}`
  return time
}

var appendHtml = function(target, string){
  target.insertAdjacentHTML('beforeend', string)
}//在目标末尾插入string

var find = function(target, selector) {
  var find = target.querySelector(selector)
  return find
}

var findAll = function(target, string) {
  var findAll = target.querySelectorAll(string)
  return findAll
}

var bind = function(selector,trigger,callback) {
  var target = e(selector)
  target.addEventListener(trigger,callback)
}

var bindAll = function(selector, trigger, callback) {
  var target = document.querySelectorAll(selector)
  for (var i = 0; i < target.length; i++) {
    target[i].addEventListener(trigger, callback)
  }
}

var toggle = function(target, classname) {
  var bool = target.classList.contains(classname)
  if(bool === true) {
    target.classList.remove(classname)
    log('remove', classname, target)
  } else {
    target.classList.add(classname)
    log('add', classname, target)
  }
}
//为target 添加/删除 classname代表的css

var classRemove = function(target, classname) {
    var x = target
    if(x.classList.contains(classname)){
      x.classList.remove(classname)
      log('classRemove', x)
  }
}

var classRemoveAll = function(target, classname) {
  var len = target.length
  log('classRemove', len)
  for (var i = 0; i < len; i++) {
    var x = target[i]
    if(x.classList.contains(classname)){
      x.classList.remove(classname)
      log('classRemove', x)
    }
  }
}
//为全体target加上classname,target至少要有两个元素

var classAdd = function(target, classname) {
    var x = target
    if(!x.classList.contains(classname)){
      x.classList.add(classname)
      log('classAdd', x)
  }
}

var classAddAll = function(target,classname) {
  var len = target.length
  for (var i = 0; i < len; i++) {
    var x = target[i]
    if(!x.classList.contains(classname)) {
      x.classList.add(classname)
      log('classAdd', x)
    }
  }
}
//为全体target移除classname，target至少要有两个元素

var randomInt = function(n) {
  var x = Math.random()
  var j = n + 1
  x = x * j
  x = Math.floor(x)
  //log('random0~n',x)
  return x
}
//生成 0~N 的随机数

var randomInt_test = function(n) {
  var chances =[]
  for (var i = 0; i < (n + 1); i++) {
    var k = 0
    for (var j = 0; j < 1000000; j++) {
      var x = randomInt(n)
      if( x === i){ k++ }
    }
    var chance = k / 1000
    chances.push(chance)
  }
  log('chances', chances)
}
//测试randomInt

const changeClass = function(target, class1, class2='') {
  var bool = target.classList.contains(class1)
  if(class2 == '' && bool == true) {
    target.classList.toggle(class1)
    //log('removedClass', target.classList, class1)
  } else if (bool == true) {
    target.classList.toggle(class1)
    target.classList.toggle(class2)
    //log('changeClass ', target.classList)
  }
}
//交换class1和class2

/*
数字在数列中平移问题的完美解决方案：
对于0 ~ N 中的某数k，平移x位后的坐标是
[k + x + （N + 1）] % (N + 1)
k + x 为负时 (N + 1) 可变成 N 倍
*/
const arrayCopy = function(array) {
  var string = JSON.stringify(array)
  var arrayNew = JSON.parse(string)
  return arrayNew
}//多维数组复制array，仅限纯值数组

const arrayClone = function(array) {
  var array1 = array.slice(0)
  return array1
}//多维数组复制array, 适用范围？

const square0 = function(n) {
  var square = []
  var row = []
  for (var i = 0; i < n; i++) {
    row.push(0)
  }
  for (var i = 0; i < n; i++) {
    var array = arrayCopy(row)
    square.push(array)
  }
  return square
}
//生成m*n的矩阵方块

//计时函数功能
/*
const timer = function(bombs) {
  var k = 0
  var t = setInterval(function() {
    log('setTimeout', k)
    bombs[k].classList.value = 'tableCell boom'
    //log('bombs[i] = ', bombs[i])
    k++
    if(k >= bombs.length){
      clearInterval(t)
    }
  }, 100)
}
*/
//不是封装好的函数，可参考来做延时动画

const selectText = function(selector) {
  var select = e(selector)
  var n = select.selectedIndex
  var options = select.options
  var text = options[n].text
  return text
}
//用于取得selector的选中option的内容。

const martrix = function(row, column) {
  var martrix = []
  for (let i = 0; i < row; i++) {
    var array = []
    for (let j = 0; j < column; j++) {
      array.push(0)
    }
    martrix.push(array)
  }
  return martrix
}
// 返回row 行 column列的数组
