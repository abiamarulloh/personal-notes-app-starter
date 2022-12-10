import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from './pages/404Page';
import { AddNotes } from './pages/AddNotes';
import { ArchiveNotes } from './pages/ArchiveNotes';
import { DetailNotes } from './pages/DetailNotes';
import { Notes } from './pages/Notes';
import { BottomNavigator } from './parts/BottomNavigator';
import { Header } from './parts/Header';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<DetailNotes />} />
        <Route path="/notes/new" element={<AddNotes />} />
        <Route path="/notes/archive" element={<ArchiveNotes />} />
        <Route path="/notes/archive/:id" element={<DetailNotes />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/notes/*" element={<Page404 />} />
      </Routes>
      <BottomNavigator />
    </div>
  );
}

export default App;
