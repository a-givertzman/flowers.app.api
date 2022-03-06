const key = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЁЯЧСМИТЬБЮйцукенгшщзхъфывапролджэёячсмитьбю';
function testDecrypt() {
  // let value = '123qwe'
  let values = [
    '123!@#', '123qwe', 'jytfu67YGI&^URT','1234567890-=', '!@#\$%^&*()_+', '!"№%:,.;()_+"', 
    'ЙЦУКЕНГШЩЗХЪ', 'йцукенгшщзхъ', 'ячсмитьбю', '[ЯЧСМИТЬБЮ?',
    'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЁЯЧСМИТЬБЮ?йцукенгшщзхъфывапролджэёячсмитьбю/',
    '; , / ? : @ & = +  - _ . ! ~ *  ( ) #'
  ];
  // values = ['!','№',':','.',';','(',')','_', '='];
  var err = 0;
  values.forEach( (value) => {
    console.log(`value(${value.length}):`, value);
    let encrypted = _encrypt(value, key);
    console.log(`encrypted(${encrypted.length}):`, encrypted);
    let decrypted = _decrypt(encrypted, key);
    console.log(`decrypted(${decrypted.length}):`, decrypted);
    if (value == decrypted) {
      console.log('\tOK');
    } else {
      err++;
    }
    console.log('===============\n');
  });
  if (err > 0) {
    console.log('\ERROR');
  } else {
    console.log('\OK');
  }
}

export function encrypt(source) {
  return _encrypt(String(source), key);
}
export function decrypt(source) {
  return _decrypt(source, key);
}
function _encrypt(source, key) {
  let k = [];
  let s = "";
  let lKey = _escape(key);
  let lSource = _escape(source);
  for (var i = 0; i < lKey.length; i++) {
    let keySlice = lKey[i];
    k[i] = keySlice;
  }
  for (var i=0; i < lSource.length; i++) {
    s += _encode(lSource[i], k).toString();
    s += (i < lSource.length -1) ? ',' : '';
  }
  return s;
}

function _decrypt(source, key) {
  var k = [];
  var s = "";
  let lKey = _escape(key);
  let lSource = source
    .split(',')
    .map((str) => parseInt(str));
  for (var i = 0; i < lKey.length; i++) {
    let keySlice = lKey[i];
    k[i] = keySlice;
  }
  for (var i = 0; i < lSource.length; i++) {
    s += _decode(lSource[i], k).toString();
    s += (i < lSource.length -1) ? ',' : '';
  }
  return _unescape(s);
}

function _escape(str) {
  return [...str].map(c => c.charCodeAt(0));
}
function _unescape(value) {
  let strCodes = value.split(',');
  let intCodes = strCodes.map((str) => parseInt(str));
  return String.fromCharCode(...intCodes);
}

function _encode(v, k) {
    var y = v;
    var z = v;
    const delta = 0x9E3779B9;
    var sum = 0;
    for (var i = 0; i < 32; i++) {
      let add1 = k[sum & 3];
      y += (add1 ^ i) + add1;
      sum += delta;
    }
    // print(index);
    return y;
}

function _decode(v, k) {
    var y = v;
    var z = v;
    const delta = 0x9E3779B9;
    var sum = delta * 32;
    for (var i = 31; i >= 0; i--) {
      let add2 = k[sum & 3];
      z -= (add2 ^ i) + add2;
      sum -= delta;
    }
    return z;
}
