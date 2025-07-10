import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Training from "./components/Training/Training";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Social from "./components/Social/Social";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <LoadingScreen />
        <Navbar />
        <Social />
        <main>
          <Home />
          <About />
          <Portfolio />
          <Training />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;
