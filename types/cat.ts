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

export interface CatBreedTranslation {
  id: string;
  nameJa: string;
  descriptionJa: string;
  imagePosition?: string;
}

export interface CatBreed {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  imageId: string;
}

export interface CatBreedWithImage extends CatBreed {
  imageUrl: string | null;
}