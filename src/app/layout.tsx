import type { Metadata } from 'next';
import { Geist, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { SizeGuideModal } from '@/components/modals/SizeGuideModal';
import { ProductQuickViewModal } from '@/components/modals/ProductQuickViewModal';
import { Toast } from '@/components/ui/Toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'ClothVentive — Modern Clothing, Considered Design',
  description:
    'Discover ClothVentive — contemporary clothing designed around refined silhouettes, premium materials, and effortless everyday style.',
  keywords: [
    'ClothVentive',
    'luxury fashion',
    'minimalist clothing',
    'contemporary label',
    'heavyweight tees',
    'tailored trousers',
    'modern essentials',
  ],
  authors: [{ name: 'ClothVentive' }],
  openGraph: {
    title: 'ClothVentive — Modern Clothing, Considered Design',
    description:
      'Contemporary clothing label focused on refined silhouettes, premium materials, modern essentials, and effortless everyday fashion.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ClothVentive',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'ClothVentive Spring Summer 2026 Campaign',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClothVentive — Modern Clothing, Considered Design',
    description:
      'Contemporary clothing label focused on refined silhouettes, premium materials, modern essentials, and effortless everyday fashion.',
    images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#111111] selection:bg-[#111111] selection:text-[#F8F6F0]">
        <StoreProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <SizeGuideModal />
          <ProductQuickViewModal />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
