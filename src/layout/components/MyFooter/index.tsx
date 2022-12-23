// Mantine
import { Footer } from "@mantine/core";
// Icons
// import { IconHeart } from "@tabler/icons";

import { createStyles } from "@mantine/core";
// import {
//   IconBrandTwitter,
//   IconBrandYoutube,
//   IconBrandInstagram,
// } from "@tabler/icons";
// import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  // links: {
  //   [theme.fn.smallerThan("sm")]: {
  //     marginTop: theme.spacing.lg,
  //     marginBottom: theme.spacing.sm,
  //   },
  // },
}));

// const links = [
//   {
//     link: "/api",
//     label: "API",
//   },
//   {
//     link: "/support",
//     label: "Support",
//   },
//   {
//     link: "/terms-of-service",
//     label: "Terms of Service",
//   },
//   {
//     link: "/privacy-policy",
//     label: "Privacy Policy",
//   },
//   {
//     link: "/returns-and-refunds",
//     label: "Returns & Refunds",
//   },
// ];

const MyFooter: React.FC = () => {
  const { classes } = useStyles();
  // const items = links.map((link) => (
  //   <Anchor
  //     component={Link}
  //     color="dimmed"
  //     key={link.label}
  //     to={link.link}
  //     sx={{ lineHeight: 1 }}
  //     size="sm"
  //   >
  //     {link.label}
  //   </Anchor>
  // ));
  return (
    <>
      <Footer height={40} py={0} px="xs" style={{ display: "flex" }}>
        <div className={classes.inner}>
          {/* <Group>
            <Text size={12}>
              © 2022 Ohana Designs
            </Text>
          </Group> */}
          {/* <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
            <Group className={classes.links}>{items}</Group>
          </MediaQuery> */}
          {/* <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
            <Group spacing="xs" position="right" noWrap>
              <ActionIcon size={30} variant="default" radius="xl">
                <IconBrandTwitter size={15} stroke={1.5} />
              </ActionIcon>
              <ActionIcon size={30} variant="default" radius="xl">
                <IconBrandYoutube size={12} stroke={1.5} />
              </ActionIcon>
              <ActionIcon size={30} variant="default" radius="xl">
                <IconBrandInstagram size={12} stroke={1.5} />
              </ActionIcon>
            </Group>
          </MediaQuery> */}
        </div>
      </Footer>
    </>
  );
};

export { MyFooter };
