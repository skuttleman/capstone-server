var route = require('express').Router();
var sockets = require('../../services/socket');

module.exports = route;

var _wal = {
  name: 'wall',
  action: 'block'
};

var _bzz = {
  name: 'electric-block',
  targets: ['player'],
  action: 'teleportThing',
  location: {
    x: 50,
    y: 50
  },
  effectors: ['player']
};

var _bn1 = {
  name: 'button',
  onPlayerEnter: {
    animations: {
      button1: 'on',
      path1: 'off to on'
    },
    deepUpdates: [
      {
        addresses: [
          'player1_state.level.7.2',
          'player1_state.level.7.3',
          'player1_state.level.7.4',
          'player1_state.level.6.4',
          'player1_state.level.5.4',
          'player1_state.level.5.5',
          'player1_state.level.4.5',
          'player1_state.level.4.6',
          'player1_state.level.4.7',
          'player1_state.level.5.7',
          'player1_state.level.6.7'
        ],
        value: null
      },{
        addresses: [
          'player2_state.playAnimations.button1',
          'player2_state.playAnimations.path1'
        ],
        value: 'on'
      }
    ]
  },
  onPlayerExit: {
    animations: {
      button1: 'off',
      path1: 'on to off'
    },
    deepUpdates: [
      {
        addresses: [
          'player1_state.level.7.2',
          'player1_state.level.7.3',
          'player1_state.level.7.4',
          'player1_state.level.6.4',
          'player1_state.level.5.4',
          'player1_state.level.5.5',
          'player1_state.level.4.5',
          'player1_state.level.4.6',
          'player1_state.level.4.7',
          'player1_state.level.5.7',
          'player1_state.level.6.7'
        ],
        value: _bzz
      },{
        addresses: [
          'player2_state.playAnimations.button1',
          'player2_state.playAnimations.path1'
        ],
        value: 'off'
      }
    ]
  }
};

var _bn2 = {
  name: 'button',
  onPlayerEnter: {
    animations: {
      button2: 'on',
      path2: 'off to on'
    },
    deepUpdates: [
      {
        addresses: [
          'player1_state.level.5.8',
          'player1_state.level.4.8',
          'player1_state.level.4.7',
          'player1_state.level.4.6',
          'player1_state.level.5.6',
          'player1_state.level.6.6',
          'player1_state.level.6.5',
          'player1_state.level.6.4',
          'player1_state.level.5.4',
          'player1_state.level.5.3'
        ],
        value: null
      },{
        addresses: [
          'player2_state.playAnimations.button2',
          'player2_state.playAnimations.path2'
        ],
        value: 'on'
      }
    ]
  },
  onPlayerExit: {
    animations: {
      button2: 'off',
      path2: 'on to off'
    },
    deepUpdates: [
      {
        addresses: [
          'player1_state.level.5.8',
          'player1_state.level.4.8',
          'player1_state.level.4.7',
          'player1_state.level.4.6',
          'player1_state.level.5.6',
          'player1_state.level.6.6',
          'player1_state.level.6.5',
          'player1_state.level.6.4',
          'player1_state.level.5.4',
          'player1_state.level.5.3'
        ],
        value: _bzz
      },{
        addresses: [
          'player2_state.playAnimations.button2',
          'player2_state.playAnimations.path2'
        ],
        value: 'off'
      }
    ]
  }
};

var _bn3 = {
  name: 'button',
  onPlayerEnter: {
    animations: {
      button3: 'on',
      path3: 'off to on'
    },
    deepUpdates: [
      {
        addresses: [
          'player1_state.level.4.4',
          'player1_state.level.4.5',
          'player1_state.level.4.6',
          'player1_state.level.5.3',
          'player1_state.level.5.6',
          'player1_state.level.6.3',
          'player1_state.level.6.5',
          'player1_state.level.6.6',
          'player1_state.level.7.3',
          'player1_state.level.7.4',
          'player1_state.level.7.5'
        ],
        value: null
      },{
        addresses: [
          'player2_state.playAnimations.button3',
          'player2_state.playAnimations.path3'
        ],
        value: 'on'
      }
    ]
  },
  onPlayerExit: {
    animations: {
      button3: 'off',
      path3: 'on to off'
    },
    deepUpdates: [
      {
        addresses: [
          'player1_state.level.4.4',
          'player1_state.level.4.5',
          'player1_state.level.4.6',
          'player1_state.level.5.3',
          'player1_state.level.5.6',
          'player1_state.level.6.3',
          'player1_state.level.6.5',
          'player1_state.level.6.6',
          'player1_state.level.7.3',
          'player1_state.level.7.4',
          'player1_state.level.7.5'
        ],
        value: _bzz
      },{
        addresses: [
          'player2_state.playAnimations.button3',
          'player2_state.playAnimations.path3'
        ],
        value: 'off'
      }
    ]
  }
};

var _bn4 = {
  name: 'button',
  onPlayerEnter: {
    animations: {
      button4: 'on'
    },
    deepUpdates: [
      {
        addresses: [
          'player2_state.level.8.5',
          'player2_state.level.8.6',
          'player2_state.level.8.7'
        ],
        value: null
      },{
        addresses: [
          'player1_state.playAnimations.button4'
        ],
        value: 'on'
      },{
        addresses: [
          'player2_state.playAnimations.horizontalBeam'
        ],
        value: 'off'
      }
    ]
  },
  onPlayerExit: {
    animations: {
      button4: 'off'
    },
    deepUpdates: [
      {
        addresses: [
          'player2_state.level.8.5',
          'player2_state.level.8.6',
          'player2_state.level.8.7'
        ],
        value: _wal
      },{
        addresses: [
          'player2_state.playAnimations.horizontalBeam'
        ],
        value: 'on'
      },{
        addresses: [
          'player1_state.playAnimations.button4'
        ],
        value: 'off'
      }
    ]
  }
};

var _win = {
  name: 'win-block',
  targets: ['player'],
  action: 'win',
  effectors: ['player']
};

var pathAnimations = [
  ['off to on', [0,1,2,3], 10],
  ['on to off', [3,2,1,0], 10],
  ['on', [3]],
  ['off', [0]]
];

var gameData = {
  id: 'mock2',
  last_message: [],
  player1: {
    id: 1
  },
  player2: {
    id: 2
  },
  creator: {
    id: 1
  },
  game_status_id: 2,
  game_status: 'player1 turn',

////////////////
/////
// player1 state
/////
////////////////

  player1_state: {
    worldBounds: [0, 0, 650, 550],
    checkOnLoad: [],
    assets: [
      {
        type: 'image',
        args: ['background', '/level-images/level2-p1-bg.png']
      },{
        type: 'spritesheet',
        args: ['player', '/level-images/hyperlink.png', 50, 50]
      },{
        type: 'spritesheet',
        args: ['electric-pool object', '/level-images/electric-pool.png', 400, 250]
      },{
        type: 'spritesheet',
        args: ['button object', '/level-images/button.png', 50, 50]
      }
    ],
    sprites: [
      {
        type: 'sprite',
        args: [0, 0, 'background']
      },{
        type: 'sprite',
        args: [100, 150, 'electric-pool object'],
        properties: {
          name: 'electric-pool object',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [300, 450, 'button object'],
        properties: {
          name: 'button4',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [50, 150, 'player'],
        properties: {
          name: 'player',
          move: {
            x: 1,
            y: 1
          },
          type: 'player',
          blocks: ['block', 'player-block']
        }
      }
    ],
    animations: {
      'electric-pool object': [
        ['waves', [0, 1, 2, 3], 8, true]
      ],
      button4: [
        ['off', [0]],
        ['on', [1]]
      ],
      player: [
        ['always', [0, 1, 2, 3], 10, true]
      ]
    },
    playAnimations: {
      'electric-pool object': 'waves',
      'button4': 'off',
      player: 'always'
    },
    watchList: [
      { x: 6, y: 9 }
    ],
    level: [
      [_wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal],
      [_wal, null, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, null, null, _wal],
      [_wal, null, _bzz, null, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, null, null, _wal],
      [_wal, null, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, null, null, _wal],
      [_wal, null, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, null, _bzz, null, null, _wal],
      [_wal, null, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, null, null, _wal],
      [_wal, _wal, _wal, _wal, _wal, null, null, null, _wal, _wal, _wal, _wal, _wal],
      [null, null, null, null, _wal, null, _bn4, null, _wal, null, null, null, null],
      [null, null, null, null, _wal, _wal, _wal, _wal, _wal, null, null, null, null]
    ]
  },

////////////////
//////
// player2_state
/////
////////////////

  player2_state: {
    worldBounds: [0, 0, 650, 550],
    checkOnLoad: [],
    assets: [
      {
        type: 'image',
        args: ['background', '/level-images/level2-p2-bg.png']
      },{
        type: 'spritesheet',
        args: ['player', '/level-images/tilde.png', 50, 50]
      },{
        type: 'spritesheet',
        args: ['button object', '/level-images/button.png', 50, 50]
      },{
        type: 'spritesheet',
        args: ['laser-beam-horizontal object', '/level-images/laser-beam-horizontal.png', 250, 50]
      },{
        type: 'spritesheet',
        args: ['path1 object', '/level-images/path1.png', 400, 250]
      },{
        type: 'spritesheet',
        args: ['path2 object', '/level-images/path2.png', 400, 250]
      },{
        type: 'spritesheet',
        args: ['path3 object', '/level-images/path3.png', 400, 250]
      },{
        type: 'spritesheet',
        args: ['star object', '/level-images/star.png', 50, 50]
      }
    ],
    sprites: [
      {
        type: 'sprite',
        args: [0, 0, 'background']
      },{
        type: 'sprite',
        args: [500, 250, 'button object'],
        properties: {
          name: 'button1',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [500, 200, 'button object'],
        properties: {
          name: 'button2',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [500, 300, 'button object'],
        properties: {
          name: 'button3',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [100, 150, 'path1 object'],
        properties: {
          name: 'path1',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [100, 150, 'path2 object'],
        properties: {
          name: 'path2',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [100, 150, 'path3 object'],
        properties: {
          name: 'path3',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [200, 400, 'laser-beam-horizontal object'],
        properties: {
          name: 'laserBeamHorizontal'
        }
      },{
        type: 'sprite',
        args: [300, 450, 'star object'],
        properties: {
          name: 'star',
          immovable: true,
          blocks: []
        }
      },{
        type: 'sprite',
        args: [50, 150, 'player'],
        properties: {
          name: 'player',
          move: {
            x: 1,
            y: 1
          },
          type: 'player',
          blocks: ['block', 'player-block']
        }
      }
    ],
    animations: {
      button1: [
        ['off', [0]],
        ['on', [1]]
      ],
      button2: [
        ['off', [0]],
        ['on', [1]]
      ],
      button3: [
        ['off', [0]],
        ['on', [1]]
      ],
      path1: pathAnimations,
      path2: pathAnimations,
      path3: pathAnimations,
      player: [
        ['always', [0, 1, 2, 3, 4, 5], 10, true]
      ],
      laserBeamHorizontal: [
        ['always', [0, 1, 2, 3, 4], 10, true],
        ['off', [5]]
      ],
      star: [
        ['on', [0]],
        ['off', [1]]
      ]
    },
    playAnimations: {
      'button1': 'off',
      'button2': 'off',
      'button3': 'off',
      player: 'always',
      laserBeamHorizontal: 'always',
      star: 'on'
    },
    watchList: [
      { x: 10, y: 4 },
      { x: 10, y: 5 },
      { x: 10, y: 6 },
      { x: 6, y: 9 }
    ],
    level: [
      [_wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, _bn2, null, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, _bn1, null, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, _bn3, null, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal],
      [_wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal],
      [null, null, null, null, _wal, null, _win, null, _wal, null, null, null, null],
      [null, null, null, null, _wal, _wal, _wal, _wal, _wal, null, null, null, null]
    ]
  }
};



route.get('/', function(request, response, next) {
  response.json({ games: [gameData] });
});

route.put('/', function(request, response, next) {
  var room = gameData.player1.id == request.user.id ? gameData.player2.id : gameData.player1.id;
  if (request.body.completed) {
    var socketData = {
      message: 'You have won the Mock Game!',
      id: 'mock2'
    };
  } else {
    Object.keys(request.body.state || {}).forEach(key=> gameData[key] = request.body.state[key]);
    if (gameData.game_status_id == 2) {
      gameData.game_status_id = 3;
      gameData.game_status = 'player2 turn';
    } else {
      gameData.game_status_id = 2;
      gameData.game_status = 'player1 turn';
    }
    socketData = {
      message: 'The Mock Game has been updated.',
      id: 'mock2'
    };
  }
  sockets.send(room, 'game updated', socketData);
  response.json({ success: true });
});

module.exports.data = {
  state: {
    player1_state: gameData.player1_state,
    player2_state: gameData.player2_state,
    last_message: gameData.last_message
  },
  name: 'Night Swimming',
  creator_id: 1,
  thumbnail: '/images/level2_tn.png'
};
