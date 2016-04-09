/**
 * Created by foolgryw on 2016/4/8.
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
*    "北京": 90,
*    "上海": 40
* };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input"),
        qvalue = document.getElementById("aqi-value-input");
    var reCity = /^[a-z\u4e00-\u9fa5]+$/i,
        reQvalue = /^\d+$/;
    var cityValue = trim(city.value),
        qvalueValue = trim(qvalue.value);
    if(!reCity.test(cityValue)) {
        alert("城市名必须为中英文字符");
    } else if(!reQvalue.test(qvalueValue)) {
        alert("空气质量指数必须为整数");
    } else {
        aqiData[city.value] = qvalue.value;

    }


}
/*
    去除字符串前后空格
 */
function trim (str) {
    return str.replace(/^\s+|\s+$/,"");
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var theadStr = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>",
        str = '';

    for(var city in aqiData) {
        str += "<tr><td>" + city +
            "</td><td>" + aqiData[city] +
            "</td><td><button>删除</button></td></tr>";
    }

    var tab = document.getElementById("aqi-table");
    if(! isEmpty(aqiData)) {
        tab.innerHTML = theadStr + str;
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(btnDel) {
// do sth.
    var cityName = btnDel.parentNode.parentNode.children[0].innerHTML;

    for(var city in aqiData) {
        if(city == cityName) {
            delete aqiData[city];
        }
    }
    renderAqiList();

    if(isEmpty(aqiData)) {
        var tab = document.getElementById("aqi-table");
        tab.innerHTML = '';
    }
}
/*
判断对象是否为空
 */
function isEmpty(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}


function init() {

// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btn = document.getElementById("add-btn");
    //console.log(btn);
    btn.onclick = addBtnHandle;

// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var tab = document.getElementById("aqi-table"),
        btns = tab.getElementsByTagName("button");
    tab.onclick = function (e) {
        var e = e || window.event,
            target = e.target || e.srcElement;
        //console.log(target.tagName);
        if(target.tagName == 'BUTTON') {
            delBtnHandle(target);
        }
    }

}

init();
