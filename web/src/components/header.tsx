import React from 'react'
import { Flex, Kbd } from '@chakra-ui/react'

type Props = {
  room: string
}

const Header: React.FC<Props> = ({ room }) => {
  return (
    <Flex
      gridArea="header"
      width="100%"
      height="100%"
      bg="teal.500"
      borderTopRadius="lg"
      paddingLeft="16"
      paddingRight="16"
      alignItems="center"
    >
      <Kbd
        size="lg"
      >
        Sala: {room}  
      </Kbd>
    </Flex>
  )
}

export default Header
