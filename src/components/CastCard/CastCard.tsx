import { BASE_URL } from "@/utilities/baseURL";
import { Card, Title, Text, Image } from "@mantine/core";
import Logo from "@/assets/FlixExplorerLogoNoText.png";

function CastCard({ castMember }) {
  const posterURI = castMember.profile_path
    ? BASE_URL + castMember.profile_path
    : Logo;

  return (
    <Card w={150} pt={0} px={0} pb={2} bg="var(--mantine-color-body)">
      <Image
        h={250}
        src={posterURI}
        radius="md"
        fit="cover"
        pt={0}
        mt={0}
        alt={`${castMember.name} as ${castMember.character}`}
      />

      <Title order={3} pt={5} size={"sm"} mt={1}>
        {castMember.name}
      </Title>
      <Text c="dimText" size={"sm"}>
        As {castMember.character}
      </Text>
    </Card>
  );
}

export default CastCard;
