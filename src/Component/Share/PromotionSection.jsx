import { FaRocket } from "react-icons/fa";

const PromotionSection = () => {
  return (
    <section className=" py-20  text-center overflow-hidden">
     
      <div className=" xl:max-w-[1350px]  md:w-11/12 mx-auto">
        <FaRocket className="w-14 h-14 mx-auto mb-6  animate-bounce" />
        <h2 className="text-xl md:text-base lg:text-3xl font-extrabold mb-6">🚀 Be Part of Something Big!</h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of members already sharing, learning, and growing together.  
          Unlock exclusive features, connect with experts, and expand your knowledge base.
        </p>
        <button className="px-8 py-4   text-lg rounded-xl font-bold shadow-lg hover:bg-yellow-500 hover:scale-105 transition">
          Join the Community
        </button>
      </div>
    </section>
  );
};

export default PromotionSection