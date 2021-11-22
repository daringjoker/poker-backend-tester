const io = require("socket.io-client");

url = "http://localhost:3007/";

socket = io(url);

let onevent = socket.onevent;
socket.onevent = function (packet) {
  var args = packet.data || [];
  onevent.call(this, packet); // original call
  packet.data = ["*"].concat(args);
  onevent.call(this, packet); // additional call to catch-all
};

let emit = socket.emit;
// socket.emit = (eventName, ...args) => {
//   emit(eventName, ...args);
//   console.log("\n\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
//   console.log("[+] sent ->", eventName);
//   args.forEach((arg) => {
//     console.dir(arg, { depth: null });
//   });
//   console.log("=========================================================\n\n");
// };

socket.on("connect", () => {
  console.log("connection successful");
  //   socket.emit("get_omahaRooms", {});

  socket.emit("join_omaharoom", {
    playerId: "uTUc6dzSrWfVE5ncbBWloTlhUGy1",
    roomId: "5d7a514b5d2c12c7449be022",
    seatNo: 3,
  });
  setTimeout(() => {
    socket.emit("join_omaharoom", {
      playerId: "z3Ea65zmolhR2Uvd6O2mKAeei8C3",
      roomId: "5d7a514b5d2c12c7449be022",
      seatNo: 4,
    });
  }, 2000);

  setTimeout(() => {
    socket.emit("leave_omahaRoom", {
      playerId: "uTUc6dzSrWfVE5ncbBWloTlhUGy1",
      roomId: "5d7a514b5d2c12c7449be022",
    });
  }, 5000);

  setTimeout(() => {
    socket.emit("leave_omahaRoom", {
      playerId: "z3Ea65zmolhR2Uvd6O2mKAeei8C3",
      roomId: "5d7a514b5d2c12c7449be022",
    });
  }, 8000);
});

socket.on("*", (eventName, ...args) => {
  console.log("\n\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log("[+] received ->", eventName);
  args.forEach((arg) => {
    console.dir(arg, { depth: null });
  });
  console.log("=========================================================\n\n");
});
