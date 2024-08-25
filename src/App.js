import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import CreatePost from "./Pages/CreatePost";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

// Header component where you can use useNavigate
function Header({ isAuth, onSignOut }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">PostIt</h1>
      </div>
      <div className="header-center">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/createpost">Create Post</Link>
        </nav>
      </div>
      <div className="header-right">
        <nav>
          {!isAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <button onClick={handleSignOut}>Log Out</button>
          )}
        </nav>
      </div>
    </header>
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(() => JSON.parse(localStorage.getItem("isAuth")) || false);

  const signUserOut = () => {
    return signOut(auth).then(() => {
      localStorage.removeItem("isAuth");
      setIsAuth(false);
    });
  };

  useEffect(() => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
  }, [isAuth]);

  return (
    <Router>
      <Header isAuth={isAuth} onSignOut={signUserOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
