const faqs = [
  ["Can I start without VA experience?", "Yes. The free VA Career Starter begins with remote-work expectations, communication, basic tools, and Amazon context before PPC terms appear."],
  ["Do I need Seller Central or an Amazon account?", "No. Practice uses controlled training data and interface simulations, so you can learn without risking a real client account."],
  ["Is this course in Filipino or English?", "Lessons use clear English with Filipino work context, Philippine peso examples, and explanations written for local beginners."],
  ["Will this guarantee a job or income?", "No. Pinoy PPC Academy does not guarantee a job or income. It gives you training, practice evidence, and interview preparation you can use when applying."],
  ["How does simulator scoring work?", "Each scenario has written decision rules. Scores check the action, sequence, safety checks, and reasoning. No black-box grading is used."],
  ["Are certificates verifiable?", "Paid-track certificates are designed with a public verification record and revocation status. Completion does not equal employment."],
  ["Can I study on a phone?", "Yes. Lessons, quizzes, and focused practice views are mobile-first. Dense tables receive compact views instead of forcing desktop layouts."],
  ["What payment methods are accepted?", "The production plan uses PayMongo hosted checkout for supported Philippine peso e-wallet, card, and bank payment methods."],
  ["How do refunds work?", "The policy is shown before payment. Eligible requests are reviewed through the account area and approved access changes are recorded."],
  ["Is any content generated or graded by AI?", "No. Lessons are human-authored and versioned. Practice grading follows visible, deterministic rules reviewed by an instructor."],
] as const;

export function Faq() {
  return (
    <div className="faq-list">
      {faqs.map(([question, answer], index) => (
        <details key={question}>
          <summary><span className="mono">{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><i aria-hidden="true">+</i></summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
