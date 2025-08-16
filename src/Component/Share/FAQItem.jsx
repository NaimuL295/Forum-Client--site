import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // better icons

const faqs = [
  {
    question: "How do I create a new post?",
    answer: "Click the 'New Post' button in the navigation bar, add your title, tags & content, then publish."
  },
  {
    question: "Can I edit or delete my post?",
    answer: "Yes. You can edit or delete your own posts anytime from your profile or post options menu."
  },
  {
    question: "What are the forum rules?",
    answer: "Please be respectful, avoid spam, and keep discussions relevant. Violations may lead to suspension."
  },
  {
    question: "How do I report inappropriate content?",
    answer: "Use the 'Report' button under the post/comment. Our moderators review within 24 hours."
  },
  {
    question: "Do you have reputation points?",
    answer: "Yes! You earn points through posting, commenting, and upvotes. Higher reputation unlocks features."
  },
  {
    question: "How can I change my password?",
    answer: "Go to your Profile > Settings > Security to update your password."
  },
  {
    question: "Can I message other members privately?",
    answer: "Yes. Once you have 20+ reputation points, private messaging unlocks."
  },
  {
    question: "Do you allow images & videos in posts?",
    answer: "Yes, you can upload images and embed YouTube/Vimeo videos in your posts."
  },
  {
    question: "Is there a dark mode available?",
    answer: "Yes! Toggle the dark/light mode button in the top-right corner."
  },
  {
    question: "How do moderators get selected?",
    answer: "Moderators are chosen from high-reputation, active members by the admin team."
  },
];

const FAQItem = ({ faq, index, openIndex, setOpenIndex }) => {
  const isOpen = index === openIndex;
  return (
    <div className="border-b border-gray-300 dark:border-gray-600 transition-all">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={() => setOpenIndex(isOpen ? null : index)}
      >
        <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
          {faq.question}
        </span>
        <span className="text-gray-500 dark:text-gray-300">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <p className="pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          {faq.answer}
        </p>
      )}
    </div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="px-6 py-16 max-w-6xl mx-auto">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-gray-100">
        Frequently Asked Questions
      </h2>

      {/* 2-column grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <FAQItem
              faq={faq}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
