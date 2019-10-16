
let gameBord = document.querySelector(".bored")
var row = 3;
var col = 3;
var score = 0;
var numOfColred = 3;
var level = 0;
var setOfSol;



function creatEmptyBored() {

    gameBord.innerHTML = ''

    for (let i = 0; i < row; i++) {

        for (j = 0; j < col; j++) {

            let gridItem = document.createElement('div');
            gridItem.setAttribute("data-id", "" + i + j);
            gridItem.setAttribute("id", "" + i + j);
            gridItem.setAttribute('class', 'gridItem');

            if (row == 4) {

                gridItem.style.width = '100px';
                gridItem.style.height = '100px';
            }
            if (row == 5) {

                gridItem.style.width = '70px';
                gridItem.style.height = '70px';

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
    let time = 400;



    for (let i = 0; i < colored.length; i++) {

        cell[i] = document.getElementById(colored[i])
        time += 800;

        setTimeout(function () { id = setInterval(colorSeq(cell[i]), time); }, time);

        setOfCells.push(cell[i].getAttribute('data-id'))
    }

    function colorSeq(cell) {

        cell.style.backgroundColor = '#2d2c40'
    }
    for (let i = 0; i < colored.length; i++)

        setTimeout(function () { id = setInterval(colorSeqBack(cell[i]), 1000); }, time + 300);

    function colorSeqBack(cell) {
        cell.style.backgroundColor = 'whitesmoke'
    }

    return checkforSolution(setOfCells)
}
function random() {


    let arr2 = []
    let obj = [[], [], [], [], []];
    for (let i = 0; i < row; i++) {

        for (let j = 0; j < col; j++)

            obj[i][j] = "" + i + j
    }


    while (arr2.length != numOfColred) {

        let i = Math.floor(Math.random() * row)
        let j = Math.floor(Math.random() * row)

        if (!arr2.includes(obj[i][j])) {

            arr2.push(obj[i][j])
        }
    }
    return arr2
}


function checkforSolution(sol) {

    let allCell = document.getElementsByClassName('gridItem');
    let subSet = [];

    for (let i = 0; i < allCell.length; i++) {

        if (sol.includes(allCell[i].getAttribute('data-id'))) {
            allCell[i].addEventListener('click', function (e) {
                allCell[i].classList.add('animated', 'fadeIn')
                allCell[i].classList.add('animated', 'fast')
                allCell[i].style.backgroundColor = '#2d2c40'

                if (subSet.includes(allCell[i].getAttribute('data-id'))) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'You Can Not Choose The SAME Square Twice!!',

                    })
                    creatEmptyBored();
                } else {

                    subSet.push(allCell[i].getAttribute('data-id'))
                }



                if (subSet.length === sol.length) {

                    setTimeout(function () { check(subSet) }, 200)

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
                score++
                level++
                displayScore(score);
                if (score < 5) {
                    if (level % 2 != 0 || level == 1 || row == 5) {

                        numOfColred++;
                        creatEmptyBored();

                    } else {

                        if (row < 5) {
                            row++;
                            col++;
                            creatEmptyBored();
                        }

                    }


                } else {

                    Swal.fire(
                        'Good job!',
                        'You reached 10 Scores!!',
                        'success'
                    )
                    resetGame()

                }
            } else {
                creatEmptyBored()

                if (score > 0)

                    score--;

                displayScore(score)

            }

        }
    }
}


let again = document.getElementById('again');
again.addEventListener('click', function () {
    creatEmptyBored();
})

let reset = document.getElementById('reset');
reset.addEventListener('click', resetGame)

function displayScore(score) {
    var scor = document.getElementsByTagName('span')
    scor[0].innerHTML = score;
}
function resetGame() {
    score = 0;
    displayScore(score);
    row = 3;
    col = 3;
    numOfColred = 3;
    creatEmptyBored();
}

creatEmptyBored();
