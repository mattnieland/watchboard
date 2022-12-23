// React
import React from "react";
// Mantine
import {
  UnstyledButton,
  Group,
  Avatar,
  Box,
  useMantineTheme,  
  Menu,
  createStyles,
} from "@mantine/core";
// Auth0
import { useAuth0 } from "@auth0/auth0-react";
import {
  IconUsers,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  item: {
    '&[data-hovered]': {
      backgroundColor: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
    },
  },
}));

const User: React.FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { user, logout } = useAuth0();    

  const handleLogout = () => {
    logout({ returnTo: window.location.origin + "/auth/logout" });
  };

  return (
    <>
      <Box>
        <Menu classNames={classes} transition="scale" position="top-end" width={200} offset={3} arrowPosition="center" withinPortal withArrow>
          <Menu.Target>
            <UnstyledButton
              sx={{
                display: "block",
                width: "100%",
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,
              }}
            >
              <Group>
                <Avatar src={user?.picture || ""} radius="xl" />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item              
              onClick={() => {
                handleLogout();
              }}
              icon={
                <IconUsers
                  size={16}                  
                  stroke={1.5}
                />
              }
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </>
  );
};

export { User };
