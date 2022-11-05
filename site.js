const tab = [];
let state="menu";
let difficulty="średni"
let intervalTime = 60;
let positionPlayerX=7;
let positionAI=7;
let gameInterval=null;
let rows=20; //liczba wierszy
let col=81; //liczba kolumn
let ballSpeedX=1; ballSpeedY=-1;
let ballX=9; ballY=40;
let pointsPlayer=0;pointsComputer=0;
let pongFlashInterval= null;
let menuState=0;
for (i = 0; i < rows; i++) {
    const tab2 = []
    for (j = 0; j < col; j++) {
        tab2.push(" ");
    }
    tab.push(tab2);
}
function clear(){
    for (i = 0; i < rows; i++) {
        for (j = 0; j < col; j++) {
            tab[i][j]=" ";
        }
    }
}

function Draw(){
    //linia
    for(let x=0;x<rows;x++){
        tab[x][40]="|";
    }
    let i=0; j=0;
    //paletka Gracz
    while(i<5){
        tab[positionPlayerX+i][3]="$";
        i++;
    }
    //paletka AI
    while(j<5){
        tab[positionAI+j][77]="$";
        j++;
    }
    tab[ballX][ballY]="O";
}
function End(){
    console.log("Raz");
    clear();
    clearInterval(gameInterval);
    clearInterval(pongFlashInterval);
    state="End";
    string= "Koniec gry"
    for(let j=0;j<string.length;j++){
        for(let i=0;i<string.length;i++){
            tab[9][20+i]=string[i]
        }
    }
    score= "Wynik:"
    let i=0;
    for(i=0;i<score.length;i++){
        tab[11][20+i]=score[i]
    }
    tab[11][22+score.length]=pointsPlayer;
    tab[11][23+score.length]=":";
    tab[11][24+score.length]=pointsComputer;
    
    document.body.innerHTML = null;
    document.body.innerHTML="Poziom " +difficulty+" Wynik: "+ pointsPlayer +":"+pointsComputer;
    string2= "Naciśnij ESC, aby wrócić do Menu"
    for(let j=0;j<string2.length;j++){
        for(let i=0;i<string2.length;i++){
            tab[14][20+i]=string2[i]
        }
    }
    createTable(tab);
    
}
function Ball(){
    //krawędzie
    if(ballX==rows-1 || ballX==0){
        ballSpeedX =-ballSpeedX;
    }

    if(ballY==col-1){
        alert("Zdobyłeś punkt!");
        ballX=9; ballY=40;
        pointsPlayer++;
        if(pointsPlayer==3)End();
    }
    if(ballY==0){
        alert("Komputer zdobył punkt!");
        ballX=9; ballY=40;
        pointsComputer++;
        if(pointsComputer==3)End();
    }
    //odbicie od paletki gracza
    for(let p=0;p<5;p++){
        if(ballX==positionPlayerX+p && ballY<=3){
            //ballSpeedX =-ballSpeedX;
            ballSpeedY =-ballSpeedY;
        }
    }
    //odbicie od paletki komputera
    for(let p=0;p<5;p++){
        if(ballX==positionAI+p && ballY>=77){
            ballSpeedY =-ballSpeedY;
            //ballSpeedX=-ballSpeedX;
        }
    }
    ballX+=ballSpeedX;
    ballY+=ballSpeedY;
    
    tab[ballX][ballY]="O";
}
function AIPosition(){
    //jeśli piłka po stronie prawej
    switch(difficulty){
        case "trudny":
            if(ballY>40){
                if(ballX>positionAI-2){
                    if(ballX-positionAI<0){
                        if(positionAI!=0){
                        
                            positionAI--;
                        }
                    }
                    if(ballX-positionAI>0){
                        if(positionAI!=rows-5){
                            positionAI++;
                        }
                    }
                }
            }
            break;
        case "średni":
            if(ballY>62){
                if(ballX>=positionAI-2){
                    if(ballX-positionAI<=0){
                        if(positionAI!=0){
                            positionAI--;
                        }
                    }
                    if(ballX-positionAI>0){
                        if(positionAI!=rows-5){
                            positionAI++;
                        }
                    }
                }
            }
            break;
        case "łatwy":
            if(ballX>=positionAI-2){
                let buf=Math.floor(Math.random()*10+1)
                if(buf%2){
                    if(positionAI!=0){
                        positionAI--;
                    }
                }
                else{
                    if(positionAI!=rows-5){
                        positionAI++;
                    }
                }
            }
    }
}
function GameLoop(){
    if(state!="game"){
        End();
        return;
    }
    document.body.innerHTML = null;
    document.body.innerHTML="Poziom " +difficulty+" Wynik: "+ pointsPlayer +":"+pointsComputer;
    clear();
    Draw();
    createTable(tab);
    Ball();
    AIPosition();
}
function NewGame(){
    pointsPlayer=0;pointsComputer=0;
    positionPlayerX=7;positionAI=7;ballX=9; ballY=40;
    Game();
}
function Game(){
    state="game";
    document.body.innerHTML = null;
    document.body.innerHTML="Poziom " +difficulty+" Wynik: "+ pointsPlayer +":"+pointsComputer;
    clear();
    Draw();
    createTable(tab);
    gameInterval=setInterval(GameLoop,intervalTime);
    clearInterval(pongFlashInterval);
}
function changeDifficultyRight(){
     switch(difficulty){
         case "średni": 
            difficulty="trudny";
            break;   
        case "trudny": 
            difficulty="łatwy";
             break;
        case "łatwy": 
            difficulty="średni";
            break;
     }
    MainLoop();
}
function changeDifficultyLeft(){
    switch(difficulty){
        case "średni": 
           difficulty="łatwy";
           break;   
       case "trudny": 
           difficulty="średni";
            break;
       case "łatwy": 
           difficulty="trudny";
           break;
    }
   MainLoop();
}
function MainLoop(){
    
    state="menu";
    document.body.innerHTML = null;
    document.body.innerHTML="Poziom " +difficulty+" Wynik: "+ pointsPlayer +":"+pointsComputer;
    clearInterval(pongFlashInterval);
    clear();
    
    tab[1][2] = "#";tab[2][2] = "#";tab[3][2] = "#";tab[4][2] = "#";tab[5][2] = "#";tab[4][3] = "#";tab[3][4] = "#";tab[4][5] = "#";
    tab[5][6] = "#";tab[4][6] = "#";tab[3][6] = "#";tab[2][6] = "#";tab[1][6] = "#"; //W
    tab[1][9] = "#";tab[2][9] = "#";tab[3][9] = "#";tab[4][9] = "#";tab[5][9] = "#"; //I
    tab[1][12] = "#";tab[1][13] = "#";tab[1][14] = "#";tab[1][15] = "#";tab[1][16] = "#";//T
    tab[2][14] = "#";tab[3][14] = "#";tab[4][14] = "#";tab[5][14] = "#";
    tab[1][18] = "#";tab[2][18] = "#";tab[3][18] = "#";tab[4][18] = "#";tab[5][18] = "#";
    tab[1][19] = "#";tab[1][20] = "#";tab[1][21] = "#";tab[3][19] = "#";tab[3][20] = "#";
    tab[2][21] = "#";tab[3][21] = "#";tab[4][21] = "#";tab[5][21] = "#";tab[1][26] = "#";//A
    tab[5][24] = "#";tab[4][24] = "#";tab[5][25] = "#";tab[4][26] = "#";tab[5][26] = "#";tab[3][26] = "#";tab[2][26] = "#";
    
    tab[9][2]="Z";tab[9][3]="M";tab[9][4]="I";tab[9][5]="A";tab[9][6]="N";tab[9][7]="A";
    tab[9][9]="T";tab[9][10]="R";tab[9][11]="Y";tab[9][12]="B";tab[9][13]="U";
    tab[9][15]="G";tab[9][16]="R";tab[9][17]="Y";   
    for(i=0;i<difficulty.length;i++){
        tab[9][20+i]=difficulty[i]
    }


    tab[16][2]="N";tab[16][3]="A";tab[16][4]="C";tab[16][5]="I";tab[16][6]="Ś";tab[16][7]="N";tab[16][8]="I";tab[16][9]="J";
    tab[16][11]="E";tab[16][12]="N";tab[16][13]="T";tab[16][14]="E";tab[16][15]="R";tab[16][17]="A";tab[16][18]="B";tab[16][19]="Y";
    tab[16][21]="G";tab[16][22]="R";tab[16][23]="A";tab[16][24]="Ć";
    
    pongFlashInterval= setInterval(function() {
        document.body.innerHTML = null;
        document.body.innerHTML="Poziom " +difficulty+" Wynik: "+ pointsPlayer +":"+pointsComputer;
        if(menuState==0){
            menuState=1;
            tab[1][38]="#";tab[2][38]="#";tab[3][38]="#";tab[4][38]="#";tab[5][38]="#";tab[1][41]="#";tab[1][42]="#";tab[1][40]="#";
            tab[2][42]="#";tab[3][42]="#";tab[3][41]="#";tab[3][40]="#"; tab[1][39]="#";tab[3][39]="#";//P
            tab[1][46]="#";tab[5][46]="#";
            tab[1][45]="#";tab[2][45]="#";tab[3][45]="#";tab[4][45]="#";tab[5][45]="#";tab[1][47]="#";tab[1][48]="#";tab[1][49]="#";
            tab[2][49]="#";tab[3][49]="#";tab[4][49]="#";tab[5][49]="#";tab[5][48]="#";tab[5][47]="#"; //o
            tab[1][52]="#";tab[2][52]="#";tab[3][52]="#";tab[4][52]="#";tab[5][52]="#";tab[2][53]="#";tab[3][54]="#";tab[4][55]="#";
            tab[5][56]="#";tab[4][56]="#";tab[3][56]="#";tab[2][56]="#";tab[1][56]="#";
            tab[1][59]="#";tab[2][59]="#";tab[3][59]="#";tab[4][59]="#";tab[5][59]="#";//G
            tab[1][60]="#";tab[1][61]="#";tab[1][62]="#";tab[1][63]="#";
            tab[5][60]="#";tab[5][61]="#";tab[5][62]="#";tab[5][63]="#";
            tab[4][63]="#";tab[3][63]="#";tab[3][62]="#";tab[3][61]="#";            
        }
        else{
            menuState=0;
            tab[1][38]="";tab[2][38]="";tab[3][38]="";tab[4][38]="";tab[5][38]="";tab[1][41]="";tab[1][42]="";tab[1][40]="";
            tab[2][42]="";tab[3][42]="";tab[3][41]="";tab[3][40]=""; tab[1][39]="";tab[3][39]="";//P
            tab[1][46]="";tab[5][46]="";
            tab[1][45]="";tab[2][45]="";tab[3][45]="";tab[4][45]="";tab[5][45]="";tab[1][47]="";tab[1][48]="";tab[1][49]="";
            tab[2][49]="";tab[3][49]="";tab[4][49]="";tab[5][49]="";tab[5][48]="";tab[5][47]=""; //o
            tab[1][52]="";tab[2][52]="";tab[3][52]="";tab[4][52]="";tab[5][52]="";tab[2][53]="";tab[3][54]="";tab[4][55]="";
            tab[5][56]="";tab[4][56]="";tab[3][56]="";tab[2][56]="";tab[1][56]="";
            tab[1][59]="";tab[2][59]="";tab[3][59]="";tab[4][59]="";tab[5][59]="";//G
            tab[1][60]="";tab[1][61]="";tab[1][62]="";tab[1][63]="";
            tab[5][60]="";tab[5][61]="";tab[5][62]="";tab[5][63]="";
            tab[4][63]="";tab[3][63]="";tab[3][62]="";tab[3][61]="";
            
        }
        createTable(tab);
    }, 1000);
    createTable(tab);
}
function createTable(tableData) {
    //clear();
    
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    tableData.forEach(function (rowData) {
        var row = document.createElement('tr');

        rowData.forEach(function (cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            //cell.innerHtml = cellData;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);
    
}
//createTable(tab);
MainLoop();
document.addEventListener('keydown',(event)=>{
    if(event.code=='Enter'&&state=="menu") NewGame();
    if(event.code== 'ArrowRight'&& state=="menu") changeDifficultyRight();
    if(event.code== 'ArrowLeft'&& state=="menu") changeDifficultyLeft();
    if(event.code=='Escape'&&state=="End") MainLoop();
    if(event.code=='Escape'&&state=="game") MainLoop();
    if(event.code=='ArrowDown'&&state=="game") {
        if(positionPlayerX!=rows-5){
            positionPlayerX++;
        }
    }
    if(event.code=='ArrowUp'&&state=="game") {
        if(positionPlayerX!=0){
            positionPlayerX--;
        }
    }
},false)