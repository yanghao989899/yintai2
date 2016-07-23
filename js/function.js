/*
  getClass(select)
     获取具有指定class的元素的集合
  select  指定的className
  context 指定的范围
*/

function getClass(select, context) {
  var context = context ? context : document;
  if (document.getElementsByClassName) {
    return context.getElementsByClassName(select)
  } else {
    var all = context.getElementsByTagName("*");
    var arr = [];
    for (var i = 0; i < all.length; i++) {
      if (checkclass(all[i].className, select)) {
        arr.push(all[i])
      }
    }
    return arr;
  }
}

function checkclass(className, select) {
  var arr = className.split(" ");
  for (var j = 0; j < arr.length; j++) {
    if (arr[j] == select) {
      return true;
    }
  }
  return false;
}

/*
   $(string)  获取页面中的元素
   ".one"     获取指定类名的元素的集合
   "#one"     获取指定ID的第一个元素
   "div"      获取指定标签的元素集合

   思路：
      第一步：判断字符串的首字符
      第二步：.   getClass()
             #    document.getElementById
             div  document.getElementsByTagName
*/

function $(selector, context) {
  if (typeof selector == "string") {
    var context = context || document
    if (selector.charAt(0) == ".") {
      return getClass(selector.slice(1));
    } else if (selector.charAt(0) == "#") {
      return document.getElementById(selector.slice(1))
    } else if (/^[a-z][a-z1-6]{0,8}$/.test(selector)) {
      return context.getElementsByTagName(selector)
    } else if (/^<[a-z][a-z1-6]{0,8}>$/.test(selector)) {
      return document.createElement(selector.slice(1, -1))
    }
  } else if (typeof selector == "function") {
    addEvent(window, "load", selector);
  }
}


function setContent(obj, val) {
  if (val) {
    if (obj.innerText) {
      obj.innerText = val;
    } else {
      obj.textContent = val;
    }
  } else {
    if (obj.innerText) {
      return obj.innerText;
    } else {
      return obj.textContent
    }
  }
}

//获取指定元素样式的函数

function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, null)[attr];
  }
}

/*
   getChild(obj,type)
   获取指定元素的子节点
   obj：指定的对象
   type：获取字节点的类型

   思路：
      第一步:获取所有的子节点
      第二步:声明一个空数组
      第三步:遍历所有子节点
             通过子节点的类型
               true  child[i].nodeType==1
               flase child[i].nodeType==3||child[i].nodeType==3&&!(/^\s+$/.test(child[i].nodeValue))
      第四步:返回这个数组
*/

function getChild(obj, type) {
  var child = obj.childNodes;
  var type = type == undefined ? true : type;
  var arr = [];
  for (var i = 0; i < child.length; i++) {
    if (type === true) {
      if (child[i].nodeType == 1) {
        arr.push(child[i]);
      }
    } else {
      if (child[i].nodeType == 1 || (child[i].nodeType == 3 && !(/^\s+$/.test(child[i].nodeValue)))) {
        arr.push(child[i])
      }
    }
  }
  return arr;
}
//获取第一个子节点

function firstChild(obj, type) {
  return getChild(obj, type)[0];
  console.log(obj)
}
//获取最后一个子节点

function lastChild(obj, type) {
  var length = getChild(obj, type).length;
  return getChild(obj, type)[length - 1];
}
// 获取第一个子节点
//获取最后一个子节点
//获取任意一个子节点

function randomChild(obj, type, num) {
  return getChild(obj, type)[num];
}
/*
  getNext(obj)
  获得下一个元素节点
  思路：
       判断obj是否有下一个兄弟元素
       没有    false
       有      更新next=next.nextSibling
               判断next是否为空
       return next；
*/

function getNext2(obj) {
  var next = obj.nextSibling;
  if (next == null) {
    return false;
  }
  while (next.nodeType == 8 || next.nodeType == 3) {
    next = next.nextSibling;
    if (next == null) {
      return false;
    }
  }
  return next;
}
//获取下一个元素节点或者文本节点

function getNext1(obj) {
  var next = obj.nextSibling;
  if (next == null) {
    return false;
  }
  while (next.nodeType == 8 || (next.nodeType == 3 && (/^\s+$/.test(next.nodeValue)))) {
    next = next.nextSibling;
    if (next == null) {
      return false;
    }
  }
  return next;
}

function getNext(obj, type) {
  if (type) {
    return getNext1(obj, type)
  } else {
    return getNext2(obj, type)
  }
}
/*
   getPrevious(obj)
   获取上一个元素节点
*/

function getPrevious(obj) {
  var previous = obj.previousSibling;
  if (previous == null) {
    return false;
  }
  while (previous.nodeType == 8 || previous.nodeType == 3) {
    previous = previous.previousSibling;
    if (previous == null) {
      return false;
    }
  }
  return previous;
}

/*
    insertAfter(obj,obj1)
    将obj插入到obj1后面
    思路：  将obj插入到obj的下一个兄弟节点的前面
        1.获取obj1的下一个兄弟节点和父节点
        2.判断兄弟节点
          true   parent.insertBefore(obj,next)
          false  parent.appendChild(obj,obj1)
*/

function insertAfter(obj, obj1) {
  var parent = obj1.parentNode;
  var next = getNext(obj1);
  if (next) {
    parent.insertBefore(obj, next);
  } else {
    parent.appendChild(obj, obj1);
  }
}
//将obj插入到obj1对象之前

function insertBefore(obj, obj1) {
  var parent = obj1.parentNode;
  parent.insertBefore(obj, obj1);
}
/*
    appendBefore(obj,objs)   objs是父元素
    将obj插入到父元素objs的最前面
    思路：
       1.找到objs的第一个子元素
       2.判断是否有子元素
       true   objs.insertBefore(子元素第一个)
       false  objs.appendChild(obj)
*/

function appendBefore(obj, objs) {
  var child = firstChild(objs);
  if (child) {
    objs.insertBefore(obj, child);
  } else {
    objs.appendChild(obj);
  }
}
//添加事件的函数

function addEvent(obj, type, fn) {
  if (obj.attachEvent) {
    obj.attachEvent("on" + type, fn)
  } else {
    obj.addEventListener(type, fn, false)
  }
}

function removeEvent(obj, type, fn) {
  if (obj.attachEvent) {
    obj.detachEvent("on" + type, fn)
  } else {
    obj.removeEventListener(type, fn, false)
  }
}

function offset(obj) {
  var result = {
    left: 0,
    top: 0
  };
  var arr = [];
  arr.push(obj);
  var parent = obj.parentNode;
  while (parent.nodeName !== "BODY") {
    if (getStyle(parent, "position") == "relative" || getStyle(parent, "position") == "absolute") {
      arr.push(parent);
    }
    parent = parent.parentNode;
  }
  for (var i = 0; i < arr.length; i++) {
    var left = arr[i].offsetLeft;
    var borderLeft = getStyle(arr[i], "border-left") ? parseInt(getStyle(arr[i], "border-left")) : 0;
    if (i == 0) {
      borderLeft = 0;
    }
    var top = arr[i].offsetTop;
    var borderTop = getStyle(arr[i], "border-top") ? parseInt(getStyle(arr[i], "border-top")) : 0;
    if (i == 0) {
      borderTop = 0;
    }
    result.left += (left + borderLeft);
    result.top += (top + borderTop);
  }
  return result;
}
//滑轮滚动的事件   向下滚动  向上滚动

function mousewheel(obj, downFn, upFn) {
  if (document.attachEvent) {
    document.attachEvent("onmousewheel", scrollFn); //IE、 opera
  } else if (document.addEventListener) {
    document.addEventListener("mousewheel", scrollFn, false);
    //chrome,safari -webkit
    document.addEventListener("DOMMouseScroll", scrollFn, false);
    //firefox -moz-
  }

  function scrollFn(e) {
    var ev = e || window.event;
    var dir = ev.wheelDelta || ev.detail;
    if (ev.preventDefault){
      ev.preventDefault();
    } //阻止默认浏览器动作(W3C)
    else{
      ev.returnValue = false;
    } //IE中阻止函数器默认动作的方式
    if (dir == -120 || dir == 3) {
      downFn();
    } else if (dir == 120 || dir == -3) {
      upFn();
    }
  }
}