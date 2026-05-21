interface Music {
  name: string;
  artist: string;
}

export interface Memory {
  id: number;
  title: string;
  date: string;
  location: string;
  description?: string;
  music?: Music;
  photo?: string;
}
