import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Head from 'next/head';
import AuthProvider from '@/contexts/auth';
import DataProvider from '@/contexts/data';
import Header from '@/components/Header';
import { Fira_Sans } from 'next/font/google'
const Fira = Fira_Sans({ subsets: ['latin'], weight:'400' })

export const metadata = {
  title: 'App Masters',
  description: 'Exame para Vaga de Estágio',
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <DataProvider>
        <html lang="en">
          <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
          </Head>
          <body className={Fira.className}>
            <Header />
            {children}
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
        
          </body>
        </html>
      </DataProvider>
    </AuthProvider>
  );
}