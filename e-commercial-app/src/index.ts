// import { Server } from "./server";

import { Server } from "./server";

let server = new Server().app;
let port = process.env.PORT || 3000;
process.env.TZ = "Johannesburg";
server.listen(port, () => {
  console.log(`server is running at port  ${port}`);
});

// function next() {
//   throw new Error("Function not implemented.");
// }
// // app.post()
// // app.put()
// // app.patch()
// // app.delete()

// export class Index{
// private server = new Server().app;
// private port =process.env.PORT || 3000
// int(){
//   this.server.listen(this.port,()=>{
//     console.log(`Server is runnin at port ${this.port}`)
//   })
// }
// }