import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { MessageType } from '../types'
import { dateFormatting } from '../utils'

type Props = {
  message: MessageType
  currentUser: boolean
}

const Message: React.FC<Props> = ({ message, currentUser, ...rest }) => {
  return (
    <Box
      display="flex"
      mt="2"
      mb="2"
      justifyContent={currentUser ? 'flex-end' : 'flex-start'}
      alignItems="flex-start"
      {...rest}
    >
      <Box maxW="calc(100% - 250px)" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box p="4">
          <Box d="flex" alignItems="baseline">
            <Button colorScheme="teal" variant="link">
              {message.author}
            </Button>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            color="gray.700"
            lineHeight="tight"
          >
            {message.message}
          </Box>

          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            marginTop="2"
          >
            {dateFormatting(message.createdAt)}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Message