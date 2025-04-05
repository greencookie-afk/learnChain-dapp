import { Box, Heading, Text } from '@chakra-ui/react';

const MyCourses = () => {
  return (
    <Box>
      <Heading mb={4}>My Enrolled Courses</Heading>
      <Text>You haven't enrolled in any courses yet.</Text>
    </Box>
  );
};

export default MyCourses;