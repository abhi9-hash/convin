import Search from "./screens/search/search";
import Analytics from "./screens/analytics/analytics";
import SignIn from "./screens/sign-in/signIn";
import Details from "./screens/details/details";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RedirectToLogin } from "./components/redirect";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        {/* <Route path="/" element={<Home />} /> */}
          <Route path="/sign-in"  element={<SignIn />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/search" element={<Search />} />
          <Route path="workspace/:id" element={<Details />} />
          <Route path='*' element={<RedirectToLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
