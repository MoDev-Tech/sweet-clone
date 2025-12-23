import { motion } from 'framer-motion';
import { Heart, Award, Users, Clock } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

const stats = [
  { icon: Clock, value: '38+', label: 'Years of Excellence' },
  { icon: Users, value: '50K+', label: 'Happy Customers' },
  { icon: Award, value: '25+', label: 'Flavor Varieties' },
  { icon: Heart, value: '100%', label: 'Made with Love' },
];

const team = [
  { name: 'Maria Rodriguez', role: 'Founder & Head Chef', bio: 'Maria started IceDelights in 1985 with a dream of bringing joy through ice cream.' },
  { name: 'James Thompson', role: 'Operations Director', bio: 'James ensures every scoop reaches you fresh and delicious.' },
  { name: 'Sarah Chen', role: 'Creative Director', bio: 'Sarah dreams up our most innovative and beloved flavors.' },
];

export default function About() {
  return (
    <main className="pt-20">
      <PageHeader title="About Us" breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
      
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Our Sweet Story
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-muted-foreground text-lg leading-relaxed">
              Since 1985, IceDelights has been crafting premium ice cream using traditional recipes and the finest ingredients. What started as a small family parlor has grown into a beloved destination for ice cream lovers everywhere.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card p-6 rounded-2xl shadow-soft text-center">
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <h2 className="font-display text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card p-8 rounded-2xl shadow-soft text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-display text-xl font-semibold">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
