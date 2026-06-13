function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto">
      <div className="max-w-6xl mx-auto px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} ShiftShield AI — Income Protection for Gig Workers
        </p>
        <p className="text-sm text-gray-600">Built with ❤️ by Team ShiftShield</p>
      </div>
    </footer>
  );
}

export default Footer;
