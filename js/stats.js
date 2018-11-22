'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 50;
var BAR_BOTTOM_GAP = 30;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var FONT_GAP = 5;

var victoryMessagePositionY = CLOUD_Y + GAP / 2;

var OptionsVictoryMessage = {
  text: 'Ура вы победили!\nСписок результатов:',
  font: '16px PT Mono',
  size: 16,
  color: 'rgb(0, 0, 0)',
  x: CLOUD_X + GAP,
  y: victoryMessagePositionY
};

var OptionsBar = {
  maxHeight: 150,
  width: 40,
  gap: 50,
  thisPlayerColor: 'rgb(255, 0, 0)',
  anotherPlayerColor: function () {
    return 'rgb(0, 0, ' + this.getRandom(100, 255) + ')';
  },
  getRandom: function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }
};

/*
* Функция отрисовки облаков
*
* @param number x Точка начала отрисовки по оси X
* @param number y Точка начала отрисовки по оси Y
* @param string color Цвет создаваемого элемента
* */
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/*
* Функция отрисовки сообщений
*
* @param object message Объект отрисовываемого сообщения
* */
var renderMessage = function (ctx, message) {
  ctx.fillStyle = message.color;
  ctx.font = message.font;
  var linesArray = message.text.toString().split('\n');
  var numberOfLines = linesArray.length;
  var lineHeight = message.size;
  for (var i = 0; i < numberOfLines; i++) {
    ctx.fillText(linesArray[i], message.x, message.y, CLOUD_WIDTH);
    message.y += lineHeight;
  }
  message.y = victoryMessagePositionY;
};

/*
* Функция для определения точки начала отрисовки колонки по Y
*
* @param number playerTime Значение времени игрока
* @param number maxTime Максимальное значение времени среди всех игроков
*
* @return number Точка начала отрисовки колонки по Y
* */
var getBarPositionY = function (playerTime, maxTime) {
  return CLOUD_HEIGHT - BAR_BOTTOM_GAP - ((BAR_HEIGHT * playerTime) / maxTime);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');
  renderMessage(ctx, OptionsVictoryMessage);

  var maxTime = Math.max.apply(null, times);
  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = (players[i] === 'Вы') ? OptionsBar.thisPlayerColor : OptionsBar.anotherPlayerColor();
    ctx.fillRect(CLOUD_X + GAP + ((BAR_WIDTH + GAP) * i), getBarPositionY(times[i], maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(players[i], CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, getBarPositionY(times[i], maxTime) - FONT_GAP);
  }
};
