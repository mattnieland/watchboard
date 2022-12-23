// Mantine
import { Card, Image, Text, Button, Group } from "@mantine/core";
// Local - TypeScript Types
import { IFeedCard } from "./types";

const FeedCard: React.FC<IFeedCard> = ({
  buttonText,
  description,
  onClick,
  title,
  image,
}: IFeedCard) => {
  return (
    <>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image src={image} height={160} alt="Norway" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{title}</Text>
        </Group>

        <Text size="sm" color="dimmed">
          {description}
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          onClick={onClick}
          radius="md"
        >
          {buttonText}
        </Button>
      </Card>
    </>
  );
};

export { FeedCard };
