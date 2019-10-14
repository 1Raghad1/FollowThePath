let gameBord = document.querySelector(".bored")
let row = 3;
let col = 3;
let bord = [3][3];



function creatEmptyBored() {
    for (let i = 0; i < row; i++) {
        for (j = 0; j < col; j++) {
            // bord[i][j]=""+i+j;
            // console.log(bord[i][j])
            let gridItem = document.createElement('div');
            gridItem.setAttribute("data-id", "" + i + j);
            gridItem.setAttribute("id", "" + i + j);
            gridItem.setAttribute('class', 'gridItem');

            gameBord.appendChild(gridItem)
        }
    }
    return colorBored();
}
function colorBored() {
    let coloredRow = random();
    let coloredCol = random();
    console.log(coloredRow)
    console.log(coloredCol)
    let setOfCells = []
    let cell = []
    let time = 1000;
    let i = 0
    for (let i = 0; i < coloredRow.length; i++) {
        cell[i] = document.getElementById("" + coloredRow[i] + coloredCol[i] + "")
        console.log(cell[i])

        time += 400;
        setTimeout(function () { id = setInterval(colorSeq(cell[i]), time); }, time);

        cell[i].classList.add('animated', 'white')
        setOfCells.push(cell[i].getAttribute('data-id'))
    }

    function colorSeq(cell) {
        cell.style.backgroundColor = 'green'
    }



    return setOfCells
}
function random() {
    {

        let arr2 = []
        let obj = [0, 1, 2]

        while (arr2.length != 3) {
            let index = Math.floor(Math.random() * 3)

            if (!arr2.includes(obj[index])) {
                arr2.push(obj[index])
            }
        }
        console.log(arr2)

        return arr2
    }
}

function checkforSolution(sol) {
    let allCell = document.getElementsByClassName('gridItem');
    let subSet = [];
    let count = 0;

    for (let i = 0; i < allCell.length; i++) {

        if (sol.includes(allCell[i].getAttribute('data-id'))) {

            allCell[i].addEventListener('click', function (e) {
                subSet.push(allCell[i].getAttribute('data-id'))
                count++;
                if (count === sol.length) {

                    check(subSet);

                }

            })
            } else {
                allCell[i].addEventListener('click', function (e) {
                    allCell[i].style.opacity = '0.4'
                    allCell[i].classList.add('animated', 'fadIn')
                });

        }
        function check(subSet) {
            console.log(subSet)
            console.log(sol)
            sol = sol.toString();
            subSet = subSet.toString();


            if (subSet === sol) {
                console.log('win')

            }
        }
    }
}
let setOfSol = creatEmptyBored();
checkforSolution(setOfSol)