export interface ComputerLevel {
  level: number;
  minWaitTime: number;    // 読み上げ開始からの最小待機時間
  maxWaitTime: number;    // 読み上げ終了からの最大待機時間
  afterReadTime: number;  // 読み上げ完了後の待機時間
  interruptChance: number; // 読み上げ途中で回答する確率 (0-1)
}

export const COMPUTER_LEVELS: ComputerLevel[] = [
  { level: 1, minWaitTime: 3000, maxWaitTime: 6000, afterReadTime: 4000, interruptChance: 0 },    // 初級: 割り込みなし
  { level: 2, minWaitTime: 2500, maxWaitTime: 5000, afterReadTime: 3500, interruptChance: 0 },    // 
  { level: 3, minWaitTime: 2000, maxWaitTime: 4000, afterReadTime: 3000, interruptChance: 0.05 }, // たまに途中で回答
  { level: 4, minWaitTime: 1500, maxWaitTime: 3500, afterReadTime: 2500, interruptChance: 0.1 },  // 
  { level: 5, minWaitTime: 1200, maxWaitTime: 3000, afterReadTime: 2000, interruptChance: 0.2 },  // 中級: 20%の確率で途中回答
  { level: 6, minWaitTime: 1000, maxWaitTime: 2500, afterReadTime: 1800, interruptChance: 0.3 },  // 
  { level: 7, minWaitTime: 800, maxWaitTime: 2000, afterReadTime: 1500, interruptChance: 0.4 },   // 上級: 40%の確率で途中回答
  { level: 8, minWaitTime: 600, maxWaitTime: 1500, afterReadTime: 1200, interruptChance: 0.5 },   // 
  { level: 9, minWaitTime: 400, maxWaitTime: 1200, afterReadTime: 1000, interruptChance: 0.6 },   // 
  { level: 10, minWaitTime: 300, maxWaitTime: 1000, afterReadTime: 800, interruptChance: 0.7 },   // 達人: 70%の確率で途中回答
]