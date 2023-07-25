import AdminCard from "../molecules/adminbtn";
import "../../app/page.scss";

export default function Admin() {
  const img1 =
    "https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80";
  const img2 =
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=884&q=80";
  const img3 =
    "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80";
  return (
    <div className="admin-layout">
      <AdminCard img={img1} title="Events" link="/events" />
      <AdminCard img={img2} title="Groups" link="/groups" />
      <AdminCard img={img3} title="Users" link="/users" />
    </div>
  );
}
