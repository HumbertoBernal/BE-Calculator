import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';


import NewsBlock from '@/components/NewsBlock';
import StockCalculator from '@/components/StockCalculator';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-start justify-start py-12 text-left space-y-4'>

            <StockCalculator />
            <NewsBlock />

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} by Even break
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
