var positions = ["home", "r", "r'", "R", "R'", "r' R"];

function SkewbAlgRater(alg, bool) {
  if (!bool) {
    return Number(doAlg(alg).toFixed(2)); // MSR
  } else {
    let bestRating = Infinity;
    let bestAlg = "";
    findAllRots(alg).forEach(angle => {
      console.log("Testing:", angle[0]);
      let rating = doAlg(angle[0]);
      if (rating < bestRating) {
        bestRating = Number(rating.toFixed(2));
        bestAlg = angle[1] + angle[0]; //contains rotation+alg
      }
    });
    return ([bestRating, bestAlg]);
  }
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

var allAngles = ['z', 'z2', 'z3',
  'x', 'x z', 'x z2', 'x z3',
  'x2', 'x2 z', 'x2 z2', 'x2 z3',
  'x3', 'x3 z', 'x3 z2', 'x3 z3',
  'y', 'y z', 'y z2', 'y z3', 'y3',
  'y3 z', 'y3 z2', 'y3 z3']

function findAllRots(alg) {
  let res = []
  res.push([alg, ""]);

  allAngles.forEach(angle => {
    let newAlg = "";
    if (!angle.includes(" ")) {
      newAlg = findAngle(alg, angle);
    } else {
      let rots = angle.split(" ");
      newAlg = findAngle(alg, rots[0]);
      newAlg = unkael(newAlg);
      newAlg = findAngle(newAlg, rots[1]);
    }
    newAlg = unkael(newAlg);
    res.push([newAlg, angle])
  })
  console.log(res);
  return res;
}

function findAngle(alg, rot) {
  const maps = {
    // Your maps
    'z': { 'r': 'b', 'R': 'r', 'B': 'R', 'b': 'B' },
    'z2': { 'r': 'B', 'B': 'r', 'R': 'b', 'b': 'R' },
    'z3': { 'r': 'R', 'R': 'B', 'B': 'b', 'b': 'r' },

    'x': { 'r': 'f', 'R': 'r', 'B': 'b', 'b': 'l' },
    'x2': { 'r': 'F', 'R': 'f', 'B': 'l', 'b': 'L' },
    'x3': { 'r': 'R', 'R': 'F', 'B': 'L', 'b': 'B' },

    'y': { 'r': 'f', 'R': 'F', 'B': 'R', 'b': 'r' },
    'y3': { 'r': 'b', 'R': 'B', 'B': 'L', 'b': 'l' }
  };

  const map = maps[rot];
  if (!map) return alg;

  // Replace r,R,b,B with mapped values, preserving primes
  return alg.replace(/([rRbB])([']?)/g, (match, letter, prime) => {
    return (map[letter] || letter) + prime;
  });
}

function unkael(s) {
  // Convert string to array for manipulation
  let chars = s.split('');
  let i = 0;
  let x = chars.length;

  while (i <= x) {
    if (chars[i] === 'F') {
      chars[i] = 'b';
      if (i < x) i++;
      let y = i;

      if (chars[i] === ' ') {
        while (y <= x) {
          if (chars[y] === 'R') chars[y] = 'L';
          else if (chars[y] === 'r') chars[y] = 'B';
          else if (chars[y] === 'B') chars[y] = 'l';
          else if (chars[y] === 'f') chars[y] = 'R';
          else if (chars[y] === 'L') chars[y] = 'f';
          else if (chars[y] === 'l') chars[y] = 'r';
          y++;
        }
      } else {
        while (y <= x) {
          if (chars[y] === 'R') chars[y] = 'f';
          else if (chars[y] === 'r') chars[y] = 'l';
          else if (chars[y] === 'B') chars[y] = 'r';
          else if (chars[y] === 'f') chars[y] = 'L';
          else if (chars[y] === 'L') chars[y] = 'R';
          else if (chars[y] === 'l') chars[y] = 'B';
          y++;
        }
      }
    }
    else if (chars[i] === 'f') {
      chars[i] = 'B';
      if (i < x) i++;
      let y = i;

      if (chars[i] === ' ') {
        while (y <= x) {
          if (chars[y] === 'R') chars[y] = 'L';
          else if (chars[y] === 'r') chars[y] = 'F';
          else if (chars[y] === 'b') chars[y] = 'R';
          else if (chars[y] === 'F') chars[y] = 'l';
          else if (chars[y] === 'L') chars[y] = 'b';
          else if (chars[y] === 'l') chars[y] = 'r';
          y++;
        }
      } else {
        while (y <= x) {
          if (chars[y] === 'R') chars[y] = 'b';
          else if (chars[y] === 'r') chars[y] = 'l';
          else if (chars[y] === 'b') chars[y] = 'L';
          else if (chars[y] === 'F') chars[y] = 'r';
          else if (chars[y] === 'L') chars[y] = 'R';
          else if (chars[y] === 'l') chars[y] = 'F';
          y++;
        }
      }
    }
    else if (chars[i] === 'l') {
      chars[i] = 'R';
      if (i < x) i++;
      let y = i;

      if (chars[i] === ' ') {
        while (y <= x) {
          if (chars[y] === 'r') chars[y] = 'F';
          else if (chars[y] === 'B') chars[y] = 'r';
          else if (chars[y] === 'b') chars[y] = 'f';
          else if (chars[y] === 'F') chars[y] = 'B';
          else if (chars[y] === 'f') chars[y] = 'L';
          else if (chars[y] === 'L') chars[y] = 'b';
          y++;
        }
      } else {
        while (y <= x) {
          if (chars[y] === 'r') chars[y] = 'B';
          else if (chars[y] === 'B') chars[y] = 'F';
          else if (chars[y] === 'b') chars[y] = 'L';
          else if (chars[y] === 'F') chars[y] = 'r';
          else if (chars[y] === 'f') chars[y] = 'b';
          else if (chars[y] === 'L') chars[y] = 'f';
          y++;
        }
      }
    }
    else if (chars[i] === 'L') {
      chars[i] = 'r';
      if (i < x) i++;
      let y = i;

      if (chars[i] === ' ') {
        while (y <= x) {
          if (chars[y] === 'R') chars[y] = 'b';
          else if (chars[y] === 'B') chars[y] = 'l';
          else if (chars[y] === 'b') chars[y] = 'f';
          else if (chars[y] === 'F') chars[y] = 'B';
          else if (chars[y] === 'f') chars[y] = 'R';
          else if (chars[y] === 'l') chars[y] = 'F';
          y++;
        }
      } else {
        while (y <= x) {
          if (chars[y] === 'R') chars[y] = 'f';
          else if (chars[y] === 'B') chars[y] = 'F';
          else if (chars[y] === 'b') chars[y] = 'R';
          else if (chars[y] === 'F') chars[y] = 'l';
          else if (chars[y] === 'f') chars[y] = 'b';
          else if (chars[y] === 'l') chars[y] = 'B';
          y++;
        }
      }
    }
    i++;
  }
  return chars.join('');
}