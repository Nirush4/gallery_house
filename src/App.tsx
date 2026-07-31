import { TextInput, Title, Text } from "@mantine/core";

function App() {
  return (
    <>
      <Title order={1}>Hei</Title>
      <TextInput
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
      />
      <Text c="red">Welcome to the website</Text>
    </>
  );
}

export default App;
