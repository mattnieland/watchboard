// React
import { useCallback, useEffect, useState } from "react";
// Routing
import { Link, useLocation } from "react-router-dom";
// Mantine
import { Navbar, createStyles, useMantineTheme } from "@mantine/core";
// Global - Assets - Images
import imgBrandColor from "assets/img/brand-color.png";
import imgBrandWhite from "assets/img/brand-white.png";
// Local - Components
import { LinkMain } from "./components";
// Local - Data
import { appLinks } from "./data";
// Local - TypeScript Types
import { IMSNavLeft } from "./types";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  aside: {
    flex: "0 0 60px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: 60,
    paddingTop: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xs,
  },

  link: {
    boxSizing: "border-box",
    display: "block",
    textDecoration: "none",
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    lineHeight: "44px",
    transition: "all ease-in-out 0.2s",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : "#232B38",
      color: theme.colorScheme === "dark" ? theme.white : theme.white,
      textDecoration: "none",
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      backgroundColor:
        theme.colorScheme === "light" ? "#232B38" : theme.colors.gray[7],
      color: theme.white,
      textDecoration: "none",
    },
  },
}));

const MyNavLeft: React.FC<IMSNavLeft> = ({ opened,setOpened }: IMSNavLeft) => {
  const { classes, cx } = useStyles();
  const location = useLocation();
  const theme = useMantineTheme();

  const [active, setActive] = useState("Home");
  const [subLinks, setSubLinks] = useState<Array<any>>([]);

  const getSubLinks = useCallback(() => {
    const matchingLink = appLinks.find(
      (existingLink) => existingLink.label === active
    );
    if (matchingLink && matchingLink.links && subLinks !== matchingLink.links) {
      setSubLinks(matchingLink.links);
    }
  }, [active, subLinks]);

  useEffect(() => {
    getSubLinks();
  }, [active, getSubLinks]);

  useEffect(() => {
    const path = location.pathname;
    appLinks.forEach((mainLink) => {
      mainLink.links.forEach((subLink) => {
        if (subLink.to === path) {
          setActive(mainLink.label);
        }
      });
    });
  }, [location]);

  return (
    <>
      <Navbar hiddenBreakpoint="md">
        <Navbar.Section grow className={classes.wrapper}>
          <div
            className={classes.aside}
            style={{
              backgroundImage:
                "linear-gradient(238deg, rgb(59 18 141 / 3%) 23%, rgb(1 175 250 / 4%))",
            }}
          >
            <div className={classes.logo}>
              <Link to="/">
                <img
                  alt="Logo"
                  src={
                    theme.colorScheme === "dark" ? imgBrandWhite : imgBrandColor
                  }
                  style={{ height: 30 }}
                />
              </Link>
            </div>
            {appLinks.map((link) => {
              return (
                <LinkMain
                  active={active}
                  cx={cx}
                  classes={classes}
                  key={link.label}
                  link={link}
                  setActive={setActive}
                />
              );
            })}
          </div>
          {/* {subLinks.length > 0 && (
            <div className={classes.main}>
              <Title
                order={4}
                className={classes.title}
                style={{
                  backgroundImage:
                    "linear-gradient(238deg, rgb(59 18 141 / 3%) 23%, rgb(1 175 250 / 4%))",
                }}
              >
                {active}
              </Title>
              {subLinks.map((link) => (
                <LinkSub cx={cx} classes={classes} link={link} key={link.to} setOpened={setOpened} />
              ))}
            </div>
          )} */}
        </Navbar.Section>                  
      </Navbar>
    </>
  );
};

export { MyNavLeft };
