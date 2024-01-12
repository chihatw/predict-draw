export interface PoolItem {
  label: string;
  rate: number;
}

export interface GaWoNiProps {
  isRaw: boolean;
  sentence: string;
  isRandomOrder: boolean;
  ga_pool: PoolItem[];
  wo_pool: PoolItem[];
  ni_pool: PoolItem[];
}
