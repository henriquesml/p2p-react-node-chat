import React, { useEffect, useState, useReducer, useRef } from 'react'
import { Grid, Flex, Input, IconButton, Box } from '@chakra-ui/react'
import { FaPaperPlane } from 'react-icons/fa'
import queryString from 'query-string'
import Gun from 'gun'
import { MessageType, State, MessageProps } from '../types'
import { Header, Message } from '../components'

const gun = Gun({
  peers: [
    'http://localhost:3030/gun'
  ]
})

const initialState = {
  messages: []
}

function reducer(state: State, message: MessageType) {
  return {
    messages: [message, ...state.messages]
  }
}

const Chat: React.FC<MessageProps> = ({ location }) => {
  const [author, setAuthor] = useState<string | string[] | null>('')
  const [room, setRoom] = useState<string | string[] | null>('')
  const [message, setMessage] = useState<string>('')
  const [state, dispatch] = useReducer(reducer, initialState)

  const messagesEndRef = useRef(null) as React.RefObject<HTMLDivElement>

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    setRoom(room)
    setAuthor(name)

    const messages = gun.get(room).get('messages')
    messages.map().on((message: any) => {
      dispatch({
        author: message.author,
        message: message.message,
        createdAt: message.createdAt
      })
    })
  }, [location.search])

  useEffect(() => {
    scrollToBottom()
  }, [state])

  function saveMessage() {
    const messages: any = gun.get(room).get('messages')
    messages.set({
      author: author,
      message: message,
      createdAt: Date.now()
    })
    setMessage('')
  }

  return (
    <Grid
      as="main"
      bg="#d9dbd3"
      height="100vh"
      templateColumns="1fr 1fr 80% 1fr 1fr"
      templateRows="1fr 800px 1fr"
      templateAreas="
        '. . . . .'
        '. . chatDiv . .'
        '. . . . .'
      "
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        gridArea="chatDiv"
        height="100vh"
        templateColumns="1fr"
        templateRows="50px 1fr 100px"
        maxWidth="80vw"
        templateAreas="
          'header'
          'messages'
          'send'
        "
        justifyContent="center"
        alignItems="center"
        padding="16"
      >
       
        <Header room={String(room)}/>
        <Flex
          gridArea="messages"
          flexDir="column"
          position="relative"
          bg="#f8f9fa"
          maxHeight="702px"
          float="left"
          width="100%"
          height="702px"
          overflow="hidden"
          overflowY="auto"
          paddingLeft="16"
          paddingRight="16"
        >
          { 
            state.messages.sort((a,b) => Number(a.createdAt) - Number(b.createdAt)).map((message) => (
              <Message key={message.createdAt} message={message} currentUser={message.author === author} />
            ))
          }
          <Box ref={messagesEndRef} />
        </Flex>

        <Flex
          gridArea="send"
          height="100%"
          alignItems="center"
          justifyContent="space-between"
          bg="#f0f0f0"
          padding="16"
          borderBottomRadius="lg"
        >
          <Input
            width="calc(100% - 80px)"
            size="lg" 
            placeholder="Digite algo..."
            onChange={(event) => setMessage(event.target.value)}
            value={message}
            bg="#fff"
          />
          <IconButton
            size="lg"
            colorScheme="teal"
            aria-label="Enviar"
            icon={<FaPaperPlane />}
            onClick={saveMessage}
          />
        </Flex>
      </Grid>
    </Grid>
  )
}

export default Chat
