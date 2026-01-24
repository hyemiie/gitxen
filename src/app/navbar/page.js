'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './navbar.css';
import  {jwtDecode} from 'jwt-decode';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   window.location.href = "/login";
    //   return;
    // }

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      localStorage.removeItem("token");
      // window.location.href = "/login";
      return;
    }

    let user_id = parseInt(decoded.sub, 10);
    if (isNaN(user_id)) {
      user_id = parseInt(decoded.user?.id, 10);
    }

    if (user_id) {
      setLoggedIn(true);
    } else {
      console.warn("No valid user ID found in token");
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

        {/* <Link href="/bug" className="nav-button demo" onClick={() => setMenuOpen(false)}>
          Bug Identifier
        </Link> */}
        
        <Link href="/login" className="nav-button login" onClick={() => setMenuOpen(false)}>
          Get Started
        </Link>
      </div>
    </nav>
  );
}
