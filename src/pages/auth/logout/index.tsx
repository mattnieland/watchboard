// Mantine
import {
  createStyles,
  Paper,
  Title,
  Button,
  Container,
  Group,
} from "@mantine/core";
// Auth0
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

const PageAuthLogin: React.FC = () => {
  const { classes } = useStyles();
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <Container size={460} my={300}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Log out successful!
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <Group position="apart" className={classes.controls}>
          <Button
            fullWidth            
            onClick={() => {
              handleLogin();
            }}
          >
            Log back in
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default PageAuthLogin;
