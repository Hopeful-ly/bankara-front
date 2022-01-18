import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgPrimary: string;
      bgSecondary: string;
      primary: string;
      secondary: string;
      danger: string;
      info: string;
      success: string;
      textPrimary: string;
      textSecondary: string;
    };
  }
}
