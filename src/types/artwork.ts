export interface ImageRef {
  url: string;
  alt: string;
}

export interface Owner {
  name: string;
  email: string;
  bio: string | null;
  avatar: ImageRef;
  banner: ImageRef;
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  description: string;
  location: string;
  image: ImageRef;
  created: string;
  updated: string;
  owner: Owner;
  dimensions?: string;
}
