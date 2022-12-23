// Routing
import { Link } from "react-router-dom";
// Mantine
import {
  ActionIcon,  
  Group,
  Header,
  MediaQuery,
  SimpleGrid,
  useMantineTheme,
} from "@mantine/core";
// Icons
import { IconSun, IconMoonStars } from "@tabler/icons";
// Global - Assets - Images
import imgBanner from "assets/img/logo-banner.svg";
import imgBannerDark from "assets/img/logo-banner-dark.svg";
// Global - Components
// import { LanguagePicker } from "components";
// Local - TypeScript Types
import { IMyHeader } from "./types";
// import { User } from "./components";

const MyHeader: React.FC<IMyHeader> = ({
  colorScheme,  
  setOpened,
  toggleColorScheme,
}: IMyHeader) => {
  const theme = useMantineTheme();
  return (
    <>
      <Header
        height={65}
        p="md"
        style={theme.colorScheme === "dark" ? {
          backgroundImage: "linear-gradient(90deg, rgba(36,70,85,1) 8%, rgba(255,255,255,1) 100%)",
        } : {backgroundImage: "linear-gradient(90deg, rgba(255,255,255,1) 8%, rgba(36,70,85,1) 100%)"}}
      >
        <SimpleGrid cols={3}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Group position="left">
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <Link
                  to="/"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <Group position="apart">
                    <img
                      alt="Logo"
                      src={
                        theme.colorScheme === "dark"
                          ? imgBannerDark
                          : imgBanner
                      }
                      style={{ height: 30 }}
                    />
                  </Group>
                </Link>
              </MediaQuery>
            </Group>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Group position="apart">
                <Link
                  to="/"
                  onClick={() => {
                    setOpened(false);
                  }}
                >
                  <img
                    alt="Logo"
                    src={
                      theme.colorScheme === "dark"
                        ? imgBannerDark
                        : imgBanner
                    }
                    style={{ height: 35 }}
                  />
                </Link>
              </Group>
            </MediaQuery>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Group position="right">
              <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
                <div>
                  {/* <LanguagePicker /> */}
                </div>
              </MediaQuery>
              <ActionIcon
                variant="default"
                onClick={() => {
                  toggleColorScheme();
                }}
                size={35}
              >
                {colorScheme === "dark" ? (
                  <IconSun size={16} />
                ) : (
                  <IconMoonStars size={16} />
                )}
              </ActionIcon>
              {/* <User /> */}
            </Group>
          </div>
        </SimpleGrid>
      </Header>
    </>
  );
};

export { MyHeader };
