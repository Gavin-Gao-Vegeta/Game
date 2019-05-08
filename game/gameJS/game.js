class Game {
  constructor() {
    this.switchBtn = document.querySelector('.switch-on')
    this.switchText = document.querySelector('.switch-text')
    this.count = document.querySelector('.count-num')
    this.btnStyle = document.querySelector('[type=button]')
    this.startBtn = document.querySelector('.start')
    this.leftTop = document.querySelector('.left-top')
    this.rightTop = document.querySelector('.right-top')
    this.leftBtm = document.querySelector('.left-btm')
    this.rightBtm = document.querySelector('.right-btm')
    this.gameBtn = document.querySelector('.game-area')
    this.gameBoard = [] // 游戏自动放入的数组
    this.playerBoard = [] // 玩家点击后放入的数组
    // #leftTop #rightTop #leftBtm #rightBtm
    this.gameChoice = [0, 1, 2, 3]
    this.timer = 0
    this.status = 0 // 0未执行 1执行完
    this.init()
  }
  init() {
    this.clickFunc()
  }
  clickFunc() {
    this.switchBtn.addEventListener('click', () => {
      if (this.switchText.innerHTML == 'OFF') {
        this.switchText.innerHTML = 'ON'
        this.switchBtn.style.backgroundColor = 'green'
        this.count.innerHTML = '--'
        this.startBtn.addEventListener('click', () => {
          this.startGame() // 游戏开始
          this.playerClick() // 玩家点击功能生效
        })
      } else {
        this.switchBtn.style.backgroundColor = ''
        this.switchText.innerHTML = 'OFF'
        this.count.innerHTML = ''
      }
    }, false)
  }
  playerClick() {
    this.gameBtn.addEventListener('mousedown', this.validate())
    this.gameBtn.addEventListener('mouseup', (e) => {
      this.defaultStyle = e.target
      if (e.target.nodeName.toUpperCase() == 'LI') {
        this.defaultStyle.style.opacity = 0.5
      }
    }, false)
  }
  startGame() {
    this.gameBoard = []
    this.nextLevel()
    console.log('Game is Start');
  }
  nextLevel() {
    this.playerBoard = []
    this.num = Math.round(Math.random() * 3)
    this.gameBoard.push(this.num)
    var time = 0
    console.log(this.gameBoard);
    if (this.gameBoard.length > 0) {
      for (let i = 0; i < this.gameBoard.length; i++) {
        setTimeout(() => {
          this.item = this.gameBoard[i]
          console.log(this.item);
          this.autoPlay(this.item)
        }, time += 1000)
      }
    }
    this.counter()
  }
  autoPlay(item) {
    var timer = null;
    var i = 0;
    timer = setInterval(() => {
      switch (item) {
        case 0:
          this.leftTop.style.opacity = i++ % 2 ? '0.5' : '1'
          break
        case 1:
          this.rightTop.style.opacity = i++ % 2 ? '0.5' : '1'
          break
        case 2:
          this.leftBtm.style.opacity = i++ % 2 ? '0.5' : '1'
          break
        case 3:
          this.rightBtm.style.opacity = i++ % 2 ? '0.5' : '1'
          break
      }
      i > 1 && (clearInterval(timer))
    }, 500)
  }
  debounce(func, delay) {
    var timeout;
    var that = this
    return function (e) {
      e.target.style.opacity = 1
      that.playerBoard.push(e.target.value)
      console.log(that.playerBoard);
      clearTimeout(timeout);
      var context = this,
        args = arguments
      console.log("新的", e.target.value)
      timeout = setTimeout(function () {
        console.log("----")
        func.apply(context, args);
      }, delay)
    };
  }
  validate() {
    var that = this
    return this.debounce(function (e) {
      console.log(that.playerBoard);
      console.log(that.gameBoard);
      console.log("change", that.gameBoard, e.target.value, new Date - 0)
      if (that.playerBoard.toString() == that.gameBoard.toString()) {
        console.log(true);
        that.playerBoard = []
        that.nextLevel()
      } else {
        console.log(false);
        that.restart()
      }
    }, 2000)
  }
  async restart() {
    let res = await this.loop()
    if (res == 'success') {
      this.gameBoard = []
      this.counter()
      setTimeout(() => {
        this.startGame()
      }, 1500)
      console.log(this.gameBoard);
    }
  }
  loop() {
    return new Promise((resolve, reject) => {
      let i = 0
      while (i < 2) {
        setTimeout(() => {
          this.count.innerHTML = '!!'
        }, 500)
        setTimeout(() => {
          this.count.innerHTML = '00'
        }, 1000)
        i++;
      }
      if (i >= 2) {
        resolve('success')
      } else {
        reject('failed')
      }
    })
  }
  counter() {
    let countNum = this.gameBoard.length
    countNum = countNum < 10 ? '0' + countNum : countNum
    this.count.innerHTML = countNum
  }
}

new Game()