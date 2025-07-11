import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import lightBackground from '../src/assets/wa-background-light.png';
import darkBackground from '../src/assets/wa-background-dark.jpg';
import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#2DDD7F",
					borderRadius: "8px",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
					borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#333333",
					borderRadius: "8px",
                },
            },
            palette: {
                type: mode,
                primary: { main: mode === "light" ? "#0066CC" : "#00AEEF" }, // azul mais vibrante
                sair: { main: mode === "light" ? "#C62828" : "#FF4C4C" },
                vcard: { main: mode === "light" ? "#0077E6" : "#33C8FF" }, // azul claro mais moderno
                textPrimary: mode === "light" ? "#2E2E3A" : "#F0F4F8", // tom claro no dark
                borderPrimary: mode === "light" ? "#B3C6E0" : "#4F8FBF",
                dark: { main: mode === "light" ? "#2E2E3A" : "#E2E8F0" }, // tom claro cinza no dark
                light: { main: mode === "light" ? "#F9FAFB" : "#1C1C1C" },
                tabHeaderBackground: mode === "light" ? "#E6F0FA" : "#223344",
                optionsBackground: mode === "light" ? "#F4F7FA" : "#1E2A38",
                options: mode === "light" ? "#E1EDF7" : "#2A3A4D", // suavizado
                fontecor: mode === "light" ? "#00AEEF" : "#00CFFF",
                fancyBackground: mode === "light" ? "#F0F8FF" : "#1A2735", // cinza-azulado claro
                bordabox: mode === "light" ? "#DDE6F2" : "#334B65",
                newmessagebox: mode === "light" ? "#E3F2FD" : "#102030",
                inputdigita: mode === "light" ? "#FFFFFF" : "#2B3D51",
                contactdrawer: mode === "light" ? "#FFFFFF" : "#1F2F45",
                announcements: mode === "light" ? "#F2F6FB" : "#1E2E3C",
                login: mode === "light" ? "#FFFFFF" : "#0D1B2A",
                announcementspopover: mode === "light" ? "#FFFFFF" : "#223344",
                chatlist: mode === "light" ? "#E8F0FA" : "#182B3A",
                boxlist: mode === "light" ? "#F2F7FC" : "#1B2F44",
                boxchatlist: mode === "light" ? "#EDF4FB" : "#1A2735",
                total: mode === "light" ? "#FFFFFF" : "#101E2C",
                messageIcons: mode === "light" ? "#4F5B62" : "#90CAF9",
                inputBackground: mode === "light" ? "#FFFFFF" : "#1E2A38",
                barraSuperior: mode === "light"
                    ? "linear-gradient(to right, #004080, #0066CC)" // mais profundo
                    : "linear-gradient(to right, #00AEEF, #00CFFF)",
                boxticket: mode === "light" ? "#F4F9FF" : "#1A2735",
                campaigntab: mode === "light" ? "#E0ECF7" : "#1F2E40",
                mediainput: mode === "light" ? "#E3EEF9" : "#0F1E2D"
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale =
            i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

        if (browserLocale === "ptBR") {
            setLocale(ptBR);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                  <SocketContext.Provider value={SocketManager}>
                      <Routes />
                  </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
