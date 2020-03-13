import React from 'react';
import './App.css';
import DraggableImages from './components/DraggableImages';

const pictures = [
  "https://image.freepik.com/free-photo/book-library-with-open-textbook_1150-5923.jpg",
  "https://image.freepik.com/free-photo/book-library-with-open-textbook_1150-5922.jpg",
  "https://image.freepik.com/free-photo/book-library-with-open-textbook_1150-5919.jpg",
  "https://image.freepik.com/free-photo/book-library-with-open-textbook_1150-5921.jpg",
  "https://image.freepik.com/free-photo/opened-book-ledge_23-2147711742.jpg",
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Test Task
      </header>
      <DraggableImages images={pictures}/>
    </div>
  );
}

export default App;
