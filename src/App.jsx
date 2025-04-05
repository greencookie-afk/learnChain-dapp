import { ChakraProvider, Box, Heading, Flex, Spacer } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import WalletConnect from './components/WalletConnect';
import CourseList from './components/CourseList';
import MyCourses from './components/MyCourses';

function App() {
  return (
    <ChakraProvider>
      <WalletProvider>
        <Router>
          {/* Header */}
          <Flex p={4} bg="gray.800" color="white" align="center">
            <Heading size="md">
              <Link to="/">LearnChain</Link>
            </Heading>
            <Spacer />
            <Flex gap={4} align="center">
              <Link to="/my-courses">My Courses</Link>
              <WalletConnect />
            </Flex>
          </Flex>

          {/* Main Content */}
          <Box p={6}>
            <Routes>
              <Route path="/" element={<CourseList />} />
              <Route path="/my-courses" element={<MyCourses />} />
            </Routes>
          </Box>
        </Router>
      </WalletProvider>
    </ChakraProvider>
  );
}

export default App;
