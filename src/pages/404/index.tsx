import { Group, Stack, Title } from "@mantine/core";
import img404 from "assets/img/404.png";
const Page404: React.FC = () => {
  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Group>
          <Stack>
            <Title align="center" order={1}>
              This Page
            </Title>
            <Title align="center" order={1}>
              Does Not Exist Yet
            </Title>
          </Stack>
          <img
            alt={img404}
            src={img404}
            style={{ maxWidth: "200px" }}
          />
        </Group>
      </div>
    </>
  );
};

export default Page404;
