const taskContainer = document.querySelector('.task-container');
const submitButton = document.querySelector('.submit-button');
const timeLeftDisplay = document.querySelector('#timer-left');
const sliderFill = document.querySelector('.fill');

const startCount = 25 * 60;
let timeLet = startCount;
let timerId;

let tasks = [
    {
        name: "Practice CSS Animations",
        priority: 1
    },
    {
        name: "Dev community work",
        priority: 4
    },
    {
        name: "Algoritm Studies",
        priority: 3
    }
]

//sort by priority
const descTasks = tasks.sort((a, b) => a.priority - b.priority);


const convertToMin = (secondsLeft) => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft - minutes * 60
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

const handleClick = (button) => {

    switch (button.textContent) {
        case 'ACTIVE':
            button.textContent = 'PAUSE';
            clearInterval(timerId);
            break;
        case 'PAUSE':
            button.textContent = 'ACTIVE';
            countDown(button);
            break
        default:
            const allButtons = document.querySelectorAll('.controller-button');
            allButtons.forEach(button => {
                button.textContent = 'START';
                button.classList.remove('active-button');
                clearInterval(timerId);
                timeLet = startCount;
                timeLeftDisplay.textContent = convertToMin(timeLet);
            });
            button.textContent = 'ACTIVE';
            button.classList.add('active-button');
            countDown(button);
            break;
    }

}

const countDown = (button) => {
    timerId = setInterval(() => {
        timeLet--;
        timeLeftDisplay.textContent = convertToMin(timeLet);
        sliderFill.style.width = (timeLet / startCount) * 100 + '%';
        if (timeLet <= 0) {
            clearInterval(timerId);
            console.log(button.id)
            delete descTasks[button.id];
            button.parentNode.remove();
            timeLet = startCount;
            timeLeftDisplay.textContent = convertToMin(timeLet);
        }
    }, 1000);
}

const deleteTask = (e) => {
    console.log(e.target.parentNode.lastChild.id);
    e.target.parentNode.remove();
    delete descTasks[e.target.parentNode.lastChild.id]
}

const addTask = () => {
    const inputElement = document.querySelector('input');
    const value = inputElement.value;
    if (value) {
        taskContainer.innerHTML = '';
        inputElement.value = '';
        tasks.push({
            name: value,
            priority: tasks.length
        })
    }
    render();
}

function render() {

    descTasks.forEach((task, index) => {
        const taskBlock = document.createElement('div');
        const deleteIcon = document.createElement('p');
        const taskElement = document.createElement('p');
        const buttonController = document.createElement('button');

        taskBlock.classList.add('task-block');
        deleteIcon.classList.add('delete-icon');
        buttonController.classList.add('controller-button');

        deleteIcon.textContent = '✗';
        buttonController.textContent = 'START';
        taskElement.textContent = task.name;

        deleteIcon.addEventListener('click', deleteTask);
        buttonController.addEventListener('click', () => handleClick(buttonController));

        //buttonController.setAttribute('id', index);
        buttonController.id = index;

        taskBlock.append(deleteIcon, taskElement, buttonController);


        taskContainer.append(taskBlock);

    })
}

submitButton.addEventListener('click', addTask);

render();