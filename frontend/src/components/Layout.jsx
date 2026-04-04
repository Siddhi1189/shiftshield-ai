import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">

      <Navbar />

      <main className="p-8 max-w-6xl mx-auto">
        {children}
      </main>

    </div>
  );
}

export default Layout;