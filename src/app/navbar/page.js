'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './navbar.css';
import  jwtDecode from 'jwt-decode';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   const decoded = jwtDecode(token);

//   let user_id = decoded.sub;

//   if (!Number.isInteger(user_id)) {
//     user_id = decoded.user?.id;
//   }

//   user_id = parseInt(user_id, 10); 

//   if (user_id) {
//     setLoggedIn(true);
//   } else {
//     console.warn("No user ID found in localStorage");
//   }
// }, []);


// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (token && typeof token === "string") {
//     try {
//       const decoded = jwtDecode(token);
//       let user_id = decoded.sub;

//       if (!Number.isInteger(user_id)) {
//         user_id = decoded.user?.id;
//       }

//       user_id = parseInt(user_id, 10);

//       if (user_id) {
//         setLoggedIn(true);
//       } else {
//         console.warn("No user ID found in token");
//       }
//     } catch (err) {
//       console.warn("Failed to decode token:", err);
//     }
//   }
// }, []);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) { 
    try {
      const decoded = jwtDecode(token);
      let user_id = decoded.sub;

      if (!Number.isInteger(user_id)) {
        user_id = decoded.user?.id;
      }

      user_id = parseInt(user_id, 10);

      if (user_id) {
        setLoggedIn(true);
      } else {
        console.warn("No user ID found in token");
      }
    } catch (err) {
      console.warn("Failed to decode token:", err);
    }
  }
}, []);

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <Link href="/" className="logo">
          Gitxen
        </Link>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-right ${menuOpen ? 'open' : ''}`}>
        {loggedIn ? <Link href="/demo" className="nav-button demo" onClick={() => setMenuOpen(false)}>
          Git Chat
        </Link>
        :
        <Link href="/login" className="nav-button demo" onClick={() => setMenuOpen(false)}>
Git Chat
        </Link>
        }
         {loggedIn ? <Link href="/bug" className="nav-button demo" onClick={() => setMenuOpen(false)}>
          Bug Identifier
        </Link>
        :
        <Link href="/login" className="nav-button demo" onClick={() => setMenuOpen(false)}>
          Bug Identifier
        </Link>
        }
        
        <Link href="/login" className="nav-button login" onClick={() => setMenuOpen(false)}>
          Login
        </Link>
      </div>
    </nav>
  );
}
