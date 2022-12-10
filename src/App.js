import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ToggleTheme';
import { Page404 } from './pages/404Page';
import { AddNotes } from './pages/AddNotes';
import { ArchiveNotes } from './pages/ArchiveNotes';
import { DetailNotes } from './pages/DetailNotes';
import { LoginPage } from './pages/Login';
import { Notes } from './pages/Notes';
import { RegisterPage } from './pages/Register';
import { BottomNavigator } from './parts/BottomNavigator';
import { Header } from './parts/Header';
import { NOTES_ROUTE_PATH } from './utils';
import { getUserLogged, putAccessToken } from './utils/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticatedUser:  localStorage.getItem('authenticatedUser') ||  null,
      accessToken: localStorage.getItem('accessToken') ||  null,
      localeContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale
              }
            }
          });
        }
      },
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme
          };
        });
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }
 
  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);

    const { data } = await getUserLogged();
    localStorage.setItem('authenticatedUser', JSON.stringify(data));
    
    this.setState(() => {
      return {
        authenticatedUser: JSON.stringify(data),
        accessToken: accessToken
      };
    });
  }

  onLogout() {
    this.setState(() => {
      return {
        authenticatedUser: null,
        accessToken: null
      }
    });

    putAccessToken('');
    localStorage.removeItem('authenticatedUser')
  }


  render() {
    if (this.state.authenticatedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state}>
              <div className='app-container'>
                <Header  />
                <main>
                  <Routes>
                    <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </main>
              </div>
          </ThemeProvider>
        </LocaleProvider>
      )
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
          <div className="app-container">
            <Header authenticatedUser={this.state.authenticatedUser} onLogout={this.onLogout} />
            <Routes>
              <Route path="/" element={<Notes />} />
              <Route path={NOTES_ROUTE_PATH} element={<Notes />} />
              <Route path={`${NOTES_ROUTE_PATH}/:id`} element={<DetailNotes />} />
              <Route path={`${NOTES_ROUTE_PATH}/new`} element={<AddNotes />} />
              <Route path={`${NOTES_ROUTE_PATH}/archive`} element={<ArchiveNotes />} />
              <Route path={`${NOTES_ROUTE_PATH}/archive/:id`}element={<DetailNotes />} />
              <Route path={`${NOTES_ROUTE_PATH}/*`} element={<Page404 />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
            <BottomNavigator />
          </div>
        </ThemeProvider>
        </LocaleProvider>

    );
  }
}

export default App;
