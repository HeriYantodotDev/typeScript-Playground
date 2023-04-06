type Artwork = {
  genre: string, 
  name: string
};

type Writing = {
  pages: number,
  name : string
};

type WrittenArt = Artwork & Writing;
// Equivalent to:
// {
// genre: string;
// name: string;
// pages: number;
// }
