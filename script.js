const buttonContainer = document.createElement("div");
buttonContainer.classList.add("buttonContainer");
const resizeBtn = document.createElement("button");
const multiColor = document.createElement("button");
const reset = document.createElement("button");
resizeBtn.textContent = "Resize Grid"
multiColor.textContent = "Enable Multi-Color"
reset.textContent = "Reset"
buttonContainer.appendChild(resizeBtn);
buttonContainer.appendChild(multiColor);
buttonContainer.appendChild(reset);
document.body.appendChild(buttonContainer);

let randColor = false;

/*
Creates a grid in the following format:

createGrid(2, 4)
row
    cell
    cell
    cell
    cell
row
    cell
    cell
    cell
    cell

*/
function createGrid(rows, cols) {
    const container = document.createElement("div");
    container.classList.add("grid-container");
    document.body.appendChild(container);

    // Calculates cell width and height for dynamic sizing:
    const cellWidth = container.clientWidth / cols;
    const cellHeight = container.clientHeight / rows;


    for (let i = 0; i < rows; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            // Sets width and height of cells dynamically
            cell.style.width = cellWidth + "px";
            cell.style.height = cellHeight + "px";
            row.appendChild(cell);
        }
        container.appendChild(row);
    }

    cellEventListener();
}

function cellEventListener() {
    const cells = document.querySelectorAll(".cell");

    let isClicking = false;

    cells.forEach(cell => {
        cell.addEventListener("mouseover", () => {
            if (isDrawing) {
                if (randColor) {
                    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    cell.style.backgroundColor = randomColor;
                } else {
                    cell.style.backgroundColor = "black";
                }
            }
        });

        cell.addEventListener("mousedown", function() {
            isDrawing = true;
        })

        cell.addEventListener("mouseup", function() {
            isDrawing = false;
        })
    })
}

function clearGrid() {
    const container = document.querySelector('.grid-container');
    if (container) {
        container.parentNode.removeChild(container);
    }
}

createGrid(16, 16);
let gridSize;

resizeBtn.addEventListener("click", function() {
    gridSize = prompt("How many boxes do you want the grid to be?", "16");
    if (gridSize != null && gridSize <= 100) {
        clearGrid();
        createGrid(gridSize, gridSize);
    } else if (gridSize > 100) {
        alert("Please give a valid input! Grid size must be less than or equal to 100.")
    }
})

reset.addEventListener("click", function() {
    clearGrid();
    createGrid(gridSize, gridSize);
})

multiColor.addEventListener("click", function() {
    randColor = !randColor;
    cellEventListener();
})


