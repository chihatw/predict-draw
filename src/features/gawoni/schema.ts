export interface PoolItem {
  label: string;
  rate: number;
}

export interface GaWoNiProps {
  sentence: string;
  ga_rate: number;
  isRandomOrder: boolean;
  ga_pool: PoolItem[];
  wo_pool: PoolItem[];
  ni_pool: PoolItem[];
  readOrder: string[];
  isRandomReadOrder: boolean;
}
