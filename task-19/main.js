/**
 * Created by foolgryw on 2016/4/10.
 */
var txt = $('txt'),
    leftIn = $('leftIn'),
    leftOut = $('leftOut'),
    rightIn = $('rightIn'),
    rightOut = $('rightOut'),
    sortBtn = $('sort-btn'),
    dataBtn = $('data-btn'),
    list = $('list'),
    timer = null;

function createHandler() {
    if(list.children.length >= 60) {
        alert('输入已满60个');
        return;
    }
    if(!(txt.value < 100 && txt.value > 10)) {
        alert("输入必须是10-100的数字");
        return;
    }

    var li = document.createElement("li");

    // 将高度设置为输入值的二倍
    li.style.height = txt.value * 2 + 'px';

    // 保证从底部对齐
    li.style.marginTop = 200 - txt.value * 2 + 'px';

    li.innerHTML = txt.value;
    txt.value = ''; //置空以便下次用户输入

    return li;
}

// 左侧入
leftIn.onclick = function () {

    var li = createHandler();

    if(list.children.length == 0) {
        list.appendChild(li);
    } else {
        list.insertBefore(li, list.firstChild);
    }
}

// 右侧入
rightIn.onclick = function () {

    var li = createHandler();

    list.appendChild(li);
}

// 左侧出
leftOut.onclick = function () {
    if(list.children.length !== 0) {
        var first = list.removeChild(list.firstElementChild);
        alert(first.innerHTML);
    }
}

// 右侧出
rightOut.onclick = function () {
    if(list.children.length !== 0) {
        var last = list.removeChild(list.lastElementChild);
        alert(last.innerHTML);
    }
}

sortBtn.onclick = function () {
    var lis = list.getElementsByTagName("li"),
        len = lis.length,
        i = 0,
        j;

    // 防止多次点击排序产生的问题
    clearInterval(timer);

    /*
        为了看出效果，把冒泡排序外边的一个for循环换成定时器；
        想法和实现都比较简单，但是效果可能没有那么绚丽；
     */
    timer = setInterval(function () {
        if(i < len -1) {
            for(j = 0; j < len - 1 - i; j++) {
                if(lis[j].innerHTML > lis[j + 1].innerHTML) {

                    //将移动过的元素背景颜色改为绿色，看的更为清楚；
                    lis[j].style.backgroundColor = '#0f0';
                    list.insertBefore(lis[j + 1] , lis[j]);
                }
            }
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100);

}

// 给随机数按钮添加产生随机数据函数
dataBtn.onclick = randomData;

/*
    产生一组数量为60的随机数并插入DOM；
    这样频繁操作DOM会带来一些性能问题；
*/
function randomData() {    clearInterval(timer);
    list.innerHTML = '';
    var i, tmp;
    for(i = 0; i < 60; i++) {
        tmp = 10 + Math.floor(Math.random() * 90);
        var li = document.createElement("li");
        li.style.height = tmp * 2 + 'px';
        li.style.marginTop = 200 - tmp * 2 + 'px';
        li.innerHTML = tmp;
        list.appendChild(li);
    }

}

//通过id获取DOM元素
function $(id) {
    return document.getElementById(id);
}