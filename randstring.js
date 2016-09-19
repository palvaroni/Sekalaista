function _randomPassword(l) {
  var cryptoObj = window.crypto || window.msCrypto;
  var buf = new Uint8Array(l);
  var s = '';
  
  cryptoObj.getRandomValues(buf);
  
  l -= 1;
  for (var i = 0; i < l; i++) {
    s += buf[i].toString(16);
  }
  
  return s;
}

var specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
var lowercase = 'abcdefghijklmnopqrstuvwxyz';
var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var numbers = '0123456789';

var all = specials + lowercase + uppercase + numbers;

String.prototype.pick = function(min, max) {
    var n, chars = '';

    if (typeof max === 'undefined') {
        n = min;
    } else {
        n = min + Math.floor(Math.random() * (max - min));
    }

    for (var i = 0; i < n; i++) {
        chars += this.charAt(Math.floor(Math.random() * this.length));
    }

    return chars;
};


// Credit to @Christoph: http://stackoverflow.com/a/962890/464744
String.prototype.shuffle = function() {
    var array = this.split('');
    var tmp, current, top = array.length;

    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array.join('');
};

var password = (specials.pick(1) + lowercase.pick(1) + uppercase.pick(1) + all.pick(3, 10)).shuffle();
