(function() {
  'use strict';


    var images = document.getElementsByClassName('draggable'),
      target = document.getElementsByClassName('target'),
      pieces = [],
      player1TotalHealth = 0,
      player2TotalHealth = 0,
      fightButton = document.getElementById('fight_button'),
      resultsArea = document.getElementById('results');

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
      var num = 0;
      var data = e.dataTransfer.getData('text');
      e.target.appendChild(document.getElementById(data));
      document.removeEventListener('dragstart', dragStart, false);
      document.removeEventListener('drop', drop, false);
      Array.prototype.forEach.call(target, function(item) {
        if(item.children[0]) num = num + 1;
        console.log(item, item.children, num);
      });
      if(num == 6) fightButton.style.display = 'block';

      }
      function calculateDamage() {
        return Math.round(Math.random() * 100);

      }
      function fight() {
        var player1Results = document.getElementById('player1_results'),
        player2Results = document.getElementById('player2_results');

        pieces = pieces.map(function(item, index, array) {
          if(item.side == 'player 1') {
            return { piece: item.piece, damage: item.damage, side: item.side, health: item.health - array[index + 2].damage };
          }
          else return { piece: item.piece, damage: item.damage, side: item.side, health: item.health - array[index - 2].damage };
        }).forEach(function(item) {
          if(item.side == 'player 1') player1TotalHealth = player1TotalHealth + item.health;
          else player2TotalHealth = player2TotalHealth + item.health;

          player1Results.innerHTML += '<div class="piece">' + '<strong>Side:</strong> ' + item.side + ' ' + '<strong>Piece:</strong> ' + item.piece + ' ' + '<strong>Damage:</strong> ' + item.damage + ' ' + '<strong>Health:</strong> ' + item.health + '</div>' + '<br>';
        });
        if(player1TotalHealth > player2TotalHealth) player1Results.innerHTML += '<h1 class="winner">Player 1 wins!</h1>';
        else player1Results.innerHTML += '<h1 class="winner">Player 2 wins!</h1>';
        resultsArea.style.display = 'block';
        fightButton.style.display = 'none';
        return pieces, player1TotalHealth, player2TotalHealth;
      }

}());
