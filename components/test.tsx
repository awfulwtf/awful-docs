import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function TestComponent() {
  return (
    <Flex
      as={motion.div}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.99 }}
      p="4"
      bg="gray"
      rounded="md"
      boxShadow="dark-lg"
      cursor="pointer"
    >
      <Text fontWeight="semibold" fontSize="lg" color="white">
        Hello cute men!
      </Text>
    </Flex>
  );
}
