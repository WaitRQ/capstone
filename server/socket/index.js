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
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'from'
        }
      ]
    })
    socket.emit('messages', historyMessages)

    socket.on('room_messages', messages => {
      socket.emit('messages', messages)
    })

    socket.on('new_message', messages => {
      Message.create({messages})
      socket.to(`${roomId}`).emit('room_messages', messages)
    })
    socket.on('disconnect', () => {
      console.log(`Chat in room ${roomId} ended`)
    })
  })
}
