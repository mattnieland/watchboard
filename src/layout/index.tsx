// React
import { useState } from "react";
// Routing
import { Outlet } from "react-router-dom";
// Mantine
import {
  AppShell,  
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,  
} from "@mantine/core";
// Local - Components
import { MyNavLeft, MyFooter, MyHeader } from "./components";

const Layout: React.FC = () => {
  const [opened, setOpened] = useState(false);

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: colorScheme,
            fontFamily: "'Poppins', sans-serif",
            fontFamilyMonospace: "'Space Mono', monospace",
            headings: { fontFamily: "'Poppins', sans-serif" },
          }}
        >
          <AppShell
            navbarOffsetBreakpoint="md"
            asideOffsetBreakpoint="md"
            navbar={<MyNavLeft opened={opened} setOpened={setOpened} />}
            // aside={
            //   <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            //     <Aside
            //       px="md"
            //       hiddenBreakpoint="md"
            //       width={{ sm: 200, lg: 300 }}
            //       style={{
            //         backgroundImage:
            //           "linear-gradient(238deg, rgb(59 18 141 / 3%) 23%, rgb(1 175 250 / 4%))",
            //         zIndex: 1,
            //       }}
            //     >
            //       <ScrollArea>
            //         <MyFeed />
            //       </ScrollArea>
            //     </Aside>
            //   </MediaQuery>
            // }
            footer={<MyFooter />}
            header={
              <MyHeader
                colorScheme={colorScheme}
                opened={opened}
                setOpened={setOpened}
                toggleColorScheme={() => {
                  toggleColorScheme();
                }}
              />
            }
          >
            <Outlet />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default Layout;
