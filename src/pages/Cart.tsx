import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, Tag, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { OrderSummary } from '@/components/OrderSummary';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { state, updateQuantity, removeItem, subtotal, shipping, grandTotal, getItemsByCategory } = useCart();
  const itemsByCategory = getItemsByCategory();

  if (state.items.length === 0) {
    return (
      <main className="pt-20">
        <PageHeader
          title="Shopping Cart"
          breadcrumbs={[
            { name: 'Home', path: '/' },
            { name: 'Cart', path: '/cart' },
          ]}
        />
        <section className="section-padding">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🛒
                </motion.div>
              </div>
              <h2 className="font-display text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added any items yet.</p>
              <Button variant="hero" asChild>
                <Link to="/shop">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <PageHeader
        title="Shopping Cart"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Cart', path: '/cart' },
        ]}
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl shadow-soft overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between bg-gradient-to-r from-secondary/50 to-transparent">
                  <h2 className="font-display text-xl font-semibold">
                    Shopping Cart
                  </h2>
                  <span className="text-muted-foreground bg-primary/10 px-3 py-1 rounded-full text-sm">
                    {state.items.length} Items
                  </span>
                </div>

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium text-muted-foreground">
                  <div className="col-span-6">Product Details</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {/* Items by Category */}
                {itemsByCategory.map(({ category, items, subtotal: categorySubtotal }, categoryIndex) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                  >
                    {/* Category Header */}
                    <div className="px-6 py-3 bg-secondary/30 border-y border-border flex items-center justify-between">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        Shop &gt; {category}
                      </span>
                      <span className="text-sm text-primary font-medium">
                        ${categorySubtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Category Items */}
                    {items.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: itemIndex * 0.05 }}
                        className="grid grid-cols-12 gap-4 p-6 border-b border-border items-center hover:bg-secondary/20 transition-colors"
                      >
                        {/* Product Info */}
                        <div className="col-span-12 md:col-span-6 flex gap-4">
                          <motion.div 
                            className="w-20 h-20 bg-secondary rounded-xl overflow-hidden flex-shrink-0"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold mb-1">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.color && `Color: ${item.color}`}
                              {item.size && ` | Size: ${item.size}`}
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-4 md:col-span-2 text-center">
                          <span className="md:hidden text-sm text-muted-foreground mr-2">Price:</span>
                          <span className="text-primary font-semibold">${item.price.toFixed(2)}</span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-4 md:col-span-2 flex justify-center">
                          <div className="flex items-center gap-2 bg-muted rounded-lg">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Total & Remove */}
                        <div className="col-span-4 md:col-span-2 flex items-center justify-center gap-3">
                          <span className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ))}

                {/* Coupon & Continue Shopping */}
                <div className="p-6 flex flex-wrap gap-4 items-center justify-between bg-gradient-to-r from-transparent to-secondary/30">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-xl w-full sm:w-auto sm:max-w-md">
                    <Tag className="w-5 h-5 text-primary flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Apply Coupon Code"
                      className="flex-1 bg-transparent outline-none text-sm min-w-0"
                    />
                    <Button size="sm">Apply</Button>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                itemsByCategory={itemsByCategory}
                subtotal={subtotal}
                shipping={shipping}
                grandTotal={grandTotal}
                variant="cart"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4"
              >
                <Button variant="hero" className="w-full" size="lg" asChild>
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
