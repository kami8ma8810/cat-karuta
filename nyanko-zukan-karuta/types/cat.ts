// API レスポンス関連の型定義
export interface ApiError {
  status: number;
  message: string;
}

export interface ApiBreed {
  id: string;
  name: string;
  reference_image_id: string;
}

export interface ApiImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

// 猫種データの基本型定義
export interface CatBreedTranslation {
  id: string;
  nameJa: string;
  descriptionJa: string;
}

export interface CatBreed {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  imageId: string;
}

// 拡張された猫種データ型定義
export interface CatBreedWithImage extends CatBreed {
  imageUrl: string | null;
}