// Routing
import { Link } from "react-router-dom";
// Mantine
import {
  ActionIcon,  
  Burger,  
  Group,
  Header,
  MediaQuery,
  SimpleGrid,
  useMantineTheme,
} from "@mantine/core";
import { openSpotlight } from "@mantine/spotlight";
// Icons
import { IconSearch, IconSun, IconMoonStars } from "@tabler/icons";
// Global - Assets - Images
import imgBanner from "assets/img/logo-banner.svg";
import imgWhite from "assets/img/name-white.png";
// Global - Components
// import { LanguagePicker } from "components";
// Local - TypeScript Types
import { IMyHeader } from "./types";
import { User } from "./components";

const MyHeader: React.FC<IMyHeader> = ({
  colorScheme,
  opened,
  setOpened,
  toggleColorScheme,
}: IMyHeader) => {
  const theme = useMantineTheme();
  return (
    <>
      <Header
        height={75}
        p="md"
        style={{
          backgroundImage:
            "linear-gradient(238deg, rgb(59 18 141 / 3%) 23%, rgb(1 175 250 / 4%))",
        }}
        sx={{  
          '@media (max-width: 769px)': {
            height: 70,
          },
        }}
      >
        <SimpleGrid cols={3}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Group position="left">
              <MediaQuery largerThan="md" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((previous) => !previous)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
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
                          ? imgWhite
                          : imgBanner
                      }
                      style={{ height: 30 }}
                    />
                    {/* <Badge
                      sx={{
                        border: "1px solid #e8e8e8",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                      color="violet"
                      variant="light"
                    >
                      B2B Supply Chain
                    </Badge> */}
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
                        ? imgWhite
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
              <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                <ActionIcon
                  color={theme.colorScheme === "dark" ? "cyan" : "violet"}
                  variant="outline"
                  onClick={() => {
                    openSpotlight();
                  }}
                  size={35}
                >
                  <IconSearch size={16} />
                </ActionIcon>
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
              <User />
            </Group>
          </div>
        </SimpleGrid>
      </Header>
    </>
  );
};

export { MyHeader };
