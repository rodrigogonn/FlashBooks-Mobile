export interface ThemeContextData {
  theme: Theme;
}

export interface FontFamily {
  light: string;
  regular: string;
  bold: string;
}

export interface Palette {
  reading: {
    background: string;
    title: string;
    text: string;
    navigationButton: {
      background: string;
    };
    progress: {
      background: string;
      fill: string;
    };
  };
  page: {
    background: string;
    title: string;
    text: string;
  };
  bookList: {
    text: string;
    counter: string;
  };
  common: {
    progress: {
      background: string;
      fill: string;
    };
  };
}

export interface Theme {
  fontFamily: FontFamily;
  colors: Palette;
}
