import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { siteConfig } from '@/config/site';
import heroImage from '@/assets/hero-ice-cream.png';

const iconMap = {
  Award,
  Truck,
  Clock,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export default function Index() {
  const featuredProducts = products.slice(0, 4);
  const { hero, features, testimonials, cta } = siteConfig;

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-hero" />
        
        {/* Animated decorative elements */}
        <motion.div 
          className="absolute top-20 left-0 w-40 h-40 rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-strawberry/5 blur-2xl"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.span 
                variants={itemVariants}
                className="inline-flex items-center gap-2 text-primary font-medium mb-4"
              >
                <span className="w-8 h-px bg-primary" />
                {hero.badge}
              </motion.span>
              <motion.h1 
                variants={itemVariants}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight"
              >
                {hero.title} <span className="text-gradient">{hero.titleHighlight}</span> {hero.titleEnd}
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
              >
                {hero.description}
              </motion.p>
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" size="lg" asChild>
                    <Link to={hero.primaryButton.link}>
                      {hero.primaryButton.text}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero-outline" size="lg" asChild>
                    <Link to={hero.secondaryButton.link}>{hero.secondaryButton.text}</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              variants={scaleVariants}
              initial="hidden"
              animate="visible"
              className="relative flex justify-center"
            >
              <div className="relative">
                <motion.img
                  src={heroImage}
                  alt="Delicious ice cream cone with multiple flavors"
                  className="w-full max-w-lg lg:max-w-xl rounded-3xl shadow-strong"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-card rounded-full px-4 py-2 shadow-medium"
                  animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-sm font-semibold text-primary">Since {siteConfig.foundedYear}</span>
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-glow"
                  animate={{ y: [0, 5, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <span className="text-sm font-semibold">Premium Quality</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="flex items-center gap-4 p-6 bg-card rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300"
                >
                  <motion.div 
                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Sweet Memories Section */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                Relive the Sweet Memories of Classic Ice Creams
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                From rich chocolate fudge to creamy vanilla sundaes, discover our menu of classic ice cream creations. Each flavor is crafted with care using traditional recipes passed down through generations.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" asChild>
                  <Link to="/shop">
                    Explore Our Menu
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {products.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    className={`${index === 0 || index === 3 ? 'translate-y-8' : ''}`}
                    whileHover={{ scale: 1.08, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-card rounded-2xl p-4 shadow-soft hover:shadow-medium transition-shadow duration-300">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-square object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-hero">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              Our Classic Favorites
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Check out our top products that our customers love.
            </p>
          </motion.div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop">
                  View All Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              What Our Customers Say
            </h2>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-cta">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-primary-foreground">
              {cta.title}
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              {cta.description}
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="xl"
                className="bg-background text-foreground hover:bg-background/90 shadow-strong"
                asChild
              >
                <Link to={cta.buttonLink}>{cta.buttonText}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
