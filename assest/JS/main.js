
let gameBord = document.querySelector(".bored")
var row = 3;
var col = 3;
var score = 0;
var count = 0;
var numOfColred=3;
var setOfSol;

function creatEmptyBored() {
    gameBord.innerHTML = ''
    for (let i = 0; i < row; i++) {
        for (j = 0; j < col; j++) {

            let gridItem = document.createElement('div');
            gridItem.setAttribute("data-id", "" + i + j);
            gridItem.setAttribute("id", "" + i + j);
            gridItem.setAttribute('class', 'gridItem');
            if(row==4){
                gridItem.style.width='100px';
                gridItem.style.height='100px';
            }
            if(row==5){
                gridItem.style.width='70px';
                gridItem.style.height='70px';

            }
            gameBord.appendChild(gridItem)
        }
    }
    return colorBored();
}
function colorBored() {
    let colored = random();
    let setOfCells = []
    let cell = []
    let time = 500;

    for (let i = 0; i < colored.length; i++) {
        cell[i] = document.getElementById(colored[i])
        time += 400;
        setTimeout(function () { id = setInterval(colorSeq(cell[i]), time); }, time);

        cell[i].classList.add('animated', 'fadeIn')
        setOfCells.push(cell[i].getAttribute('data-id'))
    }

    function colorSeq(cell) {
        cell.style.backgroundColor = '#2d2c40'
    }



    return checkforSolution(setOfCells)
}
function random() {
    {

        let arr2 = []
        let obj = [[],[],[],[],[]];
        for(let i=0;i<row;i++){
            for(let j=0;j<col;j++)
            obj[i][j]=""+i+j
        }


        while (arr2.length != numOfColred) {
            let i = Math.floor(Math.random() * row)
            let j=Math.floor(Math.random() * row)
           if (!arr2.includes(obj[i][j])) {
                arr2.push(obj[i][j])
            }
        }
        return arr2
    }
}

function checkforSolution(sol) {
    let allCell = document.getElementsByClassName('gridItem');
    let subSet = [];
   
    for (let i = 0; i < allCell.length; i++) {

        if (sol.includes(allCell[i].getAttribute('data-id'))) {

            allCell[i].addEventListener('click', function (e) {
                subSet.push(allCell[i].getAttribute('data-id'))
                count++;
                if (subSet.length === sol.length) {

                    check(subSet);

                }

            })
        } else {
            allCell[i].addEventListener('click', function (e) {
                allCell[i].style.opacity = '0.4'
                allCell[i].classList.add('animated', 'shake')
                allCell[i].classList.add('animated', 'faster')
            });

        }
        function check(subSet) {

            sol = sol.toString();
            subSet = subSet.toString();

            if (subSet === sol) {
                score++;
                
var scor = document.getElementsByTagName('span')
scor[0].innerHTML=score;

if(score%3==0||score==1||score>6&&score<=10){

    numOfColred++;
    
    }else{

        if(row<5){

        row++;
        col++;
        }
        
    }
     creatEmptyBored();

            }else{
            creatEmptyBored()
              
           }
        }
        }
    }

creatEmptyBored();

