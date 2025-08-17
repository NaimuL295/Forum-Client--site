const faqs = [
  {
    question: "How do I create a new post in the forum?",
    answer: "To create a new post, first make sure you are logged into your account. Once logged in, navigate to the category where you want to post. At the top of the page, you will see a 'New Post' button. Click it and you will be redirected to a form where you can enter a title, write your content, and add relevant tags. Tags help other members find your post more easily. After finishing, click the 'Publish' button. Your post will now be visible to the community. If you need to edit or update it later, you can do so from your profile or the post’s options menu."
  },
  {
    question: "What are the main rules and guidelines for participating in the forum?",
    answer: "Our community is built on respect, helpfulness, and meaningful discussions. We strictly prohibit hate speech, offensive language, personal attacks, spam, and irrelevant advertisements. Stay on-topic in discussions and contribute constructively. Sharing false information or plagiarized content is not allowed. Moderators actively monitor posts and comments, and repeated violations may result in temporary or permanent bans. Please also remember to use appropriate tags and categories when creating posts so other members can easily find discussions."
  },
  {
    question: "How do reputation points and badges work?",
    answer: "Reputation points are a way to reward members for positive participation. You earn points when you post helpful content, receive upvotes, answer questions, or contribute to discussions. As your reputation increases, you unlock new features such as the ability to send private messages, access exclusive sections, or even qualify for moderator consideration. Alongside points, you can also earn badges for achievements like 'Top Contributor', 'Helpful Answer', or 'Community Builder'. This system motivates members to engage positively and contribute valuable insights."
  },
  {
    question: "Can I message other members privately and how does it work?",
    answer: "Yes, our forum has a private messaging feature, but it is only available after you reach a certain reputation level (20 points or more). This ensures that only active and trustworthy members can send direct messages, reducing spam. Once unlocked, you can go to a member’s profile and click 'Message' to start a private conversation. All your private messages are stored in your inbox, accessible from the top navigation bar. Please use this feature responsibly and avoid harassment or spam, as it will lead to restrictions on your account."
  },
  {
    question: "How can I report inappropriate content or rule violations?",
    answer: "If you come across content that is offensive, abusive, or violates our community guidelines, you can easily report it. Under every post and comment, you will find a 'Report' button. Click it and select the reason for reporting (e.g., spam, harassment, hate speech). The report will be sent directly to our moderators who review all reports within 24 hours. Based on the severity, action may include warning the user, removing the content, or banning the account. Your reports remain confidential, and no one will know who submitted them."
  },

];



export default function FAQSection() {


  return (
    <section className=" px-6 py-16  xl:max-w-[1350px]  md:w-11/12 mx-auto">
      <h2 className="text-xl md:text-base lg:text-4xl font-extrabold text-center mb-12 ">
        Frequently Asked Questions
      </h2>

      {/* 2-column grid */}
      <div className="">
        {faqs.map((faq, index) => (
         <div key={index} className="collapse collapse-arrow  border border-base-300">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title font-semibold">{faq.question}</div>
  <div className="collapse-content text-sm">{faq.answer}</div>
</div>
       
        ))}
      </div>
    </section>
  );
}
