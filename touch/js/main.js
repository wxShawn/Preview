window.onload = function(){
    touch();
}

function toStringTime(num){
    if(num >= 3600) return 0;
    var x = new Array;
    var a = parseInt(num/60);
    var b = parseInt(num%60);
    if(a < 10){
        x[0] = "0" + a;
    }
    else{
        x[0] = a.toString();
    }
    if(b < 10){
        x[1] = "0" + b;
    }
    else{
        x[1] = b.toString();
    }
    return x;
}

function stopPropagation(e) {
    e = e || window.event;
    if(e.stopPropagation) { 
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

function touch(){
    
    var con = document.getElementById("con");
    var start = document.getElementById("start");
    var squares = con.getElementsByClassName("square");
    var t = document.getElementById("time");
    var s = document.getElementById("score");
    var l = document.getElementById("life");
    var timer;
    
    //游戏时间、分数、生命值
    var time = 0;
    var score = 0;
    var life = 5;

    //开始游戏
    start.onclick = function(){

        //初始化
        time = 0;
        score = 0;
        life = 5;
        updateTime();
        updateScore();
        updateLife();
        
        start.style.display = "none";
        creatSquare();

        //开始计时
        timer = setInterval(function(){
            time++;
            updateTime();
        },1000);

        //点击背景减少life
        con.onclick = function(){
            life--;
            updateLife();

            //生命值为0时游戏结束
            if(life <= 0){
                gameOver();
            }
        }
    }

    //同步时间
    function updateTime(){
        t.innerText = "time: " + toStringTime(time)[0] + ":" + toStringTime(time)[1];
    }

    //同步分数
    function updateScore(){
        s.innerText = "score: " + score;
    }

    //同步生命
    function updateLife(){
        var txt = "";
        for(var i = 0; i < life; i++){
            txt += "*";
        }
        l.innerText = txt;
    }

    //创建&添加方块
    function creatSquare(){
        var square = document.createElement("div");
        var leftValue = ["0","25%","50%","75%"];
        square.className = "square";
        square.style.left = leftValue[parseInt(Math.random()*3.999)];
        square.style.background = "rgb(" + parseInt(Math.random()*255) +  "," + parseInt(Math.random()*255) + "," + parseInt(Math.random()*255) + ")";
        square.speed = 0;

        //方块的移动
        square.fall = function(speed){
            square.speed = speed;
            square.timer = setInterval(function(){
                square.style.top = square.offsetTop + 2 + "px";

                //添加下一个方块
                if(squares[squares.length-1] && squares[squares.length-1].offsetTop >= 0){
                    creatSquare();
                }

                //删除超出屏幕的方块
                if(square.offsetTop >= con.offsetHeight){
                    clearInterval(square.timer);
                    con.removeChild(square);
                    life--;
                    updateLife();
                    if(life <= 0){
                        gameOver();
                    }
                }
            },speed);
        }
        
        //点击方块后删除方块并加分
        square.onclick = function(){
            clearInterval(square.timer);
            con.removeChild(square);
            score += 5;
            updateScore();
            stopPropagation();
        }

        //改变速度
        function changeSpeed(speed){
            for(var i = 0; i < squares.length; i++){
                if(squares[i].speed != speed){
                    clearInterval(squares[i].timer);
                    squares[i].fall(speed);
                }
            }
        }

        con.appendChild(square);
        switch(true){
            case time < 10:
                square.fall(10);
                break;
            case time < 20:
                square.fall(9);
                changeSpeed(9);
                break;
            case time < 30:
                square.fall(8);
                changeSpeed(8);
                break;
            case time < 45:
                square.fall(7);
                changeSpeed(7);
                break;
            case time < 60:
                square.fall(6);
                changeSpeed(6);
                break;
            default:
                square.fall(5);
                changeSpeed(5);
        }
    }

    //结束游戏
    function gameOver(){

        //停止计时
        clearInterval(timer);
        alert("Game Over! " + "  " + t.textContent + "  " + s.textContent);

        //删除所有方块
        for(var i = 0; i < squares.length; i++){
            clearInterval(squares[i].timer);
        }
        con.innerHTML = "";

        start.style.display = "block";
        start.value = "try again";
    }
    
}