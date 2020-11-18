var eraserMethods = {
  init: function (options) {


    let _this = this,
      data = _this.eraser;

    if (!data) {
      let width = _this.offsetWidth,
        height = _this.offsetHeight,
        pos = {
          top: gainTopForWin(_this),
          left: gainLeftForWin(_this)
        },
        _canvas = document.createElement('canvas'),
        _canvasForShow = document.createElement('canvas'),
        size = (options && options.size) ? options.size : 40,
        completeRatio = (options && options.completeRatio) ? options.completeRatio : .7,
        completeFunction = (options && options.completeFunction) ? options.completeFunction : null,
        completeOnce = (options && options.completeOnce) ? options.completeOnce : null,
        movingHandle = (options && options.movingHandle) ? options.movingHandle : null,
        parts = [],
        colParts = Math.floor(width / size),
        numParts = colParts * Math.floor(height / size),
        n = numParts,
        ctx = _canvas.getContext("2d"),
        ctxForShow = _canvasForShow.getContext("2d");


      let eraserBg = document.createElement('div')
      eraserBg.id = 'eraserBg'
      eraserBg.appendChild(_canvas)
      _this.parentElement.insertBefore(eraserBg, _this);

      let showForScale = document.createElement('div')
      showForScale.id = 'showForScale'
      showForScale.appendChild(_canvasForShow)

      let showBox = document.createElement('div')
      showBox.id = 'showBox'
      showBox.style.top = _this.showTop + 'px'
      showBox.appendChild(showForScale)

      let pencilShow = document.createElement('div')
      pencilShow.id = 'pencilShow'
      changeSizeShow({
        ele: pencilShow,
        size: size,
        scale: _this.scale,
        width: width
      })
      showBox.appendChild(pencilShow)

      _this.parentElement.insertBefore(showBox, _this);

      _canvas.id = this.id;
      _canvas.className = this.className;
      _canvasForShow.id = 'eraserShow';
      _canvas.width = width;
      _canvasForShow.width = width;
      _canvas.height = height;
      _canvasForShow.height = height;
      ctx.drawImage(this, 0, 0, width, height);
      ctxForShow.drawImage(this, 0, 0, width, height);
      _this.parentElement.removeChild(_this);

      // prepare context for drawing operations
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = 'rgba(255,0,0,255)';
      ctx.lineWidth = size;
      ctx.lineCap = "round";

      ctxForShow.globalCompositeOperation = "destination-out";
      ctxForShow.strokeStyle = 'rgba(255,0,0,255)';
      ctxForShow.lineWidth = size;
      ctxForShow.lineCap = "round";

      // addEventListener events
      _canvas.addEventListener('mousedown', eraserMethods.mouseDown);
      _canvas.addEventListener('touchstart', eraserMethods.touchStart);
      _canvas.addEventListener('touchmove', eraserMethods.touchMove);
      _canvas.addEventListener('touchend', eraserMethods.touchEnd);

      // reset parts
      while (n--) parts.push(1);

      // store values
      data = {
        posX: pos.left,
        posY: pos.top,
        touchDown: false,
        touchID: -999,
        touchX: 0,
        touchY: 0,
        ptouchX: 0,
        ptouchY: 0,
        canvas: _canvas,
        canvasForShow: _canvasForShow,
        ctx: ctx,
        ctxForShow: ctxForShow,
        w: width,
        h: height,
        source: this,
        size: size,
        parts: parts,
        colParts: colParts,
        numParts: numParts,
        ratio: 0,
        complete: false,
        scale: _this.scale, //图片原图适配屏幕缩放程度
        completeRatio: completeRatio,
        completeFunction: completeFunction,
        completeOnce: completeOnce,
        movingHandle: movingHandle
      };
      _canvas.eraser = data;

      // listen for resize event to update offset values
      window.onresize = function () {
        let pos = {
          top: _canvas.offsetTop,
          left: _canvas.offsetLeft
        }
        data.posX = pos.left;
        data.posY = pos.top;
      };
    }
  },
  touchStart: function (event) {
    document.getElementById('showBox').style.visibility = 'visible'

    let _this = this,
      data = _this.eraser;
    if (!data.touchDown) {
      let t = event.changedTouches[0],
        tx = t.pageX - data.posX,
        ty = t.pageY - data.posY;
      eraserMethods.evaluatePoint(data, tx / data.scale, ty / data.scale);
      data.touchDown = true;
      data.touchID = t.identifier;
      data.touchX = tx;
      data.touchY = ty;

      //设置显示框的显示内容
      data.canvasForShow.parentElement.style.left = (data.canvasForShow.parentElement.parentElement.offsetWidth / 2 - data.touchX / data.scale) + 'px'
      data.canvasForShow.parentElement.style.top = (data.canvasForShow.parentElement.parentElement.offsetHeight / 2 - data.touchY / data.scale) + 'px'

      event.preventDefault();
    }
  },
  touchMove: function (event) {

    let _this = this,
      data = _this.eraser;

    if (data.touchDown) {
      let ta = event.changedTouches,
        n = ta.length;
      while (n--)
        if (ta[n].identifier == data.touchID) {
          let tx = ta[n].pageX - data.posX,
            ty = ta[n].pageY - data.posY;
          eraserMethods.evaluatePoint(data, tx / data.scale, ty / data.scale);

          data.ctx.beginPath();
          data.ctx.moveTo(data.touchX / data.scale, data.touchY / data.scale);

          data.ctxForShow.beginPath();
          data.ctxForShow.moveTo(data.touchX / data.scale, data.touchY / data.scale);

          data.touchX = tx;
          data.touchY = ty;

          //设置显示框的显示内容     
          data.canvasForShow.parentElement.style.left = (data.canvasForShow.parentElement.parentElement.offsetWidth / 2 - data.touchX / data.scale) + 'px'
          data.canvasForShow.parentElement.style.top = (data.canvasForShow.parentElement.parentElement.offsetHeight / 2 - data.touchY / data.scale) + 'px'

          data.ctx.lineTo(data.touchX / data.scale, data.touchY / data.scale);
          data.ctx.stroke();

          data.ctxForShow.lineTo(data.touchX / data.scale, data.touchY / data.scale);
          data.ctxForShow.stroke();
          data.isHasMove = true //滑动过，说明图片改变，需要记录给撤销重做
          event.preventDefault();
          break;
        }
    }
  },
  touchEnd: function (event) {
    document.getElementById('showBox').style.visibility = 'hidden'
    let _this = this,
      data = _this.eraser;

    if (data.touchDown) {
      let ta = event.changedTouches,
        n = ta.length;
      while (n--)
        if (ta[n].identifier == data.touchID) {
          data.touchDown = false;
          event.preventDefault();
          break;
        }
    }
    eraserMethods.evaluatePoint(data);
  },

  evaluatePoint: function (data, tx, ty) {
    if (tx || tx == 0) {

      data.movingHandle && data.movingHandle(data, tx * data.scale, ty * data.scale)

      let p = Math.floor(tx / data.size) + Math.floor(ty / data.size) * data.colParts;
      if (p >= 0 && p < data.numParts) {

        data.ratio += data.parts[p];
        data.parts[p] = 0;

        if (!data.complete) {
          if (data.ratio / data.numParts >= data.completeRatio) {
            data.complete = true;

            if (data.completeFunction != null) {
              data.completeFunction();

            }
          }
        }
      }
    } else if (data.isHasMove) {
      data.isHasMove = false
      data.completeOnce && data.completeOnce(data)
    }


  },

  mouseDown: function (event) {
    document.getElementById('showBox').style.visibility = 'visible'
    let _this = this,
      data = _this.eraser,
      tx = event.pageX - data.posX,
      ty = event.pageY - data.posY;
    eraserMethods.evaluatePoint(data, tx / data.scale, ty / data.scale);
    data.touchDown = true;
    data.touchX = tx;
    data.touchY = ty;

    //设置显示框的显示内容       
    data.canvasForShow.parentElement.style.left = (data.canvasForShow.parentElement.parentElement.offsetWidth / 2 - data.touchX / data.scale) + 'px'
    data.canvasForShow.parentElement.style.top = (data.canvasForShow.parentElement.parentElement.offsetHeight / 2 - data.touchX / data.scale) + 'px'

    data.ctx.beginPath();
    data.ctx.moveTo(data.touchX / data.scale - 1, data.touchX / data.scale);
    data.ctx.lineTo(data.touchX / data.scale, data.touchX / data.scale);
    data.ctx.stroke();
    data.ctxForShow.beginPath();
    data.ctxForShow.moveTo(data.touchX / data.scale - 1, data.touchX / data.scale);
    data.ctxForShow.lineTo(data.touchX / data.scale, data.touchX / data.scale);
    data.ctxForShow.stroke();
    _this.addEventListener('mousemove', eraserMethods.mouseMove);
    _this.addEventListener('mouseup', eraserMethods.mouseUp);
    event.preventDefault();
  },

  mouseMove: function (event) {

    let _this = this,
      data = _this.eraser,
      tx = event.pageX - data.posX,
      ty = event.pageY - data.posY;
    eraserMethods.evaluatePoint(data, tx / data.scale, ty / data.scale);
    data.ctx.beginPath();
    data.ctx.moveTo(data.touchX / data.scale, data.touchX / data.scale);
    data.ctxForShow.beginPath();
    data.ctxForShow.moveTo(data.touchX / data.scale, data.touchX / data.scale);
    data.touchX = tx;
    data.touchY = ty;

    //设置显示框的显示内容       
    data.canvasForShow.parentElement.style.left = (data.canvasForShow.parentElement.parentElement.offsetWidth / 2 - data.touchX / data.scale) + 'px'
    data.canvasForShow.parentElement.style.top = (data.canvasForShow.parentElement.parentElement.offsetHeight / 2 - data.touchX / data.scale) + 'px'


    data.ctx.lineTo(data.touchX / data.scale, data.touchX / data.scale);
    data.ctx.stroke();
    data.ctxForShow.lineTo(data.touchX / data.scale, data.touchX / data.scale);
    data.ctxForShow.stroke();
    data.isHasMove = true //滑动过，说明图片改变，需要记录给撤销重做
    event.preventDefault();
  },

  mouseUp: function (event) {
    document.getElementById('showBox').style.visibility = 'hidden'
    let _this = this
    let data = _this.eraser;
    data.touchDown = false;
    _this.removeEventListener('mousemove', eraserMethods.mouseMove);
    document.removeEventListener('mouseup', data, eraserMethods.mouseUp);
    eraserMethods.evaluatePoint(data);
    event.preventDefault();
  },

  clear: function () {

    let _this = document.getElementById(this.id)

    let data = _this.eraser;
    if (data) {
      data.ctx.clearRect(0, 0, data.w, data.h);
      data.ctxForShow.clearRect(0, 0, data.w, data.h);
      let n = data.numParts;
      while (n--) data.parts[n] = 0;
      data.ratio = data.numParts;
      data.complete = true;
      if (data.completeFunction != null) data.completeFunction();
    }
  },

  size: function (value) {
    let _this = this,
      data = _this.eraser;
    if (data && value) {
      data.size = value;
      data.ctx.lineWidth = value;
      data.ctxForShow.lineWidth = value;
      changeSizeShow({
        ele: document.getElementById('pencilShow'),
        size: value,
        scale: data.scale,
        width: data.width
      })
    }
  },

  reset: function () {

    let _this = document.getElementById(this.id)
    let data = _this.eraser;
    if (data) {
      data.ctx.globalCompositeOperation = "source-over";
      data.ctx.drawImage(data.source, 0, 0, data.w, data.h);
      data.ctx.globalCompositeOperation = "destination-out";
      data.ctxForShow.globalCompositeOperation = "source-over";
      data.ctxForShow.drawImage(data.source, 0, 0, data.w, data.h);
      data.ctxForShow.globalCompositeOperation = "destination-out";
      let n = data.numParts;
      while (n--) data.parts[n] = 1;
      data.ratio = 0;
      data.complete = false;
    }
  }

};

//修改预览图中圆圈大小
function changeSizeShow(opt) { //ele, size, scale,width
  opt.ele.style.borderWidth = Math.ceil(opt.size / 4) + 'px'
  opt.ele.style.width = opt.size + 'px'
  opt.ele.style.height = opt.size + 'px'
  opt.ele.style.margin = `${-opt.size /2}px 0 0 ${-opt.size /2}px`
}


function eraserHandle(ele, method) {
  if (eraserMethods[method]) {
    eraserMethods[method].apply(ele, Array.prototype.slice.call(arguments, 2))
  } else if (typeof method === 'object' || !method) {
    eraserMethods.init.apply(ele, [method]);
  } else {
    console.log('Method ' + method + ' does not yet exist on jQuery.eraser');
  }
}


function gainTopForWin(obj) {
  let TopNum = obj.offsetTop,
    parent = obj.offsetParent
  while (parent != null) {
    TopNum += parent.offsetTop;
    parent = parent.offsetParent;
  };
  return TopNum
}

function gainLeftForWin(obj) {
  let leftNum = obj.offsetLeft,
    parent = obj.offsetParent
  while (parent != null) {
    leftNum += parent.offsetLeft;
    parent = parent.offsetParent;
  };
  return leftNum
}



export default eraserHandle
