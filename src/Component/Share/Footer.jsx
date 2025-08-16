import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className=" py-4">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
    <p className="text-sm">&copy; 2025 Forum. All rights reserved.</p>
    <div className="flex gap-4 mt-4 md:mt-0">
      <Link href="/" className="hover:text-blue-400">Home</Link>
      <Link href="/about" className="hover:text-blue-400">About</Link>
      <Link to="/contact" className="hover:text-blue-400">Contact</Link>
    </div>
  </div>
</footer>

  );
};

export default Footer;
