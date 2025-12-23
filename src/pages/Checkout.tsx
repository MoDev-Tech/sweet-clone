import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { OrderSummary } from '@/components/OrderSummary';
import { useCart } from '@/context/CartContext';
import { sendOrderWhatsApp } from '@/lib/api';
import { siteConfig } from '@/config/site';
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

const { states, citiesByState } = siteConfig.checkout;

export default function Checkout() {
  const navigate = useNavigate();
  const { state: cartState, getItemsByCategory, subtotal, shipping, grandTotal, clearCart } = useCart();
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

    try {
      const response = await sendOrderWhatsApp({
        formData: result.data as any,
        orderData: {
          itemsByCategory: itemsByCategory.map(cat => ({
            category: cat.category,
            items: cat.items.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              category: item.category,
            })),
            subtotal: cat.subtotal,
          })),
          subtotal,
          shipping,
          grandTotal,
        },
      });

      if (!response.success) {
        console.error('API error:', response.error);
        toast.error('Order placed but notification failed. We will contact you soon.');
      } else {
        toast.success('Order placed successfully!');
      }

      clearCart();
      navigate('/thank-you');
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

      <section className="section-padding">
        <div className="container-custom">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Billing Form */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-card rounded-2xl shadow-soft p-8 animate-fade-in">
                  <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                    Billing Address
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="group">
                      <label htmlFor="firstName" className="form-label-ice">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName || ''}
                        onChange={handleChange}
                        className={`form-input-ice transition-all duration-300 group-hover:shadow-soft ${errors.firstName ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm mt-1"
                        >
                          {errors.firstName}
                        </motion.p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="group">
                      <label htmlFor="lastName" className="form-label-ice">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName || ''}
                        onChange={handleChange}
                        className={`form-input-ice transition-all duration-300 group-hover:shadow-soft ${errors.lastName ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm mt-1"
                        >
                          {errors.lastName}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label htmlFor="email" className="form-label-ice">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        className={`form-input-ice transition-all duration-300 group-hover:shadow-soft ${errors.email ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm mt-1"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="group">
                      <label htmlFor="phone" className="form-label-ice">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        className={`form-input-ice transition-all duration-300 group-hover:shadow-soft ${errors.phone ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm mt-1"
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>

                    {/* State */}
                    <div className="group">
                      <label htmlFor="state" className="form-label-ice">
                        State *
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state || ''}
                        onChange={handleChange}
                        className={`form-input-ice transition-all duration-300 group-hover:shadow-soft ${errors.state ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
                      >
                        <option value="">Select State</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm mt-1"
                        >
                          {errors.state}
                        </motion.p>
                      )}
                    </div>

                    {/* City */}
                    <div className="group">
                      <label htmlFor="city" className="form-label-ice">
                        City *
                      </label>
                      <select
                        id="city"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        className={`form-input-ice transition-all duration-300 group-hover:shadow-soft ${errors.city ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
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
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm mt-1"
                        >
                          {errors.city}
                        </motion.p>
                      )}
                    </div>

                    {/* Zip Code */}
                    <div className="group">
                      <label htmlFor="zipCode" className="form-label-ice">
                        Zip / Postal Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode || ''}
                        onChange={handleChange}
                        className={`form-input-ice transition-all duration-300 group-hover:shadow-soft ${errors.zipCode ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
                        placeholder="12345"
                      />
                      {errors.zipCode && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm mt-1"
                        >
                          {errors.zipCode}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-6 group">
                    <label htmlFor="message" className="form-label-ice">
                      Delivery Notes (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message || ''}
                      onChange={handleChange}
                      rows={4}
                      className={`form-input-ice resize-none transition-all duration-300 group-hover:shadow-soft ${errors.message ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
                      placeholder="Special requests or delivery instructions..."
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-destructive text-sm mt-1"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Terms */}
                  <motion.div 
                    className="mt-8 flex items-start gap-3 p-4 bg-secondary/30 rounded-xl cursor-pointer hover:bg-secondary/50 transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setAgreeToTerms(!agreeToTerms)}
                  >
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="w-5 h-5 mt-0.5 rounded border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      By clicking the button, you agree to the{' '}
                      <a href="/faq" className="text-primary hover:underline font-medium">
                        Terms and Conditions
                      </a>
                    </label>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full mt-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                          Processing...
                        </span>
                      ) : (
                        'Place Order Now'
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div 
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <OrderSummary
                  itemsByCategory={itemsByCategory}
                  subtotal={subtotal}
                  shipping={shipping}
                  grandTotal={grandTotal}
                  variant="checkout"
                />
              </motion.div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
