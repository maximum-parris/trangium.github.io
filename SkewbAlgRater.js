var positions = ["home", "r", "r'", "R", "R'", "r' R"];

function SkewbAlgRater(alg) {
  return Number(doAlg(alg).toFixed(2)); // MSR
}

function doAlg(algArr) {
  let tempRating = 10;
  let algByMove = algArr.split(" ");

  for (let pos of positions) {
    let rating = 0;
    let tempPos = pos;
    for (let move of algByMove) {
      if (rating <= 2) {
        rating = rating + rateAlg(tempPos, move);
        tempPos = posMap[tempPos][move];
      } else {
        rating = 10;
        break;
      }
    }
    if (rating < tempRating) {
      tempRating = rating;
    }
  }
  return tempRating;
}

/*
function doMove(currentPos, move) {
  return posMap[currentPos][move];
} */

function rateAlg(pos, move) {
  let p = posWeight[pos][move];
  p = 1 - p;
  return Number(p.toFixed(2));
}

const posMap = {
  "home": {
    "R": "R", "r": "r", "b": "home", "B": "home",
    "R'": "R'", "r'": "r'", "b'": "home", "B'": "home",
    "z": "home", "z'": "home", "z2": "home"
  },
  "r": {
    "R": "home", "r": "r'", "b": "r", "B": "home",
    "R'": "r", "r'": "home", "b'": "z' home", "B'": "r",
    "z": "r", "z'": "r", "z2": "R'"
  },
  "r'": {
    "R": "r' R", "r": "home", "b": "r", "B": "r'",
    "R'": "z' home", "r'": "R'", "b'": "z' home", "B'": "r'",
    "z": "r'", "z'": "home", "z2": "R'"
  },
  "R": {
    "R": "R'", "r": "R", "b": "R", "B": "R",
    "R'": "home", "r'": "R", "b'": "R", "B'": "R'",
    "z": "home", "z'": "R", "z2": "r"
  },
  "R'": {
    "R": "home", "r": "r", "b": "R'", "B": "z home",
    "R'": "R", "r'": "r'", "b'": "r' R", "B'": "z2 home",
    "z": "R'", "z'": "home", "z2": "r"
  },
  "r' R": {
    "R": "r' R", "r": "home", "b": "r' R", "B": "R",
    "R'": "r'", "r'": "r'", "b'": "r' R", "B'": "z' home",
    "z": "r'", "z'": "home", "z2": "r"
  },
  "z home": {
    "R": "r", "r": "z home", "b": "z home", "B": "z2 home",
    "R'": "home", "r'": "z home", "b'": "z home", "B'": "home",
    "z": "home", "z'": "home", "z2": "home"
  },
  "z' home": {
    "R": "z' home", "r": "home", "b": "r", "B": "z' home",
    "R'": "z' home", "r'": "R'", "b'": "z2 home", "B'": "z' home",
    "z": "home", "z'": "home", "z2": "home"
  },
  "z2 home": {
    "R": "z2 home", "r": "z2 home", "b": "R", "B": "z' home",
    "R'": "z2 home", "r'": "z home", "b'": "z home", "B'": "z home",
    "z": "home", "z'": "home", "z2": "home"
  }
};

const posWeight = {
  "home": {
    "R": 0.9, "r": 0.9, "b": 0.75, "B": 0.7,
    "R'": 0.85, "r'": 0.95, "b'": 0.75, "B'": 0.7,
    "z": 0.7, "z'": 0.7, "z2": 0.2
  },
  "r": {
    "R": 0.4, "r": 0.8, "b": 0.2, "B": 0.6,
    "R'": 0.7, "r'": 0.95, "b'": 0.4, "B'": 0.1,
    "z": 0.7, "z'": 0.7, "z2": 0.6
  },
  "r'": {
    "R": 0.95, "r": 0.95, "b": 0.6, "B": 0.7,
    "R'": 0.9, "r'": 0.6, "b'": 0.2, "B'": 0.7,
    "z": 0.5, "z'": 0.8, "z2": 0.4
  },
  "R": {
    "R": 0.7, "r": 0.95, "b": 0.7, "B": 0.3,
    "R'": 0.95, "r'": 0.95, "b'": 0.55, "B'": 0.2,
    "z": 0.8, "z'": 0.3, "z2": 0.2
  },
  "R'": {
    "R": 0.95, "r": 0.7, "b": 0.15, "B": 0.6,
    "R'": 0.5, "r'": 0.3, "b'": 0.4, "B'": 0.3,
    "z": 0.6, "z'": 0.7, "z2": 0.6
  },
  "r' R": {
    "R": 0.2, "r": 0.95, "b": 0.6, "B": 0.4,
    "R'": 0.95, "r'": 0.4, "b'": 0.3, "B'": 0.5,
    "z": 0.9, "z'": 0.5, "z2": 0.3
  },
  "z home": {
    "R": 0.8, "r": 0.7, "b": 0.6, "B": 0.8,
    "R'": 0.85, "r'": 0.75, "b'": 0.6, "B'": 0.6,
    "z": 0.5, "z'": 0.4, "z2": 0.1
  },
  "z' home": {
    "R": 0.6, "r": 0.9, "b": 0.8, "B": 0.7,
    "R'": 0.75, "r'": 0.6, "b'": 0.85, "B'": 0.75,
    "z": 0.5, "z'": 0.4, "z2": 0.1
  },
  "z2 home": {
    "R": 0.7, "r": 0.6, "b": 0.8, "B": 0.8,
    "R'": 0.75, "r'": 0.6, "b'": 0.7, "B'": 0.8,
    "z": 0.5, "z'": 0.4, "z2": 0.2
  }
};
