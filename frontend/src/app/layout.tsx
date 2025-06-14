import type { Metadata } from "next";
import "../styles/css/nunito.css";
import "../styles/css/satoshi.css";
import "../styles/css/style.css";
import "./globals.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ReduxProvider } from "./provider";



export const metadata: Metadata = {
  title: "Ticketfy Portal",
  description: "Automated Ticket Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className=""
      ><ReduxProvider>
      
      <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="colored" 
             />
             {children}
         </ReduxProvider>
      </body>
    </html>
  );
}
