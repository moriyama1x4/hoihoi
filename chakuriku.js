﻿var defPosition = [8,200]; //初期位置

var defVeloX = 5; //デフォルトX速度
var veloX = defVeloX; //X速度
var defVeloY = -5; //デフォルトY速度
var veloY = defVeloY; //Y速度

var accelX = 1; //X加速度
var defAccelY = 0.1; //デフォルトY加速度
var accelY = defAccelY; //Y加速度

var brakeX = 1; //X減速度
var brakeY = 1; //Y減速度

var defWinLose = 6; //デフォルト勝敗判定値
var winLose = defWinLose; //勝敗判定値

var defLevel = 3; //デフォルトレベル
var maxLevel = 5; //最大レベル
var level = defLevel; //レベル

var defLandWidth = 250; //デフォルト地面幅
var landWidth = defLandWidth; //地面幅

var timer;　//タイマー


//ボールを座標指定
function setPosition(id, x, y) {
    document.getElementById(id).style.left = x;
    document.getElementById(id).style.top  = y;		  
}

//ボールのX座標取得
function getX(id){
    return parseInt(document.getElementById(id).style.left) ;
}

//ボールのY座標取得
function getY(id){
    return parseInt(document.getElementById(id).style.top);
}

//ボールを動かす
function moveBall(x, y){
    var ballX = getX("blueBall");
    var ballY = getY("blueBall");

    ballX += x;
    ballY += y;
    setPosition("blueBall", ballX, ballY);
}

//地面を作る
function setLand(width, x){
     document.getElementById("land").style.width = width;
     document.getElementById("land").style.left = x;
}

//400pxより右のランダムな位置に地面をつくる
function setRandLand(){
    setLand(landWidth, Math.floor(Math.random() * (400 - landWidth) ) + 400)
}

//地面の左端座標取得
function getLandLeft(){
    return parseInt(document.getElementById("land").style.left) ;
}

//地面の右端座標取得
function getLandRight(){
    return landWidth + getLandLeft() ;
}

//レベル適用
function levelApply(){
    accelY = defAccelY + ((level - 1) * 0.05);
    winLose = defWinLose - ((level - 1) * 1);
    landWidth = defLandWidth - ((level - 1) * 50);
    document.getElementById("level-num").innerHTML=level;
}

//ゲーム動作
function gameBody() {
    moveBall(veloX,veloY);
    
    if(getX("blueBall") > 800 || getX("blueBall") < defPosition[0] || getY("blueBall") < 8){
        alert("着陸失敗・・・(壁に衝突)。 またレベル"+ defLevel +"からチャレンジ！");
        reset();
    }
    else if(getY("blueBall") < 400){
        veloY += accelY;
    }
    else if(getX("blueBall") < getLandLeft() || getX("blueBall") > getLandRight()){
        alert("着陸失敗・・・(地面に着地できなかった)。 またレベル"+ defLevel +"からチャレンジ！");
        reset();
    }
    else{
        if(veloY < winLose){
            if(level >= maxLevel){
                alert("着陸成功！(時速" + (Math.round(veloY * 10) / 10) + "km)。 最大レベルクリア！");
                reset();
            }
            else{
                alert("着陸成功！(時速" + (Math.round(veloY * 10) / 10) + "km)。 レベル"　+ (level+1) + "にチャレンジ！");
                level ++;
                restart();
            }
        }
        else{
            alert("着陸失敗・・・(時速" + (Math.round(veloY * 10) / 10) + "km)。 またレベル"+ defLevel +"からチャレンジ！");
            reset();
        }
    }
}

//開始
function gameStart(){
    if(timer == null){
        timer = setInterval("gameBody()", 50);
    }
}

//停止
function gameStop(){
    clearInterval(timer);
    timer = null;
}

//X加速
function accelerateX(){
    if(timer != null){
        veloX += accelX;
    }
}

//X減速
function brakingX(){
    if(timer != null){
        veloX -= brakeX;
    }
}

//Y減速
function brakingY(){
    if(timer != null){
        veloY -= brakeY;
    }
}

//リスタート
function restart(){
    gameStop();
    setPosition("blueBall", defPosition[0], defPosition[1]);
    veloX = defVeloX;
    veloY = defVeloY;
    levelApply();
    setRandLand();
}

//リセット
function reset(){
    level = defLevel;
    restart();
}

//キーボード操作
document.onkeydown = keydown;
function keydown() {
    if(event.keyCode == 90){
        gameStart(); //「z」で開始
    }
    else if(event.keyCode == 88){
        gameStop(); //「x」で停止
    }
    else if(event.keyCode == 67){
        restart(); //「c」でリスタート
    }
    else if(event.keyCode == 39){
        accelerateX(); //「→」でX加速
    }
    else if(event.keyCode == 37){
        brakingX(); //「←」でX減速
    }
    else if(event.keyCode == 38){
        brakingY(); //「↑」でY減速
    }
}

//アクセス時初期化
window.onload = function(){
    restart();
}