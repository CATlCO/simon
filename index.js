var sound = [];
var seq = [];
var user = [];
var dur = 500;
var strict = false;
var wrong =  false;

function random(){
  return Math.floor((Math.random()*4) + 1);
}

function playSeq(){
  var i = 0;
  var interval = setInterval(function(){
    blink($('#q'+seq[i]));
    sound[seq[i]].play();
    i++;
    if (i>=seq.length) clearInterval(interval);
  }, dur*2);
}
function winner(){
  sound[5].play();
  $('.winner').show();

}

function addNew(){
  seq.push(random());
  $('.count').html(seq.length);
  playSeq();
}
function blink(block) {
  block.css('opacity', 1);
  setTimeout(function(){ block.css('opacity', 0.5); }, dur);
}

function repeat(){
  blink($('.quarter'));
  sound[0].play();
  setTimeout(playSeq, dur*2);
  user=[];
}
function restart(){
  $('.winner').hide();
  blink($('.quarter'));
  sound[0].play();
  seq = [];
  user = [];
  setTimeout(addNew, dur*2);
}
function check(){
  last = user.length - 1;
  if (user[last] != seq[last]) {
    if (strict) {
      restart();
    } else {
      repeat();
    }
  } else {
    if (user.length === seq.length) {
      if (user.length === 20){
        winner();
      } else {
        user = [];
        addNew();
      }
    }
  }
}

$(document).ready(function(){
  sound[0] = $("#sound0")[0];
  sound[1] = $("#sound1")[0];
  sound[2] = $("#sound2")[0];
  sound[3] = $("#sound3")[0];
  sound[4] = $("#sound4")[0];
  sound[5] = $("#sound5")[0];
  $('.start').click(function(){
    $(this).hide();
    $('.restart').show();
    $('.quarter').css('opacity', 0.5);
    addNew();
    $('.quarter').mousedown(function(){
      $(this).css('opacity', 1);
      user.push(this.id.slice(-1));
      sound[this.id.slice(-1)].play();
    }).mouseup(function(){
      $(this).css('opacity', 0.5);
      check();
    });
  });
  $('.strict').click(function(){
    $(this).toggleClass('on');
    strict = !strict;
  });
  $('.restart').click(function(){
    restart();
  });
});