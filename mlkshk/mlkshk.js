/*
  Iterates through posts on http://mlkshk.com
  (c) rogthefrog 2011-07-15
  Creative Commons Attribution + Noncommercial + ShareAlike License
  http://creativecommons.org/licenses/by-nc-sa/3.0/legalcode
  
  Author is not responsible for anything involving this software.
  Not authorized by mlkshk.com. Not affiliated with mlkshk.com.
  No guarantees. Use at your own risk.
*/

var MlkshkBrowser = {
  start: 1,
  base: 10,
  id_base: 36,
  url_base: 'http://mlkshk.com/p/',
  running: false,
  interval: null,
  // found at
  // http://www.geneffects.com/briarskin/programming/newJSMathFuncs.html
  // modified to return an int instead of a string if base 10
  baseConverter: function(number, ob, nb) {
    // Created 1997 by Brian Risk.  http://brianrisk.com
    number = number.toString().toUpperCase();
    var list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var dec = 0;
    for (var i = 0; i <=  number.length; i++) {
      dec += (list.indexOf(number.charAt(i))) * (Math.pow(ob , (number.length - i - 1)));
    }
    number = "";
    var magnitude = Math.floor((Math.log(dec))/(Math.log(nb)));
    for (var i = magnitude; i >= 0; i--) {
      var amount = Math.floor(dec/Math.pow(nb,i));
      number = number + list.charAt(amount); 
      dec -= amount*(Math.pow(nb,i));
    }
    return (nb == 10 ? parseInt(number) : number);
  },

  next: function() {
    MlkshkBrowser.start = parseInt(MlkshkBrowser.start) + 1;
    MlkshkBrowser.go();
  },
  
  previous: function() {
    MlkshkBrowser.start = parseInt(MlkshkBrowser.start) - 1;
    if (MlkshkBrowser.start <= 1) {
      MlkshkBrowser.start = 1;
    }
    MlkshkBrowser.go();
  },
  
  start_id: function() {
    return MlkshkBrowser.baseConverter(MlkshkBrowser.start, MlkshkBrowser.base, MlkshkBrowser.id_base);
  },
  
  make_url: function() {
    return MlkshkBrowser.url_base + MlkshkBrowser.start_id();
  },
  
  go: function(new_id) {
    if (typeof new_id !== 'undefined') {
      MlkshkBrowser.start = MlkshkBrowser.baseConverter(new_id, MlkshkBrowser.id_base, MlkshkBrowser.base);
    }
    document.getElementById('start_id').value = MlkshkBrowser.start_id();
    var url = MlkshkBrowser.make_url();
    var viewing = document.getElementById('viewing');
    if (viewing != null) {
      viewing.setAttribute('href', url);
      viewing.innerHTML = url;
    }
    document.getElementById('mlkshk_iframe').setAttribute('src', url);
  },
  
  start_stop: function(from, trigger, speed) {
    var btn_text = '';
    if (MlkshkBrowser.running) {
      btn_text = 'Start Slideshow';
      clearInterval(MlkshkBrowser.interval);
    }
    else {
      MlkshkBrowser.go(from);
      btn_text = 'Stop Slideshow';
      MlkshkBrowser.interval = setInterval(MlkshkBrowser.next, speed);
    }
    trigger.value = btn_text;
    MlkshkBrowser.running = !MlkshkBrowser.running;
  }
}