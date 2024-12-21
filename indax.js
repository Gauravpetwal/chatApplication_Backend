const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');
const syncmodel = require('./helpers/modelsync')
const socket = require('./controllers/socket')


const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST","delete","PUT"],
  },
});

app.use('/api', userRoute)
app.use('/api', messageRoute)

socket(io)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
