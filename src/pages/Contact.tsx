import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { z } from 'zod';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required').max(50),
  lastName: z.string().min(2, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const businessHours = [
  { day: 'Monday - Friday', hours: '10:00 AM - 10:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 11:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 9:00 PM' },
];

export default function Contact() {
  const [formData, setFormData] = useState<Partial<ContactForm>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactForm] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-whatsapp', {
        body: {
          type: 'contact',
          formData: result.data,
        },
      });

      if (error) {
        console.error('WhatsApp error:', error);
        toast.error('Message sent but notification failed. We will contact you soon.');
      } else {
        toast.success('Message sent successfully! We will get back to you soon.');
      }

      setFormData({});
    } catch (err) {
      console.error('Contact error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      <PageHeader 
        title="Contact Us" 
        breadcrumbs={[
          { name: 'Home', path: '/' }, 
          { name: 'Contact', path: '/contact' }
        ]} 
      />
      
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="bg-card rounded-2xl shadow-medium overflow-hidden"
            >
              <div className="bg-gradient-primary p-6 text-primary-foreground">
                <h2 className="font-display text-2xl font-semibold flex items-center gap-3">
                  <Send className="w-6 h-6" />
                  Send Us a Message
                </h2>
                <p className="text-primary-foreground/80 mt-1">We'd love to hear from you!</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label-ice">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName || ''} 
                      onChange={handleChange} 
                      className={`form-input-ice ${errors.firstName ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
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
                  <div>
                    <label className="form-label-ice">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName || ''} 
                      onChange={handleChange} 
                      className={`form-input-ice ${errors.lastName ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
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
                </div>
                <div>
                  <label className="form-label-ice">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email || ''} 
                    onChange={handleChange} 
                    className={`form-input-ice ${errors.email ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
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
                <div>
                  <label className="form-label-ice">Phone *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone || ''} 
                    onChange={handleChange} 
                    className={`form-input-ice ${errors.phone ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
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
                <div>
                  <label className="form-label-ice">Message *</label>
                  <textarea 
                    name="message"
                    value={formData.message || ''} 
                    onChange={handleChange} 
                    rows={5} 
                    className={`form-input-ice resize-none ${errors.message ? 'border-destructive ring-2 ring-destructive/20' : ''}`}
                    placeholder="How can we help you?"
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
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="space-y-6"
            >
              <motion.div 
                className="bg-card rounded-2xl shadow-soft p-8 hover-lift"
                whileHover={{ y: -5 }}
              >
                <h3 className="font-display text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">123 Sweet Street, Ice Cream City, IC 12345</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">(123) 456-7890</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">hello@icedelights.com</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-card rounded-2xl shadow-soft p-8 hover-lift"
                whileHover={{ y: -5 }}
              >
                <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Business Hours
                </h3>
                <div className="space-y-3">
                  {businessHours.map((h, index) => (
                    <motion.div 
                      key={h.day} 
                      className="flex justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="font-medium">{h.day}</span>
                      <span className="text-primary font-medium">{h.hours}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="bg-card rounded-2xl shadow-soft overflow-hidden h-64"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <iframe 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5,37.7,-122.3,37.8" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  title="Location Map" 
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
