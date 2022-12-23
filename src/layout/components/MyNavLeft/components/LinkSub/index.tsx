// Routing
import { Link, useLocation } from "react-router-dom";
// Mantine
import { Anchor } from "@mantine/core";
// Local - TypeScript Types
import { ILinkSub } from "./types";

const LinkSub: React.FC<ILinkSub> = ({ cx, classes, link,setOpened }: ILinkSub) => {
  const location = useLocation();
  return (
    <>
      <Anchor
        component={Link}
        className={cx(classes.link, {
          [classes.linkActive]:
            location.pathname === link.to ||
            (link.to !== "/" && location.pathname.indexOf(link.to) > -1),
        })}
        onClick={() => setOpened(false)}
        to={link.to}
      >
        {link.label}
      </Anchor>
    </>
  );
};
export { LinkSub };
