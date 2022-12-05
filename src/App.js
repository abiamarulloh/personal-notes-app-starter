import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BottomNavigator } from './components/BottomNavigator';
import { Header } from './components/Header';
import { AddNotes } from './pages/AddNotes';
import { ArchiveNotes } from './pages/ArchiveNotes';
import { DetailNotes } from './pages/DetailNotes';
import { Notes } from './pages/Notes';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/" element={<Notes />} />
        <Route path="/:id" element={<DetailNotes />} />
        <Route path="/new" element={<AddNotes />} />
        <Route path="/archive" element={<ArchiveNotes />} />
        <Route path="/archive/:id" element={<DetailNotes />} />
      </Routes>
      <BottomNavigator />
    </div>
  );
}

export default App;
