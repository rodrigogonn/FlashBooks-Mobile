export interface FontFamily {
  light: string;
  regular: string;
  bold: string;
}

export interface Palette {
  page: {
    background: string;
    title: string;
    text: string;
  };
  card: {
    background: string;
    border: string;
  };
  button: {
    icon: string;
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
  modal: {
    backdrop: string;
  };
  text: {
    primary: string;
  };
}

export interface ReadingPalette {
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
}

export interface Theme {
  fontFamily: FontFamily;
  colors: Palette;
}

export enum ThemeName {
  Main = 'main',
}

export interface ReadingTheme {
  fontFamily: FontFamily;
  colors: ReadingPalette;
}

export enum ReadingThemeName {
  Light = 'light',
  Dark = 'dark',
  Sepia = 'sepia',
}
