import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/templates/Header';
import HomePage from './components/pages/HomePage';
import BooksPage from './components/pages/BooksPage';
import BookDetailPage from './components/pages/BookDetailPage';
import AddBookPage from './components/pages/AddBookPage';
import EditBookPage from './components/pages/EditBookPage';
import AddMemberPage from './components/pages/AddMemberPage';
import EditMemberPage from './components/pages/EditMemberPage';
import MemberDetailPage from './components/pages/MemberDetailPage';
import MemberPage from './components/pages/MemberPage';
import BorrowPage from './components/pages/BorrowPage';
import BorrowForm from './components/molecules/BorrowForm';
import ReturnForm from './components/molecules/ReturnForm';
import ReturnPage from './components/pages/ReturnPage';

function App() {
  const [books, setBooks] = useState([
    // Initial book data for testing
    { isbn: '9781234567897', title: 'Sample Book 1', author: 'Author 1', year: 2021, category: 'Fiction', available: true },
    { isbn: '9781234567898', title: 'Sample Book 2', author: 'Author 2', year: 2022, category: 'Non-Fiction', available: false },
    // Add more books as needed
  ]);

  const [members, setMembers] = useState([
    // Sample member data for testing
    { id: '1', name: 'John Doe', email: 'john@example.com', gender: 'Male', phone: '+62123456789', address: '123 Main St' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', gender: 'Female', phone: '+62198765432', address: '456 Side St' },
  ]);

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books) {
     setBooks(books);
    }
  }, []);

  useEffect(() => {
    const members = JSON.parse(localStorage.getItem('members'));
    if (members) {
     setMembers(members);
    }
  }, []);


  const handleAddBook = (book) => {
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  const handleUpdateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.isbn === updatedBook.isbn ? updatedBook : book))
    );
  };

  const handleAddMember = (member) => {
    setMembers((prevMembers) => [...prevMembers, member]);
  };

  const handleUpdateMember = (updatedMember) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) => (member.id === updatedMember.id ? updatedMember : member))
    );
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BooksPage books={books} />} />
        <Route path="/books/add" element={<AddBookPage onAddBook={handleAddBook} />} />
        <Route path="/books/:id" element={<BookDetailPage books={books} />} />
        <Route path="/books/edit/:id" element={<EditBookPage books={books} onUpdateBook={handleUpdateBook} />} />
        <Route path="/members" element={<MemberPage members={members} />} />
        <Route path="/members/add" element={<AddMemberPage onAddMember={handleAddMember} />} />
        <Route path="/members/:id" element={<MemberDetailPage members={members} />} />
        <Route path="/members/edit/:id" element={<EditMemberPage members={members} onUpdateMember={handleUpdateMember} />} />
        <Route path="/borrow" element={<BorrowPage />} />
        <Route path="/borrow/form" element={<BorrowForm />} />
        <Route path="/return" element={<ReturnPage />} />
        <Route path="/return/form" element={<ReturnForm />} />
      </Routes>
    </Router>
  );
}

export default App
