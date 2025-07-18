
const Footer = () => {
  return (
    <footer className=" py-4">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    <p className="text-sm">&copy; 2025 Forum. All rights reserved.</p>
    <div className="flex gap-4 mt-4 md:mt-0">
      <a href="#" className="hover:text-blue-400">Home</a>
      <a href="#" className="hover:text-blue-400">About</a>
      <a href="#" className="hover:text-blue-400">Contact</a>
    </div>
  </div>
</footer>

  );
};

export default Footer;
