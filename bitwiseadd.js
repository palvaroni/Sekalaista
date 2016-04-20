// lol
function bwadd(a, b){
  var carry = a & b;
  var result = a ^ b;
  
  while(carry !== 0) {
    var shifted_c = carry << 1;
    carry = result & shifted_c;
    result ^= shifted_c;
  }
  
  return result;
}
