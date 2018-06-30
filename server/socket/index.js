module.exports = io => {
  io.on('connection', socket => {
    const roomId = socket.handshake.query.reservationId
    socket.join(`${roomId}`)
    console.log(`Enter in room ${roomId}`)
    socket.emit('messages', [{from: 'CQY', text: 'history messages'}])
    socket.on('room_messages', messages => {
      socket.emit('messages', messages)
    })
    socket.on('messages', messages => {
      // TODO(zhangwen829), persist to database
      // Message.create()
      socket.to(`${roomId}`).emit('room_messages', messages)
    })
    socket.on('disconnect', () => {
      console.log(`Chat in room ${roomId} ended`)
    })
  })
}
