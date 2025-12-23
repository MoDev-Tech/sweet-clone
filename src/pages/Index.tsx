import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import heroImage from '@/assets/hero-ice-cream.png';

const features = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Made with the finest ingredients',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Fresh to your doorstep',
  },
  {
    icon: Clock,
    title: 'Open Daily',
    description: '10AM - 10PM every day',
  },
];

export default function Index() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-hero" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-0 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-accent/5 blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <span className="inline-flex items-center gap-2 text-primary font-medium mb-4">
                <span className="w-8 h-px bg-primary" />
                Welcome to The
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight">
                Classic <span className="text-gradient">Ice Cream</span> Parlor
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                Savor the taste of traditional ice cream made with love and quality ingredients since 1985.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/shop">
                    Browse Our Flavors
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="hero-outline" size="lg" asChild>
                  <Link to="/about">About Us</Link>
                </Button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-6 bg-card rounded-2xl shadow-soft"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sweet Memories Section */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                Relive the Sweet Memories of Classic Ice Creams
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                From rich chocolate fudge to creamy vanilla sundaes, discover our menu of classic ice cream creations. Each flavor is crafted with care using traditional recipes passed down through generations.
              </p>
              <Button variant="hero" asChild>
                <Link to="/shop">
                  Explore Our Menu
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {products.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    className={`${index === 0 || index === 3 ? 'translate-y-8' : ''}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="bg-card rounded-2xl p-4 shadow-soft">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              Our Classic Favorites
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Check out our top products that our customers love.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="hero" size="lg" asChild>
              <Link to="/shop">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                text: 'The best ice cream I\'ve ever tasted! The flavors are so rich and authentic.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                text: 'My kids absolutely love the sundaes here. Fast delivery too!',
                rating: 5,
              },
              {
                name: 'Emily Davis',
                text: 'A perfect blend of nostalgia and quality. Highly recommend!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl shadow-soft"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Ready for a Sweet Treat?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Order now and get free delivery on your first order. Use code SWEET10 for 10% off!
            </p>
            <Button
              size="xl"
              className="bg-background text-foreground hover:bg-background/90"
              asChild
            >
              <Link to="/shop">Order Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
