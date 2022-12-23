// Mantine
import {
  createStyles,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
// Local - TypeScript Types
import { ILinkMain } from "./types";

const useStyles = createStyles((theme) => ({
  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
    transition: "all ease-in-out 0.2s",
  },

  mainLinkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.gray[8]
          : "#232B38",
      // backgroundImage:
      //   theme.colorScheme === "light"
      //     ? "linear-gradient(168deg, rgb(35,43,56) 23%, rgb(0,171,186))"
      //     : "",
      color: theme.colorScheme === "dark" ? theme.white : theme.white,
    },
  },
}));

const LinkMain: React.FC<ILinkMain> = ({
  active,
  link,
  setActive,
}: ILinkMain) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { classes, cx } = useStyles();
  return (
    <>
      <Tooltip
        color={theme.colorScheme === "dark" ? "grey" : "#232B38"}
        label={link.label}
        position="right"
        withArrow
        transitionDuration={0}
        key={link.label}
      >
        <UnstyledButton
          onClick={() => {
            setActive(link.label);
            navigate(link.links[0].to);
          }}
          className={cx(classes.mainLink, {
            [classes.mainLinkActive]: link.label === active,
          })}
        >
          <link.icon stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    </>
  );
};
export { LinkMain };
