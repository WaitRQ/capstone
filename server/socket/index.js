const {Message, User} = require('../db/models')

module.exports = io => {
  io.on('connection', async socket => {
    const roomId = socket.handshake.query.reservationId
    socket.join(`${roomId}`)
    console.log(`Enter in room ${roomId}`)
    const historyMessages = await Message.findAll({
      where: {
        reservationId: roomId
      },
      order: [['createdAt']],
      include: [
        {
          model: User,
          as: 'from'
        }
      ]
    })
    socket.emit('messages', historyMessages)

    // socket.on('room_messages', messages => {
    //   console.log('in room messages', messages)
    //   socket.emit('messages', messages)
    // })

    socket.on('new_message', message => {
      console.log(message)
      Message.create(message)
      io.sockets.in(`${roomId}`).emit('messages', [message])
    })
    socket.on('disconnect', () => {
      console.log(`Chat in room ${roomId} ended`)
    })
  })
}
