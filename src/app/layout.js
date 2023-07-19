import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Provider from "../app/context/AuthContext";
import ToasterContext from "../app/context/ToasterContext";

export const metadata = {
  title: "Event Planner",
  description: "by OmegaTeam",
};

export default function RootLayout({ children }) {
  return (
    <Provider>
      <html lang="en">
        <body className={inter.className}>
          <Provider>
            <ToasterContext />
            {children}
          </Provider>
        </body>
      </html>
    </Provider>
  );
}
