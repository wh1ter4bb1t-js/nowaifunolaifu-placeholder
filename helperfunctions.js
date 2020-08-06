
const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
});

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x) 
 })

const sizeLimit = 1500;
const checkVal = x => (x !== null || x !== undefined) && (Number(x) < sizeLimit && Number(x) > 0);
const responseReceived = x => checkVal(x) ? Right(x) : Left(x);

const randomize = xs => xs[Math.floor(Math.random() * xs.length)]; 

module.exports = { checkVal, responseReceived, randomize };