function SkewbAlgRater (alg) {
    var rating = 0;
    var startingPos = "";
    var currentPos = "";
    var i = 0;
    results = [];
    let algArr = [];
    var MSR;

//r' R r = home, R' = z' R'
const posWeight = [
  {name:"home",
   "R": 0.9,
   "r": 0.9,
   "b": 0.75,
   "B": 0.7,
   "R'": 0.85,
   "r'": 0.95,
   "b'": 0.75,
   "B'": 0.7,
   "z": 0.7,
   "z'": 0.7,
   "z2": 0.2
    },
  {name:"r",
   "R": 0.4,
   "r": 0.8,
   "b": 0.2,
   "B": 0.6,
   "R'": 0.7,
   "r'": 0.95,
   "b'": 0.4,
   "B'": 0.1,
   "z": 0.7,
   "z'": 0.7,
   "z2": 0.6
 }, 
  {name:"r'",
   "R": 0.95,
   "r": 0.95,
   "b": 0.6,
   "B": 0.7,
   "R'": 0.9,
   "r'": 0.6,
   "b'": 0.2,
   "B'": 0.7,
   "z": 0.5,
   "z'": 0.8,
   "z2": 0.4
     }, 
  {name:"R",
   "R": 0.7,
   "r": 0.95,
   "b": 0.7,
   "B": 0.3,
   "R'": 0.95,
   "r'": 0.95,
   "b'": 0.55,
   "B'": 0.2,
   "z": 0.8,
   "z'": 0.3,
   "z2": 0.2
     }, 
  {name:"R'",
   "R": 0.95,
   "r": 0.7,
   "b": 0.15,
   "B": 0.6,
   "R'": 0.5,
   "r'": 0.3,
   "b'": 0.4,
   "B'": 0.3,
   "z": 0.6,
   "z'": 0.7,
   "z2": 0.6
     },            
  {name:"r' R",
   "R": 0.2,
   "r": 0.95,
   "b": 0.6,
   "B": 0.4,
   "R'": 0.95,
   "r'": 0.4,
   "b'": 0.3,
   "B'": 0.5,
   "z": 0.9,
   "z'": 0.5,
   "z2": 0.3
     },
  {name:"z home",
   "R": 0.8,
   "r": 0.7,
   "b": 0.6,
   "B": 0.8,
   "R'": 0.85,
   "r'": 0.75,
   "b'": 0.6,
   "B'": 0.6,
   "z": 0.5,
   "z'": 0.4,
   "z2": 0.1
   },
  {name:"z' home",
   "R": 0.6,
   "r": 0.9,
   "b": 0.8,
   "B": 0.7,
   "R'": 0.75,
   "r'": 0.6,
   "b'": 0.85,
   "B'": 0.75,
   "z": 0.5,
   "z'": 0.4,
   "z2": 0.1  
    },
  {name:"z2 home",
   "R": 0.7,
   "r": 0.6,
   "b": 0.8,
   "B": 0.8,
   "R'": 0.75,
   "r'": 0.6,
   "b'": 0.7,
   "B'": 0.8,
   "z": 0.5,
   "z'": 0.4,
   "z2": 0.2
    }
];


const posMap = [
  {
      name: "home",
      moves: [
          ["R", "R"],
          ["r", "r"],
          ["b", "home"],
          ["B", "home"],
          ["R'", "R'"],
          ["r'", "r'"],
          ["b'", "home"],
          ["B'", "home"],
          ["z", "home"],
          ["z'", "home"],
          ["z2", "home"]
      ]
  },
  {
      name: "r",
      moves: [
          ["R", "home"],
          ["r", "r'"],
          ["b", "r"],
          ["B", "home"],
          ["R'", "r"],
          ["r'", "home"],
          ["b'", "z' home"],
          ["B'", "r"],
          ["z", "r"],
          ["z'", "r"],
          ["z2", "R'"]
      ]
  },
  {
      name: "r'",
      moves: [
          ["R", "r' R"],
          ["r", "home"],
          ["b", "r"],
          ["B", "r'"],
          ["R'", "z' home"],
          ["r'", "R'"],
          ["b'", "z' home"],
          ["B'", "r'"],
          ["z", "r'"],
          ["z'", "home"],
          ["z2", "R'"]
      ]
  },
  {
      name: "R",
      moves: [
          ["R", "R'"],
          ["r", "R"],
          ["b", "R"],
          ["B", "R"],
          ["R'", "home"],
          ["r'", "R"],
          ["b'", "R"],
          ["B'", "R'"],
          ["z", "home"],
          ["z'", "R"],
          ["z2", "r"]
      ]
  },
  {
      name: "R'",
      moves: [
          ["R", "home"],
          ["r", "r"],
          ["b", "R'"],
          ["B", "z home"],
          ["R'", "R"],
          ["r'", "r'"],
          ["b'", "r' R"],
          ["B'", "z2 home"],
          ["z", "R'"],
          ["z'", "home"],
          ["z2", "r"]
      ]
  },
  {
      name: "r' R",
      moves: [
          ["R", "r' R"],
          ["r", "home"],
          ["b", "r' R"],
          ["B", "R"],
          ["R'", "r'"],
          ["r'", "r'"],
          ["b'", "r' R"],
          ["B'", "z' home"],
          ["z", "r'"],
          ["z'", "home"],
          ["z2", "r"]
      ]
  },
  {
      name: "z home",
      moves: [
          ["R", "r"],
          ["r", "z home"],
          ["b", "z home"],
          ["B", "z2 home"],
          ["R'", "home"],
          ["r'", "z home"],
          ["b'", "z home"],
          ["B'", "home"],
          ["z", "home"],
          ["z'", "home"],
          ["z2", "home"]
      ]
  },
  {
      name: "z' home",
      moves: [
          ["R", "z' home"],
          ["r", "home"],
          ["b", "r"],
          ["B", "z' home"],
          ["R'", "z' home"],
          ["r'", "R'"],
          ["b'", "z2 home"],
          ["B'", "z' home"],
          ["z", "home"],
          ["z'", "home"],
          ["z2", "home"]
      ]
  },
{
      name: "z2 home",
      moves: [
          ["R", "z2 home"],
          ["r", "z2 home"],
          ["b", "R"],
          ["B", "z' home"],
          ["R'", "z2 home"],
          ["r'", "z home"],
          ["b'", "z home"],
          ["B'", "z home"],
          ["z", "home"],
          ["z'", "home"],
          ["z2", "home"]
      ]
  }
];

    algArr.push(alg);
    console.log(algArr);
  algArr.forEach(iteration => {
    let Zalg = Ztranspose(iteration);
    let ZPalg = ZPtranspose(iteration);
    let ZTalg = ZTtranspose(iteration);

    let algRating = doAlg(iteration);
    let ZalgRating = doAlg(Zalg);
    let ZPalgRating = doAlg(ZPalg);
    let ZTalgRating = doAlg(ZTalg);
  
    var allAlgRatings = {
      algRating: algRating,
      ZalgRating: ZalgRating,
      ZPalgRating: ZPalgRating,
      ZTalgRating: ZTalgRating    
    };

    var algNameMap = {
      algRating: iteration,
      ZalgRating: Zalg,
      ZPalgRating: ZPalg,
      ZTalgRating: ZTalg
    };
  
  let bestAngle = rankAlgAngles(allAlgRatings);
  MSR = output(bestAngle.alg, bestAngle.value, algNameMap);
  });


function doAlg(algArr) {
   var positions = ["home", "r", "r'", "R", "R'", "r' R"];
   var rating = 0;
   let algByMove = algArr.split(" ");
   var TempPos;
   let bestRating = 10;
   var tempRating = 10;
   positions.forEach(pos => {
      let rating = 0;
      TempPos = pos;
      algByMove.forEach(move => {          
          rating = rating + rateAlg(TempPos, move);
          TempPos = doMove(TempPos, move);
        });
     let posRating = checkBestPos(rating);
     if (tempRating > posRating) {
       tempRating = posRating;
     }
   });
  bestRating = tempRating;
  tempRating = 10;
  return bestRating;
}

function doMove(currentPos, move) {
  var resPos = false;
  posMap.forEach((p) => {
    if (p.name == currentPos) {
      p.moves.forEach((m) => {
        if (m[0] == move){
          resPos = m[1];
        };
      });
    };
  });
  return resPos;
}; 

function rateAlg (pos, move){
  var res = 0;
  posWeight.forEach(p => {   
    if (p.name == pos) {
      res = 1 - p[move];
      res = Number(res.toFixed(2));
    };
  });
  return res;
};

function Ztranspose(alg) {
  return alg.replace(/[rRBb]/g, match => ({
    'r': 'b',
    'R': 'r',
    'B': 'R',
    'b': 'B'
  }[match]));
}

function ZPtranspose(alg) {
  return alg.replace(/[rRBb]/g, match => ({
    'r': 'R',
    'R': 'B',
    'B': 'b',
    'b': 'r' 
  }[match]));
}

function ZTtranspose(alg) {
  return alg.replace(/[rRbB]/g, match => ({
    'r': 'B',
    'B': 'r',
    'R': 'b',
    'b': 'R'
  }[match]));
}

function rankAlgAngles(allAlgs){
  var min = Infinity;
  var algName = "";
  
  for(var i in allAlgs) {
   if(allAlgs[i] < min) {
      min = Number(allAlgs[i].toFixed(2));
      algName = i;
    }
  }
  return {alg: algName, value: min};
}

function checkBestPos(rating) {
  let bestRating = 20;
  if (rating < bestRating) {
    bestRating = rating;
  }
  return bestRating;
}

function output (algName, rating, algNameMap){
  let ratingAlg = []
  let alg = algNameMap[algName];
  ratingAlg.push(rating);
  ratingAlg.push(alg);
  return ratingAlg;
}

return MSR;
}