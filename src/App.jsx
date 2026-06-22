import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Sobre from "./components/Sobre";
import Servicios from "./components/Servicios";
import Proyectos from "./components/Proyectos";
import Habilidades from "./components/Habilidades";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sobre />
      <Servicios />
      <Proyectos />
      <Habilidades />
      <Contacto />
      <Footer />
    </>
  );
}
