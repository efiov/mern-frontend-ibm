import Link from "next/link";
import "../page.scss";

export default function Denied() {
  return (
    <>
      <div className="denied">
        <h1 className="message1">You are not authorized.</h1>
        <h2 className="message2">
          You tried to access a page you did not have prior authorization for.
        </h2>

        <Link href="/" className="link">
          Return to Home Page
        </Link>
      </div>
    </>
  );
}
