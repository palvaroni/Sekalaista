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
