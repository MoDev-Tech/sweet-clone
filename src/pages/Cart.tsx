import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, Tag, ShieldCheck, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
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
        <section className="py-20">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
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

      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold">
                    Shopping Cart
                  </h2>
                  <span className="text-muted-foreground">
                    ({state.items.length} Items)
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
                {itemsByCategory.map(({ category, items, subtotal: categorySubtotal }) => (
                  <div key={category}>
                    {/* Category Header */}
                    <div className="px-6 py-3 bg-secondary/50 border-y border-border">
                      <span className="text-sm font-medium">Shop &gt; {category}</span>
                      <span className="text-sm text-muted-foreground float-right">
                        Subtotal: ${categorySubtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Category Items */}
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-12 gap-4 p-6 border-b border-border items-center"
                      >
                        {/* Product Info */}
                        <div className="col-span-12 md:col-span-6 flex gap-4">
                          <div className="w-20 h-20 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
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
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Total & Remove */}
                        <div className="col-span-4 md:col-span-2 flex items-center justify-center gap-3">
                          <span className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}

                {/* Continue Shopping */}
                <div className="p-6">
                  <Button variant="outline" asChild>
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-soft p-6 sticky top-28">
                <h3 className="font-display text-xl font-semibold text-center mb-6 pb-4 border-b border-border">
                  Order Summary
                </h3>

                {/* Coupon */}
                <div className="flex items-center gap-3 mb-6 p-4 bg-muted rounded-xl">
                  <Tag className="w-5 h-5 text-primary" />
                  <input
                    type="text"
                    placeholder="Apply Coupons"
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                  <Button size="sm">Apply</Button>
                </div>

                {/* Totals */}
                <div className="space-y-4 mb-6">
                  <h4 className="font-medium">Product Details:</h4>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sub Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-4 border-t border-border">
                    <span>Grand Total</span>
                    <span className="text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button variant="hero" className="w-full" size="lg" asChild>
                  <Link to="/checkout">
                    Proceed to checkout
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>

                <div className="flex items-center gap-2 justify-center mt-6 text-sm text-muted-foreground">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Safe and Secure Payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
