import vanillaCone from '@/assets/products/vanilla-cone.png';
import chocolateBrownie from '@/assets/products/chocolate-brownie.png';
import strawberryShortcake from '@/assets/products/strawberry-shortcake.png';
import mintChocolate from '@/assets/products/mint-chocolate.png';
import strawberrySundae from '@/assets/products/strawberry-sundae.png';
import caramelSwirl from '@/assets/products/caramel-swirl.png';
import blueberryBlast from '@/assets/products/blueberry-blast.png';
import cookiesCream from '@/assets/products/cookies-cream.png';
import mangoSorbet from '@/assets/products/mango-sorbet.png';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  category: string;
  color?: string;
  size?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Vanilla Ice Cream',
    price: 4.99,
    image: vanillaCone,
    description: 'Creamy vanilla ice cream topped with cherry.',
    rating: 4.9,
    category: 'Classic Flavors',
    color: 'White',
    size: 'L',
  },
  {
    id: '2',
    name: 'Chocolate Brownie Sundae',
    price: 5.49,
    image: chocolateBrownie,
    description: 'Rich chocolate ice cream with chunks of brownie.',
    rating: 4.9,
    category: 'Sundaes',
    color: 'Brown',
    size: 'M',
  },
  {
    id: '3',
    name: 'Strawberry Shortcake',
    price: 5.29,
    image: strawberryShortcake,
    description: 'Strawberry ice cream layered with shortcake.',
    rating: 4.9,
    category: 'Ice Cream Cakes',
    color: 'Red',
    size: 'M',
  },
  {
    id: '4',
    name: 'Mint Chocolate Chip Cone',
    price: 3.99,
    image: mintChocolate,
    description: 'Refreshing mint ice cream with chocolate chips.',
    rating: 4.8,
    category: 'Classic Flavors',
    color: 'Green',
    size: 'L',
  },
  {
    id: '5',
    name: 'Strawberry Sundae',
    price: 4.79,
    image: strawberrySundae,
    description: 'Fresh strawberry ice cream with whipped cream.',
    rating: 4.9,
    category: 'Sundaes',
    color: 'Pink',
    size: 'M',
  },
  {
    id: '6',
    name: 'Caramel Swirl Delight',
    price: 5.19,
    image: caramelSwirl,
    description: 'Vanilla ice cream swirled with rich caramel.',
    rating: 4.7,
    category: 'Classic Flavors',
    color: 'Caramel',
    size: 'M',
  },
  {
    id: '7',
    name: 'Blueberry Blast',
    price: 4.89,
    image: blueberryBlast,
    description: 'Blueberry ice cream in a crispy waffle bowl.',
    rating: 4.8,
    category: 'Frozen Yogurt',
    color: 'Purple',
    size: 'L',
  },
  {
    id: '8',
    name: 'Cookies & Cream Shake',
    price: 5.99,
    image: cookiesCream,
    description: 'Classic cookies and cream milkshake.',
    rating: 4.9,
    category: 'Milkshakes',
    color: 'White',
    size: 'L',
  },
  {
    id: '9',
    name: 'Mango Sorbet',
    price: 4.49,
    image: mangoSorbet,
    description: 'Refreshing mango sorbet with fresh mango slices.',
    rating: 4.8,
    category: 'Frozen Yogurt',
    color: 'Orange',
    size: 'S',
  },
];

export const categories = [
  'Classic Flavors',
  'Sundaes',
  'Ice Cream Cakes',
  'Milkshakes',
  'Frozen Yogurt',
  'Popsicles',
];
