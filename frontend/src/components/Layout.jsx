import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white">
      <Navbar />
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;