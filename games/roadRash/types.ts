export type GameContextType = {
  user: User;
  obstacles: MovingObject[];
  onKeyPress: (key: string) => void;
  gameEnded?: boolean;
  gameOn: () => void;
};

export type User = {
  id: string;
  score: number;
  myCar: MovingObject;
  level?: Level;
};

export type MovingObject = {
  type: MovingObjectType;
  position: {
    lane: number;
    y: number;
  };
  speed: number;
};

export enum MovingObjectType {
  "OBSTACLE_CAR" = "OBSTACLE_CAR",
  "OBSTACLE_BARRICADE" = "OBSTACLE_BARRICADE",
  "USER_CAR" = "USER_CAR",
  "STAR" = "STAR"
}

export enum Level {
  Noob = 'Noob',
  Beginner = 'Beginner',
  SkilledDriver = 'Skilled Driver',
  Expert = 'Expert',
  UltraProMax = 'Ultra Pro Max :)'
}