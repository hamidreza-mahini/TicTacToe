function initializeGame(){
    gameEnabled = true;
    turn = 0;
    gameBoard = new Array(3);
    for(i = 0; i < 3; i++){
        gameBoard[i] = new Array(3);
        for(j = 0; j < 3; j++){
            gameBoard[i][j] = -1;
        }
    }
    myAlert('');
    refreshBoard();
}
function refreshBoard(){
    game = document.getElementById('pGame');
    tempStr = '<table class="gameBoard">';
    for(i = 0; i < 3; i++){
        tempStr += '<tr>';
        console.log(tempStr);
        for(j = 0; j < 3; j++){
            switch (gameBoard[i][j]) {
                case 0:
                    cellStat = 'X';
                    break;
                case 1:
                    cellStat = 'O';
                    break;
                default:
                    cellStat = '';
            }
            //tempStr += '<td onclick="changeStat('+i+','+j+')">'+cellStat+'</td>';
            tempStr += '<td class ="'+cellStat+'" onclick="changeStat('+i+','+j+')"> </td>';
        }
        tempStr += '</tr>';
    }
    tempStr += '</table>';
    game.innerHTML = tempStr;

    myAlert('Turn: '+turn2Text(turn));
    return checkWinner();
}
function changeStat(i, j){
    if(gameEnabled) {
        if (gameBoard[i][j] == -1) {
            gameBoard[i][j] = turn;
            turn = (turn + 1) % 2;
            refreshBoard();
        } else {
            myAlert("You can not change the status of this cell!!!");
        }
    }else{
        myAlert("Game Over!!!");
    }
}
function checkWinner(){
    winner = -1;
    for(i = 0; i < 3; i++){
        winner = gameBoard[i][0];
        if(winner!=-1 && gameBoard[i][1]==winner && gameBoard[i][2]==winner){
            myAlertWinner(winner, 0, i);
            return;
        }
        winner = gameBoard[0][i];
        if(winner!=-1 && gameBoard[1][i]==winner && gameBoard[2][i]==winner){
            myAlertWinner(winner, 1, i);
            return;
        }
    }
    winner = gameBoard[0][0];
    if(winner!=-1 && gameBoard[1][1]==winner && gameBoard[2][2]==winner){
        myAlertWinner(winner, 2, 0);
        return;
    }

    winner = gameBoard[0][2];
    if(winner!=-1 && gameBoard[1][1]==winner && gameBoard[2][0]==winner){
        myAlertWinner(winner, 2, 1);
        return;
    }
    temp = true;
    for(i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (gameBoard[i][j] == -1) {
                temp = false;
                break;
            }
        }
    }
    if(temp) {
        myAlertWinner(2);
        return;
    }

}
function myAlertWinner(w, m, n){
    gameEnabled = false;
    winMessage = turn2Text(w)+' has won!';
    myAlert(winMessage);
    //document.getElementById('pTurn').innerHTML = winMessage;
    console.log(m, n);
    tempTable = document.querySelector('table');
    switch (m) {
        case 0://row
            tempTable.rows[n].classList.add('winner');
            break;
        case 1://column
            for(j=0; j<3; j++)
                tempTable.rows[j].cells[n].classList.add('winner');
            //tempTable.rows[1].cells[n].classList.add('winner');
            //tempTable.rows[2].cells[n].classList.add('winner');
            break;
        case 2://diameter
            if(n==0) {
                for(j=0; j<3; j++)
                    tempTable.rows[j].cells[j].classList.add('winner');
                //tempTable.rows[1].cells[1].classList.add('winner');
                //tempTable.rows[2].cells[2].classList.add('winner');
            }else {
                for(j=0; j<3; j++)
                    tempTable.rows[j].cells[2-j].classList.add('winner');
                //tempTable.rows[1].cells[1].classList.add('winner');
                //tempTable.rows[2].cells[0].classList.add('winner');
            }

            break;

    }
}
function turn2Text(i){
    switch (i) {
        case 0:
            return 'X';
            break;
        case 1:
            return 'O';
            break;
        case 2:
            return 'No one';
        default:
            return '';
    }
}
function myAlert(msg){
    if(msg=='')
        document.getElementById('pMessage').style.display='none';
    else
        document.getElementById('pMessage').style.display='inline-block';
    document.getElementById('pMessage').innerHTML = msg;
}