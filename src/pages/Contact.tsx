import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { z } from 'zod';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const contactSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  message: z.string().min(10).max(1000),
});

const businessHours = [
  { day: 'Monday - Friday', hours: '10:00 AM - 10:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 11:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 9:00 PM' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) { toast.error('Please fill all fields correctly'); return; }
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Message sent successfully!');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <main className="pt-20">
      <PageHeader title="Contact Us" breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-card rounded-2xl shadow-soft p-8">
              <h2 className="font-display text-2xl font-semibold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label-ice">First Name *</label>
                    <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="form-input-ice" />
                  </div>
                  <div>
                    <label className="form-label-ice">Last Name *</label>
                    <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="form-input-ice" />
                  </div>
                </div>
                <div>
                  <label className="form-label-ice">Email *</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input-ice" />
                </div>
                <div>
                  <label className="form-label-ice">Phone *</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="form-input-ice" />
                </div>
                <div>
                  <label className="form-label-ice">Message *</label>
                  <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={5} className="form-input-ice resize-none" />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send Message'}</Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="bg-card rounded-2xl shadow-soft p-8">
                <h3 className="font-display text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4"><MapPin className="w-5 h-5 text-primary mt-1" /><span className="text-muted-foreground">123 Sweet Street, Ice Cream City, IC 12345</span></div>
                  <div className="flex items-center gap-4"><Phone className="w-5 h-5 text-primary" /><span className="text-muted-foreground">(123) 456-7890</span></div>
                  <div className="flex items-center gap-4"><Mail className="w-5 h-5 text-primary" /><span className="text-muted-foreground">hello@icedelights.com</span></div>
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-soft p-8">
                <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" />Business Hours</h3>
                <div className="space-y-3">
                  {businessHours.map(h => <div key={h.day} className="flex justify-between"><span className="font-medium">{h.day}</span><span className="text-muted-foreground">{h.hours}</span></div>)}
                </div>
              </div>

              <div className="bg-card rounded-2xl shadow-soft overflow-hidden h-64">
                <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-122.5,37.7,-122.3,37.8" width="100%" height="100%" style={{ border: 0 }} title="Location Map" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
