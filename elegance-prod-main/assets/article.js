var calculateTime = {
  init: function(){
    if($('.time-to-read').length > 0)
    {
      var selectors = document.querySelectorAll('[data-words]'),
          timeToReadSelector = document.querySelectorAll('[data-length-to-read]'),
          wordCount = 0,
          averageWPM = 100,
          secondsInAMin = 60,
          minutes, seconds, wordPlauralize, minutePlauralize, secondPlauralize;
      // Probably use it's own function?
      for (var i = 0; i < selectors.length; i++) {
          var text = selectors[i].textContent,
              splitText = text.split(/\s/);
            wordCount = 0,
              averageWPM = 100,
              secondsInAMin = 60,

          wordCount = splitText.length;
        
        for (var j = 0; j < splitText.length; j++) {
            if (splitText[j] === '' || splitText[j] === '\n') {
                wordCount--;
            }
        }

        // This should probably going into its own function at some point
        if (wordCount === 1) {
            wordPlauralize = '';
        } else {
            wordPlauralize = '';
        }

        minutes = Math.floor(wordCount / averageWPM);

        if (minutes === 1) {
            minutePlauralize = 'min';
        } else {
            minutePlauralize = 'mins';
        }

        seconds = Math.floor(((wordCount % averageWPM) / averageWPM) * secondsInAMin);

        if (seconds === 1) {
            secondPlauralize = 'sec';
        } else {
            secondPlauralize = 'secs';
        }
    
        console.log(timeToReadSelector);
        if (seconds === 0) {
            timeToReadSelector[i].textContent =   minutes + ' ' + minutePlauralize;
        } else {
            timeToReadSelector[i].textContent =   minutes + ' ' + minutePlauralize + ' & ' + seconds + ' ' + secondPlauralize;
        }
        console.log(minutes + ' ' + minutePlauralize + ' & ' + seconds + ' ' + secondPlauralize);
      }
    }
  }
}

var progressScroll = {
  init: function(){
    $(window).scroll(function () {
      var s = $(window).scrollTop(),
          d = $(document).height(),
          c = $(window).height();
      scrollPercent = (s / (d-c)) * 100;
      var position = scrollPercent.toFixed(2);

      $('.progress-bar').width(position + '%');
    });
  }
}

var articleVar;
function checkIfJqueryLoaded()
{
  if(window.jQuery && typeof isFunctionJsFileLoaded != undefined)
  {
    // console.log("now loaded");
    clearInterval(articleVar);
    setTimeout(function(){
      calculateTime.init();
      progressScroll.init();
    }, 500);
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  articleVar = setInterval(checkIfJqueryLoaded, 200);
  // console.log("articlejs");
});