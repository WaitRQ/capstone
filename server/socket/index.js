const {Message, User} = require('../db/models')

module.exports = io => {
  io.on('connection', async socket => {
    const roomId = socket.handshake.query.reservationId
    socket.join(`${roomId}`)
    console.log(`Enter in room ${roomId}`)
    const historyMessages = await Message.findAll({
      where: {reservationId: roomId},
      include: [
        {
          model: User,
          as: 'from'
        }
      ]
      //order
    })
    socket.emit('messages', historyMessages)

    socket.on('room_messages', messages => {
      socket.emit('messages', messages)
    })

    socket.on('messages', messages => {
      // Message.create()
      socket.to(`${roomId}`).emit('room_messages', messages)
    })
    socket.on('disconnect', () => {
      console.log(`Chat in room ${roomId} ended`)
    })
  })
}
