var specials = '!@#%&()_+{}<>?\|[]/~';
var lowercase = 'abcdefghijklmnopqrstuvwxyz';
var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var numbers = '0123456789';

var all = specials + lowercase + uppercase + numbers;

function _randomPassword(l) {
  var cryptoObj = window.crypto || window.msCrypto;

  var buf = new Uint8Array(l);
  var indexer = new Uint8Array(l);

  var s = [];

  cryptoObj.getRandomValues(buf);
  cryptoObj.getRandomValues(indexer);

  var sl = specials.length - 1;
  var ll = lowercase.length - 1;
  var ul = uppercase.length - 1;
  var nl = numbers.length - 1;
  var al = all.length - 1;

  var indexes = [];  
  (function _generateIndexOrder() {
	let lth = indexer.length - 1;
	for (let i = lth; i >= 0; i--) {
	  let count = 0;
	  for (let j = 0; j <= lth; j++) {
		if (indexer[j] > indexer[i]) count++;
		else if (indexer[j] === indexer[i] && j < i) count++;
	  }
	  indexes[i] = count;
	}
  })();

  s[indexes[0]] = specials[Math.floor((sl*(buf[0]/255)) + 0.5)];
  s[indexes[1]] = lowercase[Math.floor((ll*(buf[1]/255)) + 0.5)];
  s[indexes[2]] = uppercase[Math.floor((ul*(buf[2]/255)) + 0.5)];
  s[indexes[3]] = numbers[Math.floor((nl*(buf[3]/255)) + 0.5)];

  for (var i = 4; i < l; i++) {
	s[indexes[i]] = all[Math.floor((al*(buf[i]/255)) + 0.5)];
  }

  console.log(indexes, buf, indexer, s[indexes[0]]);

  return s.join("");
}
