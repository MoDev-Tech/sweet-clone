import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name is required').max(50),
  lastName: z.string().min(2, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(5, 'Zip code is required').max(10),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const states = ['California', 'Texas', 'Florida', 'New York', 'Illinois'];
const citiesByState: Record<string, string[]> = {
  California: ['Los Angeles', 'San Francisco', 'San Diego'],
  Texas: ['Houston', 'Austin', 'Dallas'],
  Florida: ['Miami', 'Orlando', 'Tampa'],
  'New York': ['New York City', 'Buffalo', 'Albany'],
  Illinois: ['Chicago', 'Springfield', 'Naperville'],
};

export default function Checkout() {
  const navigate = useNavigate();
  const { state: cartState, getItemsByCategory, grandTotal, clearCart } = useCart();
  const [formData, setFormData] = useState<Partial<CheckoutForm>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const itemsByCategory = getItemsByCategory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = checkoutSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutForm, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof CheckoutForm] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    if (!agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear cart and navigate to thank you page
    clearCart();
    toast.success('Order placed successfully!');
    navigate('/thank-you');
    
    setIsSubmitting(false);
  };

  if (cartState.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const availableCities = formData.state ? citiesByState[formData.state] || [] : [];

  return (
    <main className="pt-20">
      <PageHeader
        title="Checkout"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Cart', path: '/cart' },
          { name: 'Checkout', path: '/checkout' },
        ]}
      />

      <section className="py-16">
        <div className="container-custom">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Billing Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-2xl shadow-soft p-8"
                >
                  <h2 className="font-display text-2xl font-semibold mb-8">Billing Address</h2>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label htmlFor="firstName" className="form-label-ice">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleChange}
                        className={`form-input-ice ${errors.firstName ? 'border-destructive' : ''}`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-destructive text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="lastName" className="form-label-ice">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleChange}
                        className={`form-input-ice ${errors.lastName ? 'border-destructive' : ''}`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-destructive text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="form-label-ice">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        className={`form-input-ice ${errors.email ? 'border-destructive' : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="form-label-ice">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        className={`form-input-ice ${errors.phone ? 'border-destructive' : ''}`}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && (
                        <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label htmlFor="state" className="form-label-ice">
                        State *
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state || ''}
                        onChange={handleChange}
                        className={`form-input-ice ${errors.state ? 'border-destructive' : ''}`}
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="text-destructive text-sm mt-1">{errors.state}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label htmlFor="city" className="form-label-ice">
                        City *
                      </label>
                      <select
                        id="city"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        className={`form-input-ice ${errors.city ? 'border-destructive' : ''}`}
                        disabled={!formData.state}
                      >
                        <option value="">Select City</option>
                        {availableCities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="text-destructive text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    {/* Zip Code */}
                    <div>
                      <label htmlFor="zipCode" className="form-label-ice">
                        Zip / Postal Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode || ''}
                        onChange={handleChange}
                        className={`form-input-ice ${errors.zipCode ? 'border-destructive' : ''}`}
                        placeholder="12345"
                      />
                      {errors.zipCode && (
                        <p className="text-destructive text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-6">
                    <label htmlFor="message" className="form-label-ice">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message || ''}
                      onChange={handleChange}
                      rows={4}
                      className={`form-input-ice resize-none ${errors.message ? 'border-destructive' : ''}`}
                      placeholder="Special requests or delivery instructions..."
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="mt-8 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="w-5 h-5 mt-0.5 rounded border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      By clicking the button, you agree to the{' '}
                      <a href="/faq" className="text-primary hover:underline">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full mt-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order Now'}
                  </Button>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card rounded-2xl shadow-soft p-6 sticky top-28"
                >
                  <h3 className="font-display text-xl font-semibold mb-6">Order Summary</h3>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {itemsByCategory.map(({ category, items }) => (
                      <div key={category}>
                        <p className="text-xs text-muted-foreground mb-2">Shop &gt; {category}</p>
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between py-2 border-b border-border">
                            <div>
                              <p className="font-medium">{item.quantity} x {item.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                            </div>
                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between font-bold text-lg mt-6 pt-4 border-t border-border">
                    <span>Grand Total</span>
                    <span className="text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
