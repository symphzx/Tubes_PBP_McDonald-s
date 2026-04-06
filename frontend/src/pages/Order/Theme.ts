    import { createTheme } from "@mui/material";
    import CoolveticaHvComp from "./font/Coolvetica-Hv-Comp.otf";
    import CoolveticaRgCond from "./font/Coolvetica-Rg-Cond.otf";
    import CoolveticaRgIt from "./font/Coolvetica-Rg-It.otf";
    import CoolveticaRg from "./font/Coolvetica-Rg.otf";
    import Speedee from "./font/Speedee-Bold.ttf";
    import Speedee_Regular from "./font/Speedee-Regular.otf";

    export const theme = createTheme({
        typography: {
            fontFamily: "Speedee-Bold,Speedee-Regular,Coolvetica-Hv-Comp,Coolvetica-Rg-Cond,Coolvetica-Rg-lt,Coolvetica-Rg",
            allVariants: {
                fontFamily: "Speedee-Bold,Speedee-Regular,Coolvetica-Hv-Comp,Coolvetica-Rg-Cond,Coolvetica-Rg-lt,Coolvetica-Rg",
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: `
                    @font-face {
                        font-family: 'Speedee-Bold';
                        src: url(${Speedee}) format('truetype');
                    }
                    @font-face {
                        font-family: 'Speedee-Regular';
                        src: url(${Speedee_Regular}) format('truetype');
                    }
                    @font-face {
                        font-family: 'Coolvetica-Hv-Comp';
                        src: url(${CoolveticaHvComp}) format('opentype');
                    }
                    @font-face {
                        font-family: 'Coolvetica-Rg-Cond';
                        src: url(${CoolveticaRgCond}) format('opentype');
                    }
                    @font-face {
                        font-family: 'Coolvetica-Rg-lt';
                        src: url(${CoolveticaRgIt}) format('opentype');
                    }
                    @font-face {
                        font-family: 'Coolvetica-Rg';
                        src: url(${CoolveticaRg}) format('opentype');
                    }
                `,
            },
        },
    });
