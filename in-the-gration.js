function t1(sprintcount) {
  let sum = 0;

  for (let i = 0; i <= sprintcount; i++) {
    sum += sprintcount / 2 - i * (
      (sprintcount - 2) / (2 * sprintcount));
  }

  return sum;
}

function t2(sprintcount) {
  return 1 / 4 * Math.pow(sprintcount, 2)
    + sprintcount
    - Math.pow(sprintcount, 2) / (4 * sprintcount)
    + 1 / 2;
}

function t3(sprintcount) {
  return (
      Math.pow(sprintcount, 2)
      + 3 * sprintcount
      + 2
    ) / 4;
}

console.log(t1(100), t2(100), t3(100));
