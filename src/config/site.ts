/**
 * ========================================
 * SITE CONFIGURATION
 * ========================================
 * Edit this file to customize your entire site.
 * All changes here will reflect across the whole application.
 */

export const siteConfig = {
  // ========================================
  // BUSINESS INFORMATION
  // ========================================
  name: 'IceDelights',
  tagline: 'Classic Ice Cream Parlor',
  description: 'Savor the taste of traditional ice cream made with love and quality ingredients since 1985.',
  foundedYear: 1985,

  // ========================================
  // CONTACT INFORMATION
  // ========================================
  contact: {
    phone: '(123) 456-7890',
    email: 'hello@icedelights.com',
    address: '123 Sweet Street, Ice Cream City, IC 12345',
  },

  // ========================================
  // BUSINESS HOURS
  // ========================================
  businessHours: [
    { day: 'Monday - Friday', hours: '10:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 11:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 9:00 PM' },
  ],

  // ========================================
  // SOCIAL LINKS
  // ========================================
  social: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    youtube: '#',
  },

  // ========================================
  // NAVIGATION LINKS
  // ========================================
  navigation: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Shop', path: '/shop' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ],

  // ========================================
  // FOOTER LINKS
  // ========================================
  footerLinks: {
    shop: ['Classic Flavors', 'Sundaes', 'Milkshakes', 'Ice Cream Cakes', 'Frozen Yogurt'],
    legal: [
      { name: 'Privacy Policy', path: '/faq' },
      { name: 'Terms of Service', path: '/faq' },
    ],
  },

  // ========================================
  // FEATURES (displayed on homepage)
  // ========================================
  features: [
    {
      icon: 'Award',
      title: 'Premium Quality',
      description: 'Made with the finest ingredients',
    },
    {
      icon: 'Truck',
      title: 'Fast Delivery',
      description: 'Fresh to your doorstep',
    },
    {
      icon: 'Clock',
      title: 'Open Daily',
      description: '10AM - 10PM every day',
    },
  ],

  // ========================================
  // TESTIMONIALS
  // ========================================
  testimonials: [
    {
      name: 'Sarah Johnson',
      text: "The best ice cream I've ever tasted! The flavors are so rich and authentic.",
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
  ],

  // ========================================
  // CTA SECTION
  // ========================================
  cta: {
    title: 'Ready for a Sweet Treat?',
    description: 'Order now and get free delivery on your first order. Use code SWEET10 for 10% off!',
    buttonText: 'Order Now',
    buttonLink: '/shop',
  },

  // ========================================
  // HERO SECTION
  // ========================================
  hero: {
    badge: 'Welcome to The',
    title: 'Classic',
    titleHighlight: 'Ice Cream',
    titleEnd: 'Parlor',
    description: 'Savor the taste of traditional ice cream made with love and quality ingredients since 1985.',
    primaryButton: { text: 'Browse Our Flavors', link: '/shop' },
    secondaryButton: { text: 'About Us', link: '/about' },
  },

  // ========================================
  // LOCATION / EMBED MAP
  // ========================================
  mapEmbed: 'https://www.openstreetmap.org/export/embed.html?bbox=-122.5,37.7,-122.3,37.8',

  // ========================================
  // CHECKOUT SETTINGS
  // ========================================
  checkout: {
    states: ['California', 'Texas', 'Florida', 'New York', 'Illinois'],
    citiesByState: {
      California: ['Los Angeles', 'San Francisco', 'San Diego'],
      Texas: ['Houston', 'Austin', 'Dallas'],
      Florida: ['Miami', 'Orlando', 'Tampa'],
      'New York': ['New York City', 'Buffalo', 'Albany'],
      Illinois: ['Chicago', 'Springfield', 'Naperville'],
    } as Record<string, string[]>,
  },
};

// ========================================
// API CONFIGURATION
// ========================================
export const apiConfig = {
  // Set this to your Node.js server URL when deployed to Render
  // Example: 'https://your-app.onrender.com'
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  
  endpoints: {
    sendOrder: '/api/send-order',
    sendContact: '/api/send-contact',
    health: '/api/health',
  },
};
