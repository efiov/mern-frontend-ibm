export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashadmin", "/dashuser", "/app/:path*"],
};
