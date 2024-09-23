import React from "react";

// Componente Header
const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-3xl font-bold">Mi Página Web</h1>
    </header>
  );
};

// Componente MainContent
const MainContent = () => {
  return (
    <main className="flex flex-col items-center justify-center py-8">
      <h2 className="text-2xl font-semibold mb-4">Bienvenido a mi sitio</h2>
      <p className="text-center w-3/4 text-lg mb-6">
        Esta es una página de ejemplo utilizando JSX y Tailwind CSS. Puedes agregar más contenido, secciones, o componentes según lo que necesites.
      </p>
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Haz clic aquí
      </button>
    </main>
  );
};

// Componente Footer
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <p className="text-center">&copy; 2024 Mi Página Web. Todos los derechos reservados.</p>
    </footer>
  );
};

// Página completa
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home;
