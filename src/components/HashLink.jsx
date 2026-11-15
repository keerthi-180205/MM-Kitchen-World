import { Link, useLocation } from "react-router-dom";

/**
 * Link to a section of the home page ("#products"). On the home page it is a plain in-page anchor;
 * from any other page it navigates to "/#products".
 */
export default function HashLink({ to, children, ...rest }) {
  const { pathname } = useLocation();
  if (pathname === "/") return <a href={to} {...rest}>{children}</a>;
  return <Link to={`/${to}`} {...rest}>{children}</Link>;
}
