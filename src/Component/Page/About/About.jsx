import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto p-6 shadow-lg rounded-xl mt-10"
    >
      <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
      <p className=" text-lg leading-relaxed">
        We are a passionate team of developers dedicated to building beautiful and scalable web applications. Our mission is to create user-friendly experiences and robust backend systems.
      </p>
    </motion.div>
  );
};

export default About;
