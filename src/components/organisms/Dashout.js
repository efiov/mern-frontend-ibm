import Navbar from "../molecules/Navbar";
// import Footer from '../molecules/Footer';

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
