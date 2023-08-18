import cloneDeep from "lodash.clonedeep";
import React, { useContext, useEffect, useRef, useState } from "react"
import { GameContextType, Level, MovingObject, MovingObjectType } from "./types"

export const Variables = {
  USER_INPUT_LANES: 'USER_INPUT_LANES',
}

export const Parameters = {
  DEFAULT_NUMBER_OF_LANES: 4,
  OBSTACLE_MAX_DISTANCE_PERCENT: 90,
  OBSTACLE_DEFAULT_SPEED: 1,
  OBSTACLE_BEGINNER_SPEED: 1.3,
  OBSTACLE_SKILLED_SPEED: 1.4,
  OBSTACLE_EXPERT_SPEED: 1.5,
  OBSTACLE_ULTRAPROMAX_SPEED: 1.6,
  PLAYER_DEFAULT_NAME: 'Player',
  DEFAULT_SCORE_FOR_PASSING_OBSTACLE: 10,
  BEGINNER_LEVEL_MIN_SCORE: 30,
  SKILLED_DRIVER_LEVEL_MIN_SCORE: 150,
  EXPERT_LEVEL_MIN_SCORE: 300,
  ULTRAPROMAX_LEVEL_MIN_SCORE: 500,
}

export const getLanesCount = () => {
  return sessionStorage.getItem(Variables.USER_INPUT_LANES) ? +sessionStorage.getItem(Variables.USER_INPUT_LANES)! : Parameters.DEFAULT_NUMBER_OF_LANES;
}

export const LevelTagColorSchemes = {
  [Level.Noob]: undefined,
  [Level.Beginner]: 'linkedin',
  [Level.SkilledDriver]: 'whatsapp',
  [Level.Expert]: 'yellow',
  [Level.UltraProMax]: 'red',
}

export const MarginLeftForLanes: any = {
  4: 7,
  2: 20,
  3: 12,
  5: 5,
  6: 4,
}

const intialGameContextValue: GameContextType = {
  obstacles: [],
  user: {
    id: '',
    score: 0,
    level: Level.Noob,
    myCar: {
      position: {
        lane: 0,
        y: 80,
      },
      speed: 0,
      type: MovingObjectType.USER_CAR,
    }
  },
  onKeyPress: (key: string) => {/* */ },
  gameOn: () => {/* */ }
};
export const GameContext = React.createContext<GameContextType>(intialGameContextValue);

export const useRoadRash = (): GameContextType => {
  const [gameState, setGameState] = useState<GameContextType>(intialGameContextValue);
  const interval = useRef<NodeJS.Timer>();
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    () => {
      clearInterval(interval.current);
      document.removeEventListener('keydown', onKeyDown);
    }
  }, []);

  const gameOn = () => {
    document.addEventListener('keydown', onKeyDown);
    setGameState((prevState) => ({
      ...prevState,
      obstacles: [
        {
          position: { lane: getRandomLane(), y: 0, },
          speed: Parameters.OBSTACLE_DEFAULT_SPEED,
          type: MovingObjectType.OBSTACLE_CAR
        }
      ],
      gameEnded: false,
      user: {
        id: Parameters.PLAYER_DEFAULT_NAME,
        score: 0,
        level: Level.Noob,
        myCar: {
          ...prevState.user.myCar,
          position: {
            lane: getRandomLane(),
            y: 80,
          },
        }
      }
    }));

    const id = setInterval(() => {
      setGameState(prevState => {
        const newState = cloneDeep(prevState);
        if (hasGameEnded(newState)) {
          newState.gameEnded = true;
          clearInterval(id);
          document.removeEventListener('keydown', onKeyDown);
        }
        const newObstacles: MovingObject[] = [];
        newState.obstacles.forEach(obs => {
          if (Math.ceil(obs.position.y) < Parameters.OBSTACLE_MAX_DISTANCE_PERCENT) {
            obs.position.y += obs.speed;
            newObstacles.push(obs);
          }
          else {
            newState.user.score += Parameters.DEFAULT_SCORE_FOR_PASSING_OBSTACLE;
            setUserLevel(newState);
          }
        });
        newState.obstacles = newObstacles;
        newState.obstacles.push(...getNewObstacles(newState));
        return newState;
      });
    }, 25);
    interval.current = id;
  }

  const setUserLevel = (state: GameContextType) => {
    if (state.user.score > Parameters.ULTRAPROMAX_LEVEL_MIN_SCORE) {
      state.user.level = Level.UltraProMax;
    }
    else if (state.user.score > Parameters.EXPERT_LEVEL_MIN_SCORE) {
      state.user.level = Level.Expert;
    }
    else if (state.user.score > Parameters.SKILLED_DRIVER_LEVEL_MIN_SCORE) {
      state.user.level = Level.SkilledDriver;
    }
    else if (state.user.score > Parameters.BEGINNER_LEVEL_MIN_SCORE) {
      state.user.level = Level.Beginner;
    }
  }

  const getNewObstacles = (state: GameContextType): MovingObject[] => {
    if (state.user.level == Level.Noob) {
      if (state.obstacles.every(obs => obs.position.y > 60)) {
        return [{
          speed: Parameters.OBSTACLE_DEFAULT_SPEED,
          type: MovingObjectType.OBSTACLE_CAR,
          position: { lane: getRandomLane(), y: 0 },
        }];
      }
      else return [];

    }
    else if (state.user.level == Level.Beginner) {
      if (state.obstacles.every(obs => obs.position.y > 50)) {
        return [{
          speed: Parameters.OBSTACLE_BEGINNER_SPEED,
          type: MovingObjectType.OBSTACLE_CAR,
          position: { lane: getRandomLane(), y: 0 },
        }];
      }
      else return [];
    }
    else if (state.user.level == Level.SkilledDriver) {
      if (state.obstacles.every(obs => obs.position.y > 30)) {
        return [{
          speed: Parameters.OBSTACLE_SKILLED_SPEED,
          type: MovingObjectType.OBSTACLE_CAR,
          position: { lane: getRandomLane(), y: 0 },
        }];
      }
      else return [];
      /*if (Math.random() > 0.8) {
        state.obstacles.add({
          speed: Constants.OBSTACLE_DEFAULT_SPEED + 0.5,
          type: MovingObjectType.OBSTACLE_BARRICADE,
          position: { x: getRandomPercentage(), y: 0 },
        });
      }*/
    }
    else if (state.user.level == Level.Expert) {
      if (state.obstacles.every(obs => obs.position.y > 25)) {
        return [{
          speed: Parameters.OBSTACLE_EXPERT_SPEED,
          type: MovingObjectType.OBSTACLE_CAR,
          position: { lane: getRandomLane(), y: 0 },
        }];
      }
      else return [];
      /*if (Math.random() > 0.5) {
        state.obstacles.add({
          speed: Constants.OBSTACLE_DEFAULT_SPEED + 0.5,
          type: MovingObjectType.OBSTACLE_BARRICADE,
          position: { x: getRandomPercentage(), y: 0 },
        });
      }*/
    }
    else if (state.user.level == Level.UltraProMax) {
      if (state.obstacles.every(obs => obs.position.y > 20)) {
        return [{
          speed: Parameters.OBSTACLE_ULTRAPROMAX_SPEED,
          type: MovingObjectType.OBSTACLE_CAR,
          position: { lane: getRandomLane(), y: 0 },
        }];
      }
      else return [];
    }
    throw new Error(`getNewObstacles not implemented for ${state.user.level}`);
  }

  const hasGameEnded = (state: GameContextType) => {
    return state.obstacles.some(obs => {
      const obsFront = obs.position.y;
      const obsBack = obsFront + 8;
      const userFront = state.user.myCar.position.y;
      const userBack = userFront + 8;
      if (obs.position.lane != state.user.myCar.position.lane) {
        return false;
      }
      //console.log(obsFront, obsBack, userFront, userBack);
      return (userFront >= obsFront && userFront <= obsBack)
        || (userBack >= obsFront && userBack <= obsBack);
    })
  }

  const onKeyDown = (e: any) => {
    if (e.key == undefined) {
      throw new Error('key not present on event');
    }
    setGameState(prevState => {
      const newState = cloneDeep(prevState);
      switch (e.key) {
        case 'ArrowUp': newState.user.myCar.position.y -= (newState.user.myCar.position.y > 0 ? 5 : 0);
          break;
        case 'ArrowDown': newState.user.myCar.position.y += (newState.user.myCar.position.y < 90 ? 5 : 0);
          break;
        case 'ArrowLeft': newState.user.myCar.position.lane -= (newState.user.myCar.position.lane > 0 ? 1 : 0);
          break;
        case 'ArrowRight': newState.user.myCar.position.lane += (newState.user.myCar.position.lane < getLanesCount() - 1 ? 1 : 0);
          break;
      }
      return newState;
    });
  }

  const onKeyPress = (key: string) => {
    onKeyDown({ key });
  }

  return {
    ...gameState,
    onKeyPress,
    gameOn,
  };
}

const getRandomLane = () => {
  return Math.floor((Math.random() * 100)) % getLanesCount();
}