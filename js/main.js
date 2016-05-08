(function() {
  'use strict';

  window.addEventListener('load', runDrag, false);

  function runDrag() {
    window.removeEventListener('load', runDrag, false);
    var images = document.getElementsByClassName('draggable'),
      target = document.getElementsByClassName('target'),
      pieces = [],
      player1TotalHealth = 0,
      player2TotalHealth = 0,
      fightButton = document.getElementById('fight_button');

      fightButton.addEventListener('mousedown', fight, false);

    Array.prototype.forEach.call(images, function(item) {
      pieces.push({ piece: item.id });
      var piecesLength = pieces.length - 1;
      if(pieces[piecesLength].piece.indexOf(1) != -1) {
        pieces[piecesLength].side = 'player 1';
        pieces[piecesLength].damage = calculateDamage();
        pieces[piecesLength].health = 100;
      }
      else {
        pieces[piecesLength].side = 'player 2';
        pieces[piecesLength].damage = calculateDamage();
        pieces[piecesLength].health = 100;
      }
      item.addEventListener('dragstart', dragStart, false);
      return pieces;
    });

    Array.prototype.forEach.call(target, function(item) {
      item.addEventListener('dragenter', function(e){ e.preventDefault(); }, false);
      item.addEventListener('dragover', function(e){ e.preventDefault(); }, false);
      item.addEventListener('drop', drop, false);
    });

    function dragStart(e) {
      e.dataTransfer.setData('text', e.target.id);
      e.dataTransfer.effectAllowed = 'move';
      document.addEventListener('drop', drop, false);
    }

    function drop(e) {
      var data = e.dataTransfer.getData('text');
      e.target.appendChild(document.getElementById(data));
      document.removeEventListener('dragstart', dragStart, false);
      document.removeEventListener('drop', drop, false);
      if(target[target.length - 1].childNodes.length > 0) fightButton.style.display = 'block';

      }
      function calculateDamage() {
        return Math.round(Math.random() * 100);

      }
      function fight() {
        pieces = pieces.map(function(item, index, array) {
          if(item.side == 'player 1') {
            return { piece: item.piece, damage: item.damage, side: item.side, health: item.health - array[index + 2].damage };
          }
          else return { piece: item.piece, damage: item.damage, side: item.side, health: item.health - array[index - 2].damage };
        }).forEach(function(item) {
          if(item.side == 'player 1') player1TotalHealth = player1TotalHealth + item.health;
          else player2TotalHealth = player2TotalHealth + item.health;
        });
        fightButton.style.display = 'none';
        return pieces, player1TotalHealth, player2TotalHealth;
      }
    }




}());
