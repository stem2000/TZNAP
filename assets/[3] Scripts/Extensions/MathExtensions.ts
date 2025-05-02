declare global {
    interface Math {
      randomInRange(min: number, max: number): number;
    }
  }
  
  Math.randomInRange = function(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  };
  
  export {};