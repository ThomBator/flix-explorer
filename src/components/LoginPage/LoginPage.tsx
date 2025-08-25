import {
  Button,
  Group,
  TextInput,
  Flex,
  Card,
  Title,
  Text,
  Container,
  PasswordInput,
} from "@mantine/core";
import { useNavigate, Link } from "react-router";
import { useForm } from "@mantine/form";
import { useAuth, useUser } from "@/store/userContext";

function LoginPage() {
  const authFn = useAuth();
  const { user } = useUser();
  console.log("User in login", user);
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      // will change this to 8 in prod, 4 makes testing easier
      password: (v) => (v.length >= 4 ? null : "Password must be 4 characters"),
    },
  });

  if (user) {
    navigate("/");
  }

  return (
    <Container>
      <Flex direction="column" align="center" justify="center">
        <Title order={1}>Login</Title>
        <Text ta="center" c="dimText" mt={5}>
          Need an account, <Link to={"/signup"}>sign up here!</Link>
        </Text>
        <Card w={{ base: "100%", sm: "50%" }}>
          <form onSubmit={form.onSubmit((values) => authFn(values))}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Enter a password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />

            <Group justify="center" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Card>
      </Flex>
    </Container>
  );
}

export default LoginPage;
