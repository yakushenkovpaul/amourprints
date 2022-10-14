const font_name = 'mellony';
const font_date = 'RingbearerMedium';
const font_song = 'Bell';


const canvas = document.getElementById('canvas');
const f_canvas = document.getElementById('full-canvas');

const ctx = canvas.getContext('2d');
const f_ctx = f_canvas.getContext('2d');

const c_width = canvas.offsetWidth;
const c_height = canvas.offsetHeight;

const fc_width = f_canvas.offsetWidth;
const fc_height = f_canvas.offsetHeight;

var default_width = 600;
var full_width = 2000;


canvas.width = c_width;
canvas.height = c_height;

f_canvas.width = fc_width;
f_canvas.height = fc_height;

ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.maxWidth = c_width;
ctx.maxHeight = c_height;

f_ctx.textAlign = 'center';
f_ctx.textBaseline = 'middle';
f_ctx.maxWidth = fc_width;
f_ctx.maxHeight = fc_height;

var ratio = c_width / default_width;
var f_ratio = full_width / default_width;

var is_mobile = false;

var flag1 = false, flag2 = false;
var is_draw = false;

var font_size;

if(window.innerWidth < 768) {
  is_mobile = true;
}

setTimeout(function() {
  canvasDraw();
  loadCSV();
  formSubmit();
  formSubmitl();
})

var lyrics = '';

function canvasDraw() {
  var img = new Image();
  img.setAttribute('crossorigin', 'anonymous');
  img.onload = function(){
    ctx.drawImage(img, 0, 0, c_width, c_height);
    engraveSong(lyrics, ctx, c_width, c_height, ratio);
    engraveDate(ctx, c_width, c_height, ratio);
    engraveName(ctx, c_width, c_height, ratio);
    flag1 = true;
    if(flag1 == true && flag2 == true) {
      is_draw = true;
    }
  }
  img.src = canvas.getAttribute('data-img');


  var f_img = new Image();
  f_img.setAttribute('crossorigin', 'anonymous');
  f_img.onload = function() {
    f_ctx.drawImage(f_img, 0, 0, fc_width, fc_height);
    engraveSong(lyrics, f_ctx, fc_width, fc_height, f_ratio);
    engraveDate(f_ctx, fc_width, fc_height, f_ratio);
    engraveName(f_ctx, fc_width, fc_height, f_ratio);
    flag2 = true;
    if(flag1 == true && flag2 == true) {
      is_draw = true;
    }
  }
  f_img.src = f_canvas.getAttribute('data-img');

}


function engraveName(ctx, width, height, ratio) {

  var input = document.getElementById('input_name');
  _engrave(input, font_name, ctx, width, height, ratio);

}


function engraveDate(ctx, width, height, ratio) {

  var input = document.getElementById('input_date');
  _engrave(input, font_date, ctx, width, height, ratio);

}


function _engrave(input, font, ctx, width, height, ratio) {
  var per_width = input.getAttribute('data-width') / 100;
  var max_width = width * per_width;
  var per_top = input.getAttribute('data-pos-top') / 100;
  var pos_y = height * per_top;

  var text = input.value;
  var f_size = input.getAttribute('data-font-size') * ratio;
  if(is_mobile) {
    // input.getAttribute('data-font-size-mob');
  }

  ctx.font = f_size + 'px ' + font;

  do{
    f_size -= 0.1;
    ctx.font = f_size + 'px ' + font;
  } while(ctx.measureText(text).width > max_width)

  if(Shopify.designMode) {

    var _w = max_width;
    let metrics = ctx.measureText("Hello");
    let _h = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    var p_x = (width - max_width) / 2;
    var p_y = pos_y - _h / 2 - 2;

    ctx.beginPath();
    ctx.rect(p_x, p_y, _w, _h);
    ctx.fillStyle = '#ffffff99';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }

  ctx.fillStyle = input.getAttribute('data-color');
  ctx.fillText(text, width / 2, pos_y);
}


function engraveSong(lyrics, ctx, width, height, ratio) {
  
  var input = document.getElementById('input_song');

  var per_width = input.getAttribute('data-width') / 100;
  var max_width = width * per_width;
  var per_height = input.getAttribute('data-height') / 100;
  var max_height = height * per_height;
  var per_top = input.getAttribute('data-pos-top') / 100;
  var pos_y = height * per_top;

  var text = lyrics;

  var f_size = input.getAttribute('data-font-size') * ratio;

  if(parseFloat(font_size) > 0) {
    f_size = font_size * ratio;
  }


  if(is_mobile) {
    // input.getAttribute('data-font-size-mob');
  }

  var line_height = f_size * 1.2;

  if(Shopify.designMode) {

    var p_x = (width - max_width) / 2;
    var p_y = pos_y - line_height / 2 - 2;
    ctx.beginPath();
    ctx.rect(p_x, p_y, max_width, max_height);
    ctx.fillStyle = '#e4e4e4ad';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#a7a7a7';
    ctx.stroke();
  }

  if(lyrics == '') {
    return false;
  }

  ctx.font = f_size + 'px ' + font_song;

  var color = input.getAttribute('data-color');

  // color = "#000000ad";

  wrapText(ctx, text, color, width / 2, pos_y, max_width, line_height, max_height);

}

function wrapText (context, text, color, x, y, maxWidth, lineHeight, maxHeight) {
  context.fillStyle = color;
  context.textAlign = "center";
  var words = text.split(' '),
      line = '',
      lineCount = 0,
      i,
      test,
      metrics;

  for (i = 0; i < words.length; i++) {
    test = words[i];
    metrics = context.measureText(test);
    while (metrics.width > maxWidth) {
      // Determine how much of the word will fit
      test = test.substring(0, test.length - 1);
      metrics = context.measureText(test);
    }
    if (words[i] != test) {
      words.splice(i + 1, 0,  words[i].substr(test.length))
      words[i] = test;
    }  

    test = line + words[i] + ' ';  
    metrics = context.measureText(test);
    
    if (metrics.width > maxWidth && i > 0) {
      context.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
      lineCount++;
      if((lineCount + 1) * lineHeight > maxHeight) {
        return false;
      }
    }
    else {
      line = test;
    }
  }
  context.fillText(line, x, y);
}


var data = null;
var songName = [];
var songLyrics = [];

function loadCSV() {  
  var $list = document.getElementsByClassName('songlist')[0];
  var listHtml = '';

  $.ajax({
    type: "GET",  
    url: lyricsCSV,
    dataType: "text",       
    success: function(response){
      var lists = response.split('\n');
      console.log(lists);
      listHtml += "<li onclick='openCustomSong(this)' style='background:#f1f1f1'>Select if you can’t find your song.</li>";

      for(var i = 1; i < lists.length; i ++) {
        var list = lists[i].split('\t');

        var song_name = list[1];
        var author = list[2];
        var song_lyrics = list[6];
        var f_size = list[7];

        songName.push(song_name);
        songLyrics.push(song_lyrics);
        listHtml += '<li data-idx="' + i + '" data-fontsize="' + f_size + '" onclick="selectSong(this)">' + song_name + ' - ' + author +'</li>';
      }
      $list.innerHTML = listHtml;
    }
  });
}

function insertCustomSong() {
  setTimeout(function() {
    var $input = document.querySelector('#custom_song');
    lyrics = $input.value;

    canvasDraw();
  })
}

function openCustomSong($list) {
  (document.getElementsByClassName('songlist'))[0].setAttribute('data--hidden', 'true');
  document.getElementById('input_song').value = $list.textContent;

  document.querySelector('#custom_song').removeAttribute('data--hidden');
}

function filter() {
  setTimeout(function() {
    var input = document.getElementById('input_song');
    var key = input.value.toUpperCase();
    (document.getElementsByClassName('songlist'))[0].removeAttribute('data--hidden');
    filterSong(key);
  })
}

function openList() {
  (document.getElementsByClassName('songlist'))[0].removeAttribute('data--hidden');
}

var $listWrapper = document.getElementsByClassName('songlist')[0]
var $lists = $listWrapper.getElementsByTagName('li');

function filterSong(k) {
  var len = 0;
  for (var i = 0; i < $lists.length; i++) {
    var $list = $lists[i];
    var txtValue = $list.textContent || $list.innerText;
    if(k == '') {
      $list.removeAttribute('data--hidden');
    }
    else {
      if (txtValue.toUpperCase().indexOf(k) > -1) {
        $list.removeAttribute('data--hidden');
        len ++;
      } else {
        $list.setAttribute('data--hidden', 'true');
      }
    }
  }
  if (len == 0) {
    $lists[0].removeAttribute('data--hidden');
  }
}

function selectSong($list) {
  idx = $list.getAttribute('data-idx') - 1;
  (document.getElementsByClassName('songlist'))[0].setAttribute('data--hidden', 'true');
  document.getElementById('input_song').value = $list.textContent;
  lyrics = songLyrics[idx];

  document.querySelector('#custom_song').setAttribute('data--hidden', 'true');

  font_size = $list.getAttribute('data-fontsize');

  canvasDraw();
}

function canvasPreview() {
  var $popup = document.getElementById('canvas-preview');
  var $preview = document.querySelector('#canvas-preview img');
  $preview.setAttribute('src', f_canvas.toDataURL("image/png"));
  $popup.classList.add('visible');
}

function formSubmit() {
  const $form = document.getElementById('product-form');
  $form.addEventListener('submit', function(e) {
    e.preventDefault();
    f_ctx.clearRect(0, 0, c_width, c_height);
    is_draw = false;
    canvasDraw();
    
    document.querySelector('[data-loader-btn]').classList.add('loading');

    document.querySelector('[data-loader-btn]').classList.add('loading');

    var timer = setInterval(function() {
      if(is_draw) {
        clearTimeout(timer);
        var upload_img = document.getElementById('uploadCanvas');
        var imgData = f_canvas.toDataURL("image/png");
        $.ajax({
          url: 'https://amourprint.herokuapp.com/upload-images',
          type: 'post',
          dataType: 'json',
          data: {
            base64: imgData
          },
          success: function(res) {
            upload_img.value = res['url'];
            $form.submit();
          }
        })
      }
    }, 1);
  })
}
function formSubmitl() {
  const $form = document.getElementById('product-form');
  $form.addEventListener('submit', function(e) {
    e.preventDefault();
    var id = $('.main_selected_variant').attr('value');
    var data ={
      id:id,
      quantity:"1"
    };
    f_ctx.clearRect(0, 0, c_width, c_height);
    is_draw = false;
    canvasDraw();
    
    document.querySelector('[data-loader-btn]').classList.add('loading');

    document.querySelector('[data-loader-btn]').classList.add('loading');

    var timer = setInterval(function() {
      if(is_draw) {
        clearTimeout(timer);
        var upload_img = document.getElementById('uploadCanvas');
        var imgData = f_canvas.toDataURL("image/png");
        $.ajax({
          type: "POST",
      url: "/cart/add.js",
      data: data,
      dataType: "json",
      success: function(result){
        console.log(result);
        //location.reload();
       // $('form.custom_product_form').submit();
      }
        })
      }
    }, 2);
  })
}

var $popupClose = document.querySelector('[data-popup-close]');

$popupClose.addEventListener('click', function() {
  var $popup = document.getElementById('canvas-preview');
  $popup.classList.remove('visible');
})