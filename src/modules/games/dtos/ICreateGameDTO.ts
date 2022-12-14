export interface ICreateGameDTO {
  name: string;
  slug: string;
  release_date: Date;
  score: number;
  video?: string | null;
  image: string;
  background: string;
  description: string;
  price: number;
  genres: string[];
  developers: string[];
  platforms: string[];
}
