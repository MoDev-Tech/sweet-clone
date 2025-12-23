import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IceCream2, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';

const iconMap = {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function Footer() {
  const socialIcons = [
    { Icon: Facebook, href: siteConfig.social.facebook },
    { Icon: Twitter, href: siteConfig.social.twitter },
    { Icon: Instagram, href: siteConfig.social.instagram },
    { Icon: Youtube, href: siteConfig.social.youtube },
  ];

  return (
    <footer className="relative bg-gradient-header pt-20 pb-8">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary" />
      
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ duration: 0.3 }}>
                <IceCream2 className="w-10 h-10 text-primary" />
              </motion.div>
              <span className="font-display text-2xl font-semibold">
                <span className="text-foreground">Ice</span>
                <span className="text-gradient">Delights</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="Social media"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-lg font-semibold mb-6">Navigation</h3>
            <ul className="space-y-3">
              {siteConfig.navigation.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Shop */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-lg font-semibold mb-6">Shop</h3>
            <ul className="space-y-3">
              {siteConfig.footerLinks.shop.map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to="/shop"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  {siteConfig.contact.address}
                </span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </motion.li>
              <motion.li 
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {siteConfig.contact.email}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            {siteConfig.footerLinks.legal.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
