export interface ComputerLevel {
  level: number;
  minWaitTime: number;    // 読み上げ開始からの最小待機時間
  maxWaitTime: number;    // 読み上げ終了からの最大待機時間
  afterReadTime: number;  // 読み上げ完了後の待機時間
  interruptChance: number; // 読み上げ途中で回答する確率 (0-1)
}

export const COMPUTER_LEVELS: ComputerLevel[] = [
  { level: 1, minWaitTime: 4000, maxWaitTime: 8000, afterReadTime: 5000, interruptChance: 0 },    // 初級: 割り込みなし
  { level: 2, minWaitTime: 3500, maxWaitTime: 7000, afterReadTime: 4500, interruptChance: 0 },    // 
  { level: 3, minWaitTime: 3000, maxWaitTime: 6000, afterReadTime: 4000, interruptChance: 0 },    // 
  { level: 4, minWaitTime: 3000, maxWaitTime: 5000, afterReadTime: 3500, interruptChance: 0.02 }, // たまに途中で回答
  { level: 5, minWaitTime: 2800, maxWaitTime: 4500, afterReadTime: 3000, interruptChance: 0.05 }, // 中級: 5%の確率で途中回答
  { level: 6, minWaitTime: 2500, maxWaitTime: 4000, afterReadTime: 2800, interruptChance: 0.08 }, // 
  { level: 7, minWaitTime: 2200, maxWaitTime: 3500, afterReadTime: 2500, interruptChance: 0.1 },  // 上級: 10%の確率で途中回答
  { level: 8, minWaitTime: 2000, maxWaitTime: 3000, afterReadTime: 2200, interruptChance: 0.12 }, // 
  { level: 9, minWaitTime: 1800, maxWaitTime: 2500, afterReadTime: 2000, interruptChance: 0.15 }, // 
  { level: 10, minWaitTime: 1500, maxWaitTime: 2000, afterReadTime: 1800, interruptChance: 0.2 }, // 達人: 20%の確率で途中回答
]