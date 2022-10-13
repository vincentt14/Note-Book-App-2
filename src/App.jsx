import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LocaleContext from "./contexts/LocaleContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { getUserLogged, putAccessToken } from "./utils/api";
import RegisterPage from "./pages/RegisterPage";
import { FiToggleLeft, FiToggleRight, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import AddNotePage from "./pages/AddNotePage";
import DetailPage from "./pages/DetailPage";
import ArchivePage from "./pages/ArchivePage";
import PageNotFound from "./pages/PageNotFound";
import ThemeContext from "./contexts/ThemeContext";

const App = () => {
  const [locale, setLocale] = React.useState("id");
  const [theme, setTheme] = React.useState("light");
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    async function didMount() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    didMount();

    function initialLoad() {
      if (localStorage.getItem("theme") === undefined) {
        localStorage.setItem("theme", "light");
        setTheme("light");
      } else {
        setTheme(localStorage.getItem("theme"));
      }

      if (localStorage.getItem("locale") === undefined) {
        localStorage.setItem("locale", "id");
        setLocale("id");
      } else {
        setLocale(localStorage.getItem("locale"));
      }
    }
    initialLoad();
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    setAuthedUser(data);
  }

  function onLogOut() {
    setAuthedUser(null);
    putAccessToken("");
  }

  const toggleLocale = () => {
    const targetLocale = locale === "id" ? "en" : "id";
    setLocale(targetLocale);
    localStorage.setItem("locale", targetLocale);
  };

  const toggleTheme = () => {
    const targetedTheme = theme === "light" ? "dark" : "light";
    setTheme(targetedTheme);
    localStorage.setItem("theme", targetedTheme);
  };

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const themeContextValue = React.useMemo(() => {
    return document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <div className="app-container">
            <header>
              <h1>
                <Link to={"/"}>{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</Link>
              </h1>
              <button className="toggle-locale" type="button" onClick={toggleLocale}>
                {locale === "id" ? <FiToggleLeft /> : <FiToggleRight />}
              </button>
              <button className="toggle-locale" type="button" onClick={toggleTheme}>
                {theme === "light" ? <FiMoon /> : <FiSun />}
              </button>
            </header>
            <main>
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="app-container">
          <header>
            <h1>
              <Link to="/">{locale === "id" ? "Aplikasi Catatan" : "Notes App"}</Link>
            </h1>
            <Navigation />
            <button className="toggle-locale" title={locale === "id" ? "Ganti Bahasa" : "Switch Language"} type="button" onClick={toggleLocale}>
              {locale === "id" ? <FiToggleLeft /> : <FiToggleRight />}
            </button>
            <button className="toggle-locale" type="button" onClick={toggleTheme}>
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>
            <button className="toggle-locale" title={locale === "id" ? "Keluar" : "Log Out"} onClick={onLogOut}>
              {authedUser.name}
              <FiLogOut />
            </button>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddNotePage />} />
              <Route path="/note/:id" element={<DetailPage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
