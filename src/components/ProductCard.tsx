import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating?: number;
  category: string;
  color?: string;
  size?: string;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  description,
  rating = 4.9,
  category,
  color,
  size,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image,
      description,
      category,
      color,
      size,
    });
    toast.success(`${name} added to cart!`, {
      description: 'View your cart to checkout',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="product-card group flex flex-col h-full"
    >
      {/* Wishlist Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-background transition-all shadow-soft"
        aria-label="Add to wishlist"
      >
        <Heart className="w-5 h-5" />
      </motion.button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50 flex items-center justify-center p-6">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content - fixed height with flex-grow */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm text-muted-foreground">{rating}/5</span>
        </div>

        {/* Description - Fixed height */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 h-10">
          {description}
        </p>

        {/* Price & Add to Cart - Always at bottom */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-glow hover:bg-primary-dark transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}