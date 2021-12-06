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

const eventSequence=[
  ()=>{
    socket.emit("omaha_request_join_omaha_room", {
      playerId: "uTUc6dzSrWfVE5ncbBWloTlhUGy1",
      roomId: "5d7a514b5d2c12c7449be022",
      chipsAmount: 10000,
      seatNo: 3,
    });
  },
  () => {
    socket.emit("omaha_request_join_omaha_room", {
      playerId: "z3Ea65zmolhR2Uvd6O2mKAeei8C3",
      roomId: "5d7a514b5d2c12c7449be022",
      chipsAmount: 10000,
      seatNo: 4,
    });
  },
  () => {
    socket.emit("omaha_request_handle_player_action", {
      playerId: "uTUc6dzSrWfVE5ncbBWloTlhUGy1",
      roomId: "5d7a514b5d2c12c7449be022",
      action: "CHECK",
      stage: "PRE_FLOP_BET",
    });
  },
  () => {
    socket.emit("omaha_request_handle_player_action", {
      playerId: "z3Ea65zmolhR2Uvd6O2mKAeei8C3",
      roomId: "5d7a514b5d2c12c7449be022",
      action: "CHECK",
      stage: "PRE_FLOP_BET",
    });
  },
  () => {
    socket.emit("omaha_request_handle_player_action", {
      playerId: "uTUc6dzSrWfVE5ncbBWloTlhUGy1",
      roomId: "5d7a514b5d2c12c7449be022",
      action: "CHECK",
      stage: "BET_ON_FLOPS",
    });
  },
  () => {
      socket.emit("omaha_request_handle_player_action", {
        playerId: "z3Ea65zmolhR2Uvd6O2mKAeei8C3",
        roomId: "5d7a514b5d2c12c7449be022",
        action: "CHECK",
        stage: "BET_ON_FLOPS",
      });
    },
   () => {
      socket.emit("omaha_request_handle_player_action", {
        playerId: "z3Ea65zmolhR2Uvd6O2mKAeei8C3",
        roomId: "5d7a514b5d2c12c7449be022",
        action: "CHECK",
        stage: "BET_ON_TURNS",
      });
    },
    () => {
      socket.emit("omaha_request_handle_player_action", {
        playerId: "uTUc6dzSrWfVE5ncbBWloTlhUGy1",
        roomId: "5d7a514b5d2c12c7449be022",
        action: "CHECK",
        stage: "FINAL_BET_ROUND",
      });
    },
    () => {
      socket.emit("omaha_request_handle_player_action", {
        playerId: "z3Ea65zmolhR2Uvd6O2mKAeei8C3",
        roomId: "5d7a514b5d2c12c7449be022",
        action: "CHECK",
        stage: "FINAL_BET_ROUND",
      });
    },
    () => {
      socket.emit("omaha_request_leave_omaha_room", {
        playerId: "uTUc6dzSrWfVE5ncbBWloTlhUGy1",
        roomId: "5d7a514b5d2c12c7449be022",
      });
    },
    () => {
      socket.emit("omaha_request_leave_omaha_room", {
        playerId: "z3Ea65zmolhR2Uvd6O2mKAeei8C3",
        roomId: "5d7a514b5d2c12c7449be022",
      });
    },
  ]

const delay=1000;
socket.on("connect", () => {
  console.log("connection successful");
  eventSequence.forEach((event,index)=>{
    setTimeout(event,index*delay);
  })
});

socket.on("*", (eventName, ...args) => {
  console.log("\n\n+++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  console.log("[+] received ->", eventName);
  args.forEach((arg) => {
    console.log(arg.message);
    console.dir(arg.data.eventData, { depth: null });
  });
  console.log("=========================================================\n\n");
});
