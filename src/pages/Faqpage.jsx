import { useState } from "react";

const faqs = [
  {
    question: "Where is R K Marble location?",
    answer:
      "R K Marble has warehouses in Kishangarh, Rajasthan and Gurugram, Haryana. We also have a Stone Art Gallery & Showroom in Mayapuri, New Delhi.",
  },
  {
    question: "What is special about marble?",
    answer:
      "Marble is known for its natural beauty, durability, elegance, and timeless appeal. Each slab is unique with natural veining and patterns.",
  },
  {
    question: "How is marble formed in nature?",
    answer:
      "Marble is formed when limestone undergoes metamorphism due to high pressure and temperature over millions of years beneath the Earth's surface.",
  },
  {
    question: "What type of rock is granite?",
    answer:
      "Granite is an igneous rock formed from the slow crystallization of magma beneath the Earth’s surface.",
  },
  {
    question: "How to check the quality of marble?",
    answer:
      "Quality can be checked by examining surface cracks, uniformity, water absorption, polish, and hardness of the stone.",
  },
  {
    question: "Where to use imported marble?",
    answer:
      "Imported marble is ideal for luxury interiors such as flooring, walls, countertops, staircases, and feature areas.",
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
