import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

const faqs = [
  {
    category: 'Ordering',
    questions: [
      {
        question: 'How do I place an order?',
        answer: 'Simply browse our menu, add your favorite items to the cart, and proceed to checkout. You can pay online or choose cash on delivery.',
      },
      {
        question: 'Can I modify my order after placing it?',
        answer: 'Yes, you can modify your order within 30 minutes of placing it by contacting our customer service team.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, debit cards, and cash on delivery. Online payments are processed securely.',
      },
    ],
  },
  {
    category: 'Delivery',
    questions: [
      {
        question: 'What are your delivery hours?',
        answer: 'We deliver from 10 AM to 10 PM daily. Orders placed after 9:30 PM will be delivered the next day.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Most orders are delivered within 30-45 minutes. During peak hours, it may take up to 60 minutes.',
      },
      {
        question: 'Do you charge for delivery?',
        answer: 'We offer free delivery on orders over $25. For orders below $25, a flat delivery fee of $5 applies.',
      },
    ],
  },
  {
    category: 'Products',
    questions: [
      {
        question: 'Are your products made fresh?',
        answer: 'Yes! All our ice cream is made fresh daily using premium ingredients and traditional recipes.',
      },
      {
        question: 'Do you have options for dietary restrictions?',
        answer: 'We offer sugar-free, dairy-free, and gluten-free options. Check the product labels for allergen information.',
      },
      {
        question: 'How should I store the ice cream?',
        answer: 'Store in your freezer at -18°C or below. For best taste, consume within 2 weeks of purchase.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        question: 'What is your refund policy?',
        answer: 'If you\'re not satisfied with your order, contact us within 24 hours for a full refund or replacement.',
      },
      {
        question: 'What if my order arrives damaged?',
        answer: 'Take photos of the damaged items and contact us immediately. We\'ll arrange a replacement or refund.',
      },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <main className="pt-20">
      <PageHeader
        title="Frequently Asked Questions"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ]}
      />

      <section className="py-16">
        <div className="container-custom">
          {/* Search */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input-ice pl-12 text-lg"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="max-w-3xl mx-auto space-y-8">
            {filteredFaqs.map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl shadow-soft overflow-hidden"
              >
                <div className="bg-primary/5 px-6 py-4">
                  <h2 className="font-display text-xl font-semibold">{category.category}</h2>
                </div>
                <div className="divide-y divide-border">
                  {category.questions.map((faq, index) => {
                    const id = `${category.category}-${index}`;
                    const isOpen = openItems.includes(id);

                    return (
                      <div key={id}>
                        <button
                          onClick={() => toggleItem(id)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <span className="font-medium pr-4">{faq.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-5 text-muted-foreground">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No questions found matching your search.</p>
              </div>
            )}
          </div>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-12 bg-gradient-primary text-primary-foreground rounded-2xl p-8 text-center"
          >
            <h2 className="font-display text-2xl font-semibold mb-4">Still Have Questions?</h2>
            <p className="mb-6 text-primary-foreground/90">
              Can't find what you're looking for? Our team is here to help!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-12 px-8 bg-background text-foreground rounded-full font-semibold hover:bg-background/90 transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
