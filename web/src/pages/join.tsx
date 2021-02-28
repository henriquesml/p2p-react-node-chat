import React, { useState } from 'react'
import { Grid, Flex, Button, Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Join: React.FC = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <Grid
      as="main"
      bg="gray.50"
      height="100vh"
      templateColumns="1fr 1fr 480px 1fr 1fr"
      templateRows="1fr 320px 1fr"
      templateAreas="
        '. . . . .'
        '. . form . .'
        '. . . . .'
      "
      justifyContent="center"
      alignItems="center"
    >

      <Flex 
        gridArea="form"
        height="100%"
        backgroundColor="white"
        borderWidth="1px"
        borderRadius="lg"
        flexDir="column"
        justifyContent="center"
        alignItems="stretch"
        padding={16}
      >
        <Input
          size="lg" 
          placeholder="Nome"
          onChange={(event) => setName(event.target.value)}
        />

        <Input
          size="lg"
          placeholder="Sala"
          marginTop={4}
          onChange={(event) => setRoom(event.target.value)}
        />
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <Button
            colorScheme="teal"
            size="lg"
            marginTop={6}
            width="100%"
          >
            ENTRAR
          </Button>
        </Link>
      </Flex>
    </Grid>
  )
}

export default Join
