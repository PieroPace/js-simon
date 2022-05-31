function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function createRandomArray(num){
    const arrayRandom = [];
    for (let i = 0; i < num; i++) {
        let numberRandom = getRandomIntInclusive(1,50);
        while (arrayRandom.includes(numberRandom)) {
            numberRandom = getRandomIntInclusive(1, 50);
        }
        arrayRandom.push(numberRandom);
    }

    return arrayRandom;
}

function createListDom(list) {
    const listElement = document.createElement('ul');
    listElement.classList.add('num-container');

    if (list == randomNumbers) {
        listElement.append('Numeri random: ');
        listElement.classList.add('list-random');
    } else if (list == userNumbers) {
        listElement.append('Numeri inseriti: ');
        listElement.classList.add('list-user');
    }
    
    for (let i = 0; i < list.length; i++) {
        const listItem = document.createElement('li');
        listItem.append(list[i]);
        listElement.append(listItem);
    }
    
    return listElement;
}

// Visualizzare in pagina 5 numeri casuali.
let clicked = false;
let seconds = 30;
let secondsUp = 5;
let randomNumbers = createRandomArray(5);
const userNumbers = [];
const main = document.querySelector('main');
const select = document.getElementById('difficulty');
const playButton = document.getElementById('play-button');

function selectChoice() {
    if (!clicked){
        const selectValue = select.value;
        switch (selectValue) {
            case 'easy':
                seconds = 30;
                secondsUp = 5;
                randomNumbers = createRandomArray(5);
                break;
            case 'medium':
                seconds = 30;
                secondsUp = 5;
                randomNumbers = createRandomArray(7);
                break;
            case 'hard':
                seconds = 50;
                secondsUp = 10;
                randomNumbers = createRandomArray(7);
                break;
            case 'crazy':
                seconds = 50;
                secondsUp = 10;
                randomNumbers = createRandomArray(10);
                break;
    
        }
    }
}

select.addEventListener('change', selectChoice, false);

playButton.addEventListener('click', function(){
    if (!clicked){
        selectChoice();
        main.innerHTML = '';
        main.append(createListDom(randomNumbers));
        setTimeout(startGame, secondsUp * 1000);
        clicked = true;
    }

});



function startGame() {
    main.innerHTML = '';

    const countdown = `<h1>Tempo rimanente: <span id="seconds"></span></h1>`;
    main.innerHTML = countdown;
    const second = document.getElementById('seconds');
    second.innerText = seconds;

    const timer = setInterval(() => {
        if (seconds > 0) {
            second.innerText = seconds.toFixed(1);
            seconds -= 0.01;
        } else {
            second.innerText = '0'
            clearInterval(timer);
            declareNumberFunction();
        }
    }, 10);
}

function declareNumberFunction() {
    main.innerHTML = '';
    alert('Inserisci i numeri visualizzati uno per volta')
    let point = 0;
    for (let i = 0; i < randomNumbers.length; i++) {

        let userNumber = parseInt(prompt('Inserisci un numero tra 1 e 50'));

        while (isNaN(userNumber) || userNumber < 1 || userNumber > 50 || userNumbers.includes(userNumber)) {
            userNumber = parseInt(prompt('Valore non valido. Inserisci un numero'));
        }

        userNumbers.push(userNumber);
        if (randomNumbers.includes(userNumber)) {
            point++;
        }
    }

    let title = '';

    // Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
    if (point == randomNumbers.length) {
        title = `<h1>Hai inserito correttamente tutti i numeri! Complimenti</h1>`;
    } else {
        title = `<h1>Hai inserito correttamente ${point} numeri</h1>`;
    }

    main.innerHTML = title;
    main.append(createListDom(randomNumbers));
    main.append(createListDom(userNumbers));

    const userCreatedList = document.querySelectorAll('.list-user li');
    const randomCreatedList = document.querySelectorAll('.list-random li');

    for (let i = 0; i < randomCreatedList.length; i++) {
        const number = parseInt(userCreatedList[i].innerText);
        if (randomNumbers.includes(number)) {
            userCreatedList[i].classList.add('green');
        }

    }
    clicked = false;
}
