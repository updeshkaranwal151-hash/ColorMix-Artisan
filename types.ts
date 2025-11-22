export interface ColorData {
  colorName: string;
  hexCode: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  mixingGuide: string[];
}

export interface LibraryColor {
  name: string;
  hex: string;
}
