import { useState } from "react";

const faqs = [
  {
    question: "What services does Avtaar Cleaning Solutions provide?",
    answer:
      "We offer professional cleaning and polishing services including sofa dry cleaning, carpet cleaning, deep cleaning, and marble diamond polishing for homes, offices, and commercial spaces.",
  },
  {
    question: "Do you provide services for both residential and commercial spaces?",
    answer:
      "Yes! We serve homes, offices, and commercial properties, ensuring a fresh, hygienic, and sparkling environment for every space.",
  },
  {
    question: "What cleaning techniques and products do you use?",
    answer:
      "We use advanced cleaning techniques and high-quality products that are safe, effective, and designed to deliver long-lasting cleanliness without damaging surfaces.",
  },
  {
    question: "Is sofa and carpet cleaning done at home or off-site?",
    answer:
      "Our sofa and carpet dry cleaning services are done on-site, so you don’t have to worry about moving furniture or long drying times.",
  },
  {
    question: "Do you use water for cleaning? Will my furniture take time to dry?",
    answer:
      "We primarily use dry and low-moisture cleaning methods, which means minimal water usage and faster drying times.",
  },
  {
    question: "Why should I choose Avtaar Cleaning Solutions?",
    answer:
      "We are committed to quality, excellence, and customer satisfaction. Our goal is to give your space a fresh, spotless, and sparkling look—every single time.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#C6AC8F] text-black px-6 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 border-t-2 border-l-2 border-red-600" />
          <h2 className="text-4xl font-bold tracking-wide">FAQ’s</h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-white/20 pb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left text-xl md:text-2xl font-medium"
              >
                <span>{faq.question}</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ⌄
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 mt-4" : "max-h-0"
                }`}
              >
                <p className="text-black/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
