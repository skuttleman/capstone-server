var route = require('express').Router();
var sockets = require('../../services/socket');

module.exports = route;

var _wal = {
  name: 'wall',
  action: 'block'
};

var _blk = {
  name: 'object block',
  action: 'object-block'
};

var _ws1 = {
  name: 'weight sensor',
  targets: ['symbol1', 'symbol2'],
  effectors: ['object-general']
};

var _ws2 = {
  name: 'weight sensor',
  targets: ['symbol2', 'symbol4'],
  effectors: ['object-general']
};

var _ws3 = {
  name: 'weight sensor',
  targets: ['symbol1', 'symbol3'],
  effectors: ['object-general']
};

var _ws4 = {
  name: 'weight sensor',
  targets: ['symbol1', 'symbol3', 'symbol4'],
  effectors: ['object-general']
};

var _bzz = {
  name: 'electric-block',
  targets: ['player'],
  action: 'teleportThing',
  location: {
    x: 50,
    y: 250
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
          'player1_state.level.10.2',
          'player1_state.level.10.3',
          'player1_state.level.10.4',
          'player1_state.level.9.4',
          'player1_state.level.8.4',
          'player1_state.level.8.5',
          'player1_state.level.7.5',
          'player1_state.level.7.6',
          'player1_state.level.7.7',
          'player1_state.level.8.7',
          'player1_state.level.9.7'
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
          'player1_state.level.10.2',
          'player1_state.level.10.3',
          'player1_state.level.10.4',
          'player1_state.level.9.4',
          'player1_state.level.8.4',
          'player1_state.level.8.5',
          'player1_state.level.7.5',
          'player1_state.level.7.6',
          'player1_state.level.7.7',
          'player1_state.level.8.7',
          'player1_state.level.9.7'
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
          'player1_state.level.8.8',
          'player1_state.level.7.8',
          'player1_state.level.7.7',
          'player1_state.level.7.6',
          'player1_state.level.8.6',
          'player1_state.level.9.6',
          'player1_state.level.9.5',
          'player1_state.level.9.4',
          'player1_state.level.8.4',
          'player1_state.level.8.3'
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
          'player1_state.level.8.8',
          'player1_state.level.7.8',
          'player1_state.level.7.7',
          'player1_state.level.7.6',
          'player1_state.level.8.6',
          'player1_state.level.9.6',
          'player1_state.level.9.5',
          'player1_state.level.9.4',
          'player1_state.level.8.4',
          'player1_state.level.8.3'
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
          'player1_state.level.7.4',
          'player1_state.level.7.5',
          'player1_state.level.7.6',
          'player1_state.level.8.6',
          'player1_state.level.9.6',
          'player1_state.level.9.5',
          'player1_state.level.9.4',
          'player1_state.level.9.3',
          'player1_state.level.8.3',
          'player1_state.level.8.3',
          'player1_state.level.10.5'
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
          'player1_state.level.7.4',
          'player1_state.level.7.5',
          'player1_state.level.7.6',
          'player1_state.level.8.6',
          'player1_state.level.9.6',
          'player1_state.level.9.5',
          'player1_state.level.10.5',
          'player1_state.level.10.4',
          'player1_state.level.10.3',
          'player1_state.level.9.3',
          'player1_state.level.8.3'
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
          'player2_state.level.11.5',
          'player2_state.level.11.6',
          'player2_state.level.11.7'
        ],
        value: null
      },{
        addresses: [
          'player1_state.playAnimations.button4'
        ],
        value: 'on'
      },{
        addresses: [
          'player2_state.playAnimations.laserBeamHorizontal'
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
          'player2_state.level.11.5',
          'player2_state.level.11.6',
          'player2_state.level.11.7'
        ],
        value: _wal
      },{
        addresses: [
          'player1_state.playAnimations.button4'
        ],
        value: 'off'
      },{
        addresses: [
          'player2_state.playAnimations.laserBeamHorizontal'
        ],
        value: 'always'
      }
    ]
  }
};

var _bn5 = {
  name: 'button',
  onPlayerEnter: {
    animations: {
      button5: 'on'
    },
    deepUpdates: [
      {
        addresses: [
          'player1_state.level.3.12',
          'player1_state.level.4.12',
          'player1_state.level.5.12'
        ],
        value: null
      },{
        addresses: [
          'player2_state.playAnimations.button5'
        ],
        value: 'on'
      },{
        addresses: [
          'player1_state.playAnimations.laserBeamVertical'
        ],
        value: 'off'
      }
    ]
  },
  onPlayerExit: {
    animations: {
      button5: 'off'
    },
    deepUpdates: [
      {
        addresses: [
          'player1_state.level.3.12',
          'player1_state.level.4.12',
          'player1_state.level.5.12'
        ],
        value: _wal
      },{
        addresses: [
          'player2_state.playAnimations.button5'
        ],
        value: 'off'
      },{
        addresses: [
          'player1_state.playAnimations.laserBeamVertical'
        ],
        value: 'always'
      }
    ]
  }
};

var _sho = {
  name: 'show-symbols',
  onPlayerEnter: {
    animations: {
      symbols: 'reveal',
      symbolScroll: 'off'
    },
    deepUpdates: [
      {
        addresses: [
          'player2_state.playAnimations.symbols'
        ],
        value: 'show'
      },{
        addresses: [
          'player2_state.playAnimations.symbolScroll'
        ],
        value: 'off'
      },{
        addresses: [
          'player2_state.level.12.6'
        ],
        value: null
      }
    ]
  },
  onPlayerExit: {
    animations: {},
    deepUpdates: []
  }
};

var _win = {
  name: 'win-block',
  targets: ['player'],
  action: 'win',
  effectors: ['player']
};



var symbolCycles = [
  {
    name: 'w to x',
    thisValue: 'x',
    otherValue: 'z'
  },{
    name: 'x to y',
    thisValue: 'y',
    otherValue: 'w'
  },{
    name: 'y to z',
    thisValue: 'z',
    otherValue: 'x'
  },{
    name: 'z to w',
    thisValue: 'w',
    otherValue: 'y'
  }
];

var symbolAnimations = [
  ['w to x', [0, 1, 2, 3], 10],
  ['x to y', [3, 4, 5, 6], 10],
  ['y to z', [6, 7, 8, 9], 10],
  ['z to w', [9, 10, 11, 12], 10],
  ['w', [0]],
  ['x', [3]],
  ['y', [6]],
  ['z', [9]]
];

var pathAnimations = [
  ['off to on', [0,1,2,3], 10],
  ['on to off', [3,2,1,0], 10],
  ['on', [3]],
  ['off', [0]]
];

var gameData = {
  id: 'mock1',
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
    worldBounds: [0, 0, 800, 700],
    checkOnLoad: [],
    assets: [
      {
        type: 'image',
        args: ['background', '/level-images/level1-p1-bg.png']
      },{
        type: 'image',
        args: ['east-west slider object', '/level-images/block.png']
      },{
        type: 'spritesheet',
        // args: ['player', '/level-images/tilde.png', 50, 50]
        args: ['player', '/level-images/hyperlink.png', 50, 50]
        // args: ['player', '/level-images/player.png', 50, 50]
      },{
        type: 'spritesheet',
        args: ['electric-pool object', '/level-images/electric-pool.png', 400, 250]
      },{
        type: 'spritesheet',
        args: ['button object', '/level-images/button.png', 50, 50]
      },{
        type: 'spritesheet',
        args: ['symbol-xyz object', '/level-images/symbol-xyz.png', 50, 50]
      },{
        type: 'spritesheet',
        args: ['star object', '/level-images/star.png', 50, 50]
      },{
        type: 'spritesheet',
        args: ['laser-beam-vertical object', '/level-images/laser-beam-vertical.png', 50, 250]
      }
    ],
    sprites: [
      {
        type: 'sprite',
        args: [0, 0, 'background']
      },{
        type: 'sprite',
        args: [250, 100, 'east-west slider object'],
        properties: {
          name: 'blue-box',
          move: {
            x: 0.5,
            y: 0
          },
          type: 'object-general',
          blocks: ['block', 'object-block']
        }
      },{
        type: 'sprite',
        args: [150, 50, 'symbol-xyz object'],
        properties: {
          name: 'symbol1',
          move: {},
          blocks: [],
          action: 'cycle',
          cycles: {
            next: 0,
            cycles: symbolCycles,
            thisAddress: 'player1_state.playAnimations.symbol1',
            otherAddress: 'player2_state.playAnimations.symbol1'
          }
        }
      },{
        type: 'sprite',
        args: [200, 50, 'symbol-xyz object'],
        properties: {
          name: 'symbol2',
          move: {},
          blocks: [],
          action: 'cycle',
          cycles: {
            next: 0,
            cycles: symbolCycles,
            thisAddress: 'player1_state.playAnimations.symbol2',
            otherAddress: 'player2_state.playAnimations.symbol2'
          }
        }
      },{
        type: 'sprite',
        args: [250, 50, 'symbol-xyz object'],
        properties: {
          name: 'symbol3',
          move: {},
          blocks: [],
          action: 'cycle',
          cycles: {
            next: 0,
            cycles: symbolCycles,
            thisAddress: 'player1_state.playAnimations.symbol3',
            otherAddress: 'player2_state.playAnimations.symbol3'
          }
        }
      },{
        type: 'sprite',
        args: [300, 50, 'symbol-xyz object'],
        properties: {
          name: 'symbol4',
          move: {},
          blocks: [],
          action: 'cycle',
          cycles: {
            next: 0,
            cycles: symbolCycles,
            thisAddress: 'player1_state.playAnimations.symbol4',
            otherAddress: 'player2_state.playAnimations.symbol4'
          }
        }
      },{
        type: 'sprite',
        args: [100, 300, 'electric-pool object'],
        properties: {
          name: 'electric-pool object',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [300, 600, 'button object'],
        properties: {
          name: 'button4',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [600, 100, 'laser-beam-vertical object'],
        properties: {
          name: 'laserBeamVertical'
        }
      },{
        type: 'sprite',
        args: [700, 200, 'star object'],
        properties: {
          name: 'star',
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
        // ['always', [0, 1, 2, 3, 4, 5], 10, true] //(~)
        ['always', [0, 1, 2, 3], 10, true] //other
      ],
      symbol1: symbolAnimations,
      symbol2: symbolAnimations,
      symbol3: symbolAnimations,
      symbol4: symbolAnimations,
      laserBeamVertical: [
        ['always', [0, 1, 2, 3, 4], 10, true],
        ['off', [5]]
      ],
      star: [
        ['on', [0]],
        ['off', [1]]
      ]
    },
    playAnimations: {
      symbol1: 'w',
      symbol2: 'w',
      symbol3: 'w',
      symbol4: 'w',
      'electric-pool object': 'waves',
      'button4': 'off',
      player: 'always',
      laserBeamVertical: 'always',
      star: 'on'
    },
    watchList: [
      { x: 6, y: 12 },
      // { x: 14, y: 4 }
    ],
    level: [
      [_wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, null, null, null],
      [_wal, null, _wal, _wal, _wal, _wal, _wal, _wal, null, null, null, null, _wal, null, null, null],
      [_wal, null, _blk, _ws1, _ws2, _ws3, _ws4, _blk, null, null, null, null, _wal, _wal, _wal, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal, null, null, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal, null, _win, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal, null, null, _wal],
      [_wal, null, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, null, null, _wal, _wal, _wal, _wal],
      [_wal, null, _bzz, null, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, null, null, _wal, null, null, null],
      [_wal, null, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, null, null, _wal, null, null, null],
      [_wal, null, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, null, _bzz, null, null, _wal, null, null, null],
      [_wal, null, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, _bzz, null, null, _wal, null, null, null],
      [_wal, _wal, _wal, _wal, _wal, null, null, null, _wal, _wal, _wal, _wal, _wal, null, null, null],
      [null, null, null, null, _wal, null, _bn4, null, _wal, null, null, null, null, null, null, null],
      [null, null, null, null, _wal, _wal, _wal, _wal, _wal, null, null, null, null, null, null, null]
    ]
  },

////////////////
//////
// player2_state
/////
////////////////

  player2_state: {
    worldBounds: [0, 0, 800, 700],
    checkOnLoad: [
      {
        verify: [
          {
            address: 'player2_state.playAnimations.symbol1',
            shouldBe: 'w'
          },{
            address: 'player2_state.playAnimations.symbol2',
            shouldBe: 'x'
          },{
            address: 'player2_state.playAnimations.symbol3',
            shouldBe: 'z'
          },{
            address: 'player2_state.playAnimations.symbol4',
            shouldBe: 'y'
          }
        ],
        targets: [
          {
            addresses: [
              'player2_state.level.3.12',
              'player2_state.level.4.12',
              'player2_state.level.5.12'
            ],
            value: null
          },{
            addresses: [
              'player2_state.playAnimations.laserBeamVertical'
            ],
            value: 'off'
          }
        ]
      }
    ],
    assets: [
      {
        type: 'image',
        args: ['background', '/level-images/level1-p2-bg.png']
      },{
        type: 'spritesheet',
        args: ['player', '/level-images/tilde.png', 50, 50]
        // args: ['player', '/level-images/hyperlink.png', 50, 50]
        // args: ['player', '/level-images/player.png', 50, 50]
      },{
        type: 'spritesheet',
        args: ['button object', '/level-images/button.png', 50, 50]
      },{
        type: 'spritesheet',
        args: ['symbol-xyz object', '/level-images/symbol-xyz.png', 50, 50]
      },{
        type: 'spritesheet',
        args: ['laser-beam-vertical object', '/level-images/laser-beam-vertical.png', 50, 250]
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
        args: ['required-symbols object', '/level-images/symbols-required.png', 200, 50]
      },{
        type: 'spritesheet',
        args: ['symbols-scroll object', '/level-images/scroll.png', 50, 50]
      }
    ],
    sprites: [
      {
        type: 'sprite',
        args: [0, 0, 'background']
      },{
        type: 'sprite',
        args: [150, 50, 'symbol-xyz object'],
        properties: {
          name: 'symbol1'
        }
      },{
        type: 'sprite',
        args: [200, 50, 'symbol-xyz object'],
        properties: {
          name: 'symbol2'
        }
      },{
        type: 'sprite',
        args: [250, 50, 'symbol-xyz object'],
        properties: {
          name: 'symbol3'
        }
      },{
        type: 'sprite',
        args: [300, 50, 'symbol-xyz object'],
        properties: {
          name: 'symbol4'
        }
      },{
        type: 'sprite',
        args: [500, 400, 'button object'],
        properties: {
          name: 'button1',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [500, 350, 'button object'],
        properties: {
          name: 'button2',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [500, 450, 'button object'],
        properties: {
          name: 'button3',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [700, 200, 'button object'],
        properties: {
          name: 'button5',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [100, 300, 'path1 object'],
        properties: {
          name: 'path1',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [100, 300, 'path2 object'],
        properties: {
          name: 'path2',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [100, 300, 'path3 object'],
        properties: {
          name: 'path3',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [200, 550, 'laser-beam-horizontal object'],
        properties: {
          name: 'laserBeamHorizontal'
        }
      },{
        type: 'sprite',
        args: [600, 100, 'laser-beam-vertical object'],
        properties: {
          name: 'laserBeamVertical'
        }
      },{
        type: 'sprite',
        args: [200, 300, 'required-symbols object'],
        properties: {
          name: 'symbols',
          immovable: true
        }
      },{
        type: 'sprite',
        args: [300, 600, 'symbols-scroll object'],
        properties: {
          name: 'symbolScroll',
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
      button5: [
        ['off', [0]],
        ['on', [1]]
      ],
      path1: pathAnimations,
      path2: pathAnimations,
      path3: pathAnimations,
      player: [
        ['always', [0, 1, 2, 3, 4, 5], 10, true] //(~)
        // ['always', [0, 1, 2, 3], 10, true] //other
      ],
      symbol1: symbolAnimations,
      symbol2: symbolAnimations,
      symbol3: symbolAnimations,
      symbol4: symbolAnimations,
      symbols: [
        ['reveal', [0, 1, 2, 3, 4], 10],
        ['hide', [0]],
        ['show', [4]]
      ],
      laserBeamHorizontal: [
        ['always', [0, 1, 2, 3, 4], 10, true],
        ['off', [5]]
      ],
      laserBeamVertical: [
        ['always', [0, 1, 2, 3, 4], 10, true],
        ['off', [5]]
      ],
      symbolScroll: [
        ['on', [0]],
        ['off', [1]]
      ]
    },
    playAnimations: {
      symbol1: 'y',
      symbol2: 'y',
      symbol3: 'y',
      symbol4: 'y',
      'button1': 'off',
      'button2': 'off',
      'button3': 'off',
      'button5': 'off',
      player: 'always',
      laserBeamHorizontal: 'always',
      laserBeamVertical: 'always',
      symbols: 'off'
    },
    watchList: [
      { x: 10, y: 7 },
      { x: 10, y: 8 },
      { x: 10, y: 9 },
      { x: 6, y: 12 },
      { x: 14, y: 4 }
    ],
    level: [
      [_wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, null, null, null],
      [_wal, null, _wal, _wal, _wal, _wal, _wal, _wal, null, null, null, null, _wal, null, null, null],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal, _wal, _wal, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal, null, null, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal, null, _bn5, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal, null, null, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal, _wal, _wal, _wal],
      [_wal, null, null, null, null, null, null, null, null, null, _bn2, null, _wal, null, null, null],
      [_wal, null, null, null, null, null, null, null, null, null, _bn1, null, _wal, null, null, null],
      [_wal, null, null, null, null, null, null, null, null, null, _bn3, null, _wal, null, null, null],
      [_wal, null, null, null, null, null, null, null, null, null, null, null, _wal, null, null, null],
      [_wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, _wal, null, null, null],
      [null, null, null, null, _wal, null, _sho, null, _wal, null, null, null, null, null, null, null],
      [null, null, null, null, _wal, _wal, _wal, _wal, _wal, null, null, null, null, null, null, null]
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
      id: 'mock1'
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
      id: 'mock1'
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
  name: 'Collabowait',
  creator_id: 1,
  thumbnail: '/images/level1_tn.png'
};
