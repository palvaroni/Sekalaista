
function t1(sprintcount) {
  let sum = 0;

  for (let i = 0; i <= sprintcount; i++) {
    sum += sprintcount / 2 - i * (
      (sprintcount - 2) / (2 * sprintcount));
  }

  return sum;
}

function t2(sprintcount, offset) {
  // This no solid Implement dirac
  offset = sprintcount * offset;
  return 1 / 4 * Math.pow(sprintcount - offset, 2) + sprintcount;
}

console.log(t1(100), t2(100, .00451));
