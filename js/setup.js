'use strict';

/* Перечисление возможных параметров волшебника */
var OptionsWizard = {
  WIZARD_NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ],
  WIZARD_SURNAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ],
  COAT_COLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ],
  EYES_COLORS: [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ],
};

/*
* Функция для генерации случайных чисел в диапазоне от min до max
*
* @param min number Минимальное значение
* @param max number Максимальное значение
*
* @return rand number Сгенерированное число
* */
var getRandom = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

/*
* Функция для создания случайных имен волшебника
*
* @param optionsWizardList Перечисление параметров волшебника
*
* @return Возвращает случайное имя волшебника
* */
var getWizardName = function (optionsWizardList) {
  return optionsWizardList.WIZARD_NAMES[getRandom(0, optionsWizardList.WIZARD_NAMES.length)] + ' ' + optionsWizardList.WIZARD_SURNAMES[getRandom(0, optionsWizardList.WIZARD_SURNAMES.length)];
};

/*
* Функция для создания случайного цвета мантии волшебника
*
* @param optionsWizardList Перечисление параметров волшебника
*
* @return Возвращает случайный цвет мантии
* */
var getWizardCoatColor = function (optionsWizardList) {
  return optionsWizardList.COAT_COLORS[getRandom(0, optionsWizardList.COAT_COLORS.length)];
};

/*
* Функция для создания случайного цвета глаз волшебника
*
* @param optionsWizardList Перечисление параметров волшебника
*
* @return Возвращает случайный цвет глаз
* */
var getWizardEyesColor = function (optionsWizardList) {
  return optionsWizardList.EYES_COLORS[getRandom(0, optionsWizardList.EYES_COLORS.length)];
};

/*
* Функция для создания волшебников
*
* @return wizards array Возвращает массив объектов волшебников
* */
var getWizards = function () {
  for (var i = 0; i < 4; i++) {
    wizards += [
      {
        name: getWizardName(OptionsWizard),
        coatColor: getWizardCoatColor(OptionsWizard),
        eyesColor: getWizardEyesColor(OptionsWizard),
      },
    ];
  }
  return wizards;
};

/*
* Функция для отрисовки волшебников
*
* @return wizards Возвращает волшебника
* */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = getWizards();
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
