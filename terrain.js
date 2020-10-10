let a = [].concat(...[
  [0,1,1,1,0],
  [1,1,2,2,1],
  [1,1,2,2,1],
  [1,1,1,1,1],
  [0,1,1,0,0],
].reverse());

let b = [].concat(...[
  [0,1,3,2,6,0],
  [2,6,7,7,7,6],
  [5,7,7,7,7,5],
  [6,7,7,7,7,7],
  [0,7,7,7,6,0],
  [0,3,4,6,5,0],
].reverse());

let c = [].concat(...[
  [0,1,3,2,14,0],
  [2,14,15,15,15,14],
  [13,15,15,15,15,13],
  [14,15,15,15,15,15],
  [0,15,15,15,14,0],
  [0,13,14,14,13,0],
].reverse());

let d = mat_rotate_cw(b);

let empty = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  ];

const insertIntoChunk = function(insert, smallN, bigN, chunkIn){
  let emptyChunk = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
  ];
  let chunk = chunkIn|| emptyChunk;
  let sm = smallN;
  let lg = bigN || CHUNK_N;
  let newX = Math.floor(Math.random()*(lg - sm));
  let newY = Math.floor(Math.random()*(lg - sm));
  
  for (let ii = 0; ii < sm; ++ii){  
    let cutIn = insert.slice(ii*sm, ii*sm + sm)
    chunk.splice((newY+ii)*lg + newX, sm, ...cutIn);
  }
  return chunk;
}



function getTerrainA() {
  return insertIntoChunk(
    mat_rotate_multi(
      a, 
      Math.floor(Math.random()*4)), 
      5);
}

function getTerrainB() {
  return insertIntoChunk(
    mat_rotate_multi(
      b, 
      Math.floor(Math.random()*4)), 
      6);
}

function getTerrainC() {
  return insertIntoChunk(
    mat_rotate_multi(
      c, 
      Math.floor(Math.random()*4)), 
      6);
}

function getTerrainD() {
  return insertIntoChunk(
    mat_rotate_multi(
      d, 
      Math.floor(Math.random()*4)), 
      6);
}

function getEmptyTerrain() {
  return empty;
}