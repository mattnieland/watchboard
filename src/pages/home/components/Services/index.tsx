import { FormattedMessage } from "react-intl";
import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
} from "@mantine/core";
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCashBanknote,
  IconCoin,
} from "@tabler/icons";

const mockdata = [
  { title: "Credit Cards", icon: IconCreditCard, color: "violet" },
  { title: "ACH Accounts", icon: IconBuildingBank, color: "indigo" },
  { title: "Terms", icon: IconRepeat, color: "blue" },
  { title: "Refunds", icon: IconReceiptRefund, color: "green" },
  { title: "Receipts", icon: IconReceipt, color: "teal" },
  { title: "Taxes", icon: IconReceiptTax, color: "cyan" },
  { title: "Reports", icon: IconReport, color: "pink" },
  { title: "Payments", icon: IconCoin, color: "red" },
  { title: "Cashback", icon: IconCashBanknote, color: "orange" },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: `${theme.shadows.md} !important`,
      transform: "scale(1.05)",
    },
  },
}));

const Services: React.FC = () => {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group position="apart">
        <Text className={classes.title}>
          <FormattedMessage
            id="financialServices"
            defaultMessage="Financial Services"
          />
        </Text>
        <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
          + 2 other services
        </Anchor>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
};
export { Services };
