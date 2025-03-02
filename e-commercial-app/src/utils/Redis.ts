import { createClient } from "redis";
import { getEnvironmentVariables } from "../enviroments/environment";

// const client = createClient({
//  // url:'redis://' + getEnvironmentVariables().redis.host +':' + getEnvironmentVariables().redis.port,
//    url:'redis://default:X9lOtEQ5XMQVmeWYTZToMmTxFEQDZA9x@redis-17563.c341.af-south-1-1.ec2.redns.redis-cloud.com:17563',
//   username: getEnvironmentVariables().redis.username,
//   password: getEnvironmentVariables().redis.password,
//   socket: {
//     host: getEnvironmentVariables().redis.host,
//     port: parseInt(getEnvironmentVariables().redis.port, 10),
//   },
// });
const client = createClient({
// url:'redis://' + getEnvironmentVariables().redis.host +':' + getEnvironmentVariables().redis.port,
url:'redis://default:X9lOtEQ5XMQVmeWYTZToMmTxFEQDZA9x@redis-17563.c341.af-south-1-1.ec2.redns.redis-cloud.com:17563',
  username: getEnvironmentVariables()?.redis?.username,
  password: getEnvironmentVariables()?.redis?.password,
  socket: {
    host: getEnvironmentVariables()?.redis?.host ?? 'default-host',
    port: parseInt(getEnvironmentVariables()?.redis?.port ?? '6379', 10),
  },
});


export class Redis {
  static conncectToRedis() {
    client.on("error", (err) => console.log("Redis Client Error", err));
    client
      .connect()
      .then(() => {
        console.log("connected to redis");
      })
      .catch((e) => {
        throw e;
      });
  }
  static async setValue(key, value, expires_at?) {
    try {
      let options: any = {};
      if (expires_at) {
        options = {
          EX: expires_at,
        };
      }
      client.set(key, value, options);
    } catch (e) {
      console.log(e);
      throw "server not connected,please try again";
    }
  }

  static async getValue(key) {
    try {
      const value = await client.get(key);
      return value;
    } catch (e) {
      console.log(e);
      throw "Your session has expired,please login again!";
    }
  }

  static async deleteKey(key: string) {
    await client.del(key);
    try {
      await client.del(key);
    } catch (e) {
      console.log(e);
      throw "server not connected,please try again";
    }
  }
}
