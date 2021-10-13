const $arena = document.querySelector('.arenas');
const player1 = {
  name: 'SCORPION',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Палка', 'Мозги', 'Перчатка Таноса', 'Портальная пушка'],
  attak: function () {
    console.log(this.name + ' Fight...');
  }
};
const player2 = {
  name: 'SUB-ZERO',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Вилка', 'Антиматериальный пистолет'],
  attak: function () {
    console.log(this.name + ' Fight...');
  }
};

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
function createPlayer(playerClassName, player) {
  const $player = getElement('div', playerClassName);
  const $playerProgressbar = getElement('div', 'progressbar', 'sdf');
  const $playerCharacter = getElement('div', 'character');
  const $playerProgressbarLife = getElement('div', 'life', {
    style: 'width: 100%',
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
  $arena.append($player);

  return $player;
}

createPlayer('player1', player1);
createPlayer('player2', player2);
