const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const player1 = {
  id: 1,
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Палка', 'Мозги', 'Перчатка Таноса', 'Портальная пушка'],
  attak: function () {
    console.log(this.name + ' Fight...');
  }
};
const player2 = {
  id: 2,
  name: 'SUB-ZERO',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Вилка', 'Антиматериальный пистолет'],
  attak: function () {
    console.log(this.name + ' Fight...');
  }
};
let attackingPlayer = randomize(1, 2);

// Функция создания DOM-элемента (имя тега, строка с названиями классов элемента, атрибуты элемента)
function getElement(tagName, stringClassNames, attributes) {
  const $element = document.createElement(tagName);
  if (stringClassNames) {
    $element.classList.add(...stringClassNames.split(' '));
  }
  if (typeof attributes === 'object') {
    for (let attribute in attributes) {
      $element[attribute] = attributes[attribute];
    }
  }
  return $element;
}

// Функция создания игрока
function createPlayer(player) {
  const $player = getElement('div', `player${player.id}`);
  const $playerProgressbar = getElement('div', 'progressbar');
  const $playerCharacter = getElement('div', 'character');
  const $playerProgressbarLife = getElement('div', 'life', {
    style: `width: ${player.hp}%`,
  });
  const $playerProgressbarName = getElement('div', 'name', {
    textContent: player.name,
  });
  const $playerCharacterImg = getElement('img', '', {
    src: player.img,
  });

  $playerProgressbar.append($playerProgressbarLife, $playerProgressbarName);
  $playerCharacter.append($playerCharacterImg);
  $player.append($playerProgressbar, $playerCharacter);

  return $player;
}

function randomize(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

// Функция выявляет победителя
function playerWins(player) {
  const $loseTitle = getElement('div', 'loseTitle', {
    textContent: `${player.name} wins!`,
  });
  $arena.append($loseTitle);
  $randomButton.disabled = true;
  return;
}

// Функция изменения hp игрока
function changeHP(player) {
  const $playerLife = document.querySelector(`.player${player.id} .life`);
  player.hp -= randomize(1, 20);
  if (player.hp <= 0) player.hp = 0;
  $playerLife.style.width = player.hp + '%';
  return player.hp;
}

$randomButton.addEventListener('click', () => {
  if (attackingPlayer < 2) {
    changeHP(player2);
    if (player2.hp <= 0) playerWins(player1);
    attackingPlayer = player2.id;
  } else {
    changeHP(player1);
    if (player1.hp <= 0) playerWins(player2);
    attackingPlayer = player1.id;
  }
});

$arena.append(createPlayer(player1));
$arena.append(createPlayer(player2));
