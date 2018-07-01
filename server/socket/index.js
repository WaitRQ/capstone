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

    socket.on('new_message', async message => {
      const created = await Message.create(message)
      const fullData = await Message.findOne({
        where: {id: created.id},
        include: [
          {
            model: User,
            as: 'from'
          }
        ]
      })
      io.sockets.in(`${roomId}`).emit('messages', [fullData])
    })
    socket.on('disconnect', () => {
      console.log(`Chat in room ${roomId} ended`)
    })
  })
}
