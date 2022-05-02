import {
  useMantineTheme,
  Modal,
  Paper,
  Center,
  Group,
  TextInput,
  Image,
  Button,
  Select,
  AspectRatio,
  Box,
  Text,
  Grid,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Apps } from 'tabler-icons-react';
import { ServiceType, ServiceTypeList } from '../../tools/types';

export default function AddItemShelfItem(props: any) {
  const { additem: addItem } = props;
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      type: 'Other',
      name: '',
      icon: '',
      url: '',
    },

    validationRules: {},
  });
  return (
    <>
      <Modal
        size="xl"
        radius="lg"
        opened={props.opened || opened}
        onClose={() => setOpened(false)}
        title="Add a service"
      >
        <Center>
          <Image
            height={120}
            width={120}
            src={form.values.icon}
            alt="Placeholder"
            withPlaceholder
          />
        </Center>
        <form
          onSubmit={form.onSubmit(() => {
            addItem(form.values);
            setOpened(false);
            form.reset();
          })}
        >
          <Group direction="column" grow>
            <TextInput
              required
              label="Service name"
              placeholder="Plex"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              error={form.errors.name && 'Invalid name'}
            />

            <TextInput
              required
              label="Icon url"
              placeholder="https://i.gifer.com/ANPC.gif"
              value={form.values.icon}
              onChange={(event) => {
                form.setFieldValue('icon', event.currentTarget.value);
              }}
              error={form.errors.icon && 'Icon url is invalid'}
            />
            <TextInput
              required
              label="Service url"
              placeholder="http://localhost:8989"
              value={form.values.url}
              onChange={(event) => form.setFieldValue('url', event.currentTarget.value)}
              error={form.errors.icon && 'Icon url is invalid'}
            />
            <Select
              label="Select the type of service (used for API calls)"
              defaultValue="Other"
              placeholder="Pick one"
              value={form.values.type}
              required
              searchable
              onChange={(value) => form.setFieldValue('type', value ?? 'Other')}
              data={ServiceTypeList}
            />
          </Group>

          <Group grow position="center" mt="xl">
            <Button type="submit">Add service</Button>
          </Group>
        </form>
      </Modal>
      <AspectRatio
        style={{
          minHeight: 120,
          minWidth: 120,
        }}
        ratio={4 / 3}
      >
        <Box
          sx={{
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            textAlign: 'center',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
            },
          }}
        >
          <Group direction="column" position="center">
            <motion.div whileHover={{ scale: 1.2 }}>
              <Apps style={{ cursor: 'pointer' }} onClick={() => setOpened(true)} size={60} />
            </motion.div>
            <Text>Add Service</Text>
          </Group>
        </Box>
      </AspectRatio>
    </>
  );
}
