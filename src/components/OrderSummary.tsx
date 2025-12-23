import { motion } from 'framer-motion';
import { ShoppingBag, Package, Truck, CreditCard, Shield } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  category: string;
}

interface CategoryGroup {
  category: string;
  items: OrderItem[];
  subtotal: number;
}

interface OrderSummaryProps {
  itemsByCategory: CategoryGroup[];
  subtotal: number;
  shipping: number;
  grandTotal: number;
  variant?: 'cart' | 'checkout';
}

export function OrderSummary({
  itemsByCategory,
  subtotal,
  shipping,
  grandTotal,
  variant = 'cart',
}: OrderSummaryProps) {
  const isCheckout = variant === 'checkout';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-2xl shadow-medium overflow-hidden sticky top-28"
    >
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold">Order Summary</h3>
            <p className="text-primary-foreground/80 text-sm">
              {itemsByCategory.reduce((acc, cat) => acc + cat.items.reduce((a, i) => a + i.quantity, 0), 0)} items
            </p>
          </div>
        </div>
      </div>

      {/* Items List */}
      {isCheckout && (
        <div className="p-4 max-h-64 overflow-y-auto border-b border-border">
          {itemsByCategory.map(({ category, items }) => (
            <div key={category} className="mb-4 last:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {category}
                </span>
              </div>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 py-2 group"
                >
                  <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      <div className="p-6 space-y-4">
        {/* Category Subtotals */}
        {itemsByCategory.map(({ category, subtotal: catSubtotal }) => (
          <div key={category} className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/50" />
              {category}
            </span>
            <span>${catSubtotal.toFixed(2)}</span>
          </div>
        ))}

        <div className="h-px bg-border my-2" />

        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-muted-foreground flex items-center gap-2">
            <Package className="w-4 h-4" />
            Subtotal
          </span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-muted-foreground flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Shipping
          </span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="h-px bg-border my-2" />

        {/* Grand Total */}
        <motion.div
          className="flex justify-between items-center bg-secondary/50 -mx-6 px-6 py-4"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <span className="font-display text-lg font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Grand Total
          </span>
          <span className="text-2xl font-bold text-primary">${grandTotal.toFixed(2)}</span>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 pt-4 text-sm text-muted-foreground"
        >
          <Shield className="w-4 h-4 text-green-600" />
          <span>Safe & Secure Checkout</span>
        </motion.div>
      </div>
    </motion.div>
  );
}