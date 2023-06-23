import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Head from 'next/head';
export const metadata = {
  title: 'App Masters',
  description: 'Exame para Vaga de Estágio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="/fonts/ttoctosquares.ttf"
          rel="stylesheet"
        />
      </Head>

      <body >
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
  );
}