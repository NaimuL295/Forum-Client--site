import { Link } from "react-router";
import logo from "../../assets/communication.png"
const Footer = () => {
  return (
    <footer className=" py-4">
  <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

<Link to="/" className="max-sm:text-base    text-2xl font-bold flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8 " />
           <h1 className=" text-2xl">Talk<span className="text-yellow-500">Nexus</span></h1>
        </Link>

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
