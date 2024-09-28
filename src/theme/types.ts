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
    primary: {
      background: string;
      color: string;
    };
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
    icon: {
      normal: string;
      active: string;
      inactive: string;
    };
    border: {
      normal: string;
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
  button: {
    primary: {
      background: string;
      color: string;
    };
  };
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
  Light = 'light',
  Dark = 'dark',
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
