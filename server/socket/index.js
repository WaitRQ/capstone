module.exports = io => {
  io.on('connection', socket => {
    const roomId = socket.handshake.query.reservationId
    socket.join(`${roomId}`)
    console.log(`im in ${roomId}`)

    socket.on('disconnect', () => {
      console.log(`Chat in room ${roomId} ended`)
    })
  })
}
