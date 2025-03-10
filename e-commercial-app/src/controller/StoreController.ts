import Category from "../models/Category";
import Store from "../models/Store";
import User from "../models/User";
import { Utils } from "../utils/Utils";


export class StoreController {
  static async addStore(req, res, next) {
    const store = req.body;
    //const path = req.file.path;
    const verification_token = Utils.generateVerificationToken();
    try {
      //create store user
      const hash = await Utils.encryptPassword(store.password);
      const data= {
        email: store.email,
        verification_token,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
        password: hash,
        phone: store.phone,
        name: store.name,
        type: "store",
        status: "active",
      };

      const user = await new User(data).save();

      //create store
      let store_data: any = {
        name: store.store_name,
        location: JSON.parse(store.location),
        address: store.address,
        status: store.status,
        city_id: store.city_id,
        user_id: user._id,
        // ...(req.file && { cover: req.file.path }),
        // ...(store.description && { description: store.description }),
        // ...(store.openTime && { openTime: store.openTime }),
        // ...(store.closeTime && { closeTime: store.closeTime }), 
      };
      if (req.file) {
        store_data.cover = req.file.path;
      }
      if (store.description)
        store_data = {
          ...store_data,
          description: store.description,
        };
        if (store.openTime)
          store_data = {
            ...store_data,
            openTime: store.openTime,
          };
          if (store.closeTime)
            store_data = {
              ...store_data,
              closeTime: store.closeTime,
            };
      //if(store.cover)
      const storeDoc = await new Store(store_data).save();
     
      res.send(storeDoc);
      console.log(storeDoc)
    } catch (e) {
      next(e);
    }
  }
  
  static async searchStores(req, res, next) {
    // const METERS_PER_KM = 63781;
    const data = req.query;
    const perPage = 10;
    const currentPage = parseInt(req.query.page) || 1;
    const prevPage = currentPage === 1 ? null : currentPage - 1;
    let nextPage = currentPage + 1;

    try {
      const store_doc_count = await Store.countDocuments({
        status: "active",
        name: { $regex: data.name, $options: "i" },
      });
      console.log(store_doc_count);
      //send empty arrAy if no document on filfter query exist
      if (!store_doc_count) {
        return res.json({
          stores: [],
          perPage,
          currentPage,
          prevPage,
          nextPage: null,
          totalPages: 0,
        });
      }
      const totalPages = Math.ceil(store_doc_count / perPage);

      if (totalPages === 0 || totalPages === currentPage) {
        nextPage = 0;
      }
      if (totalPages < currentPage) {
        throw new Error("No more Orders available");
      }

      const stores = await Store.find({
        name: { $regex: data.name, $options: "i" }
      })
        .skip(perPage * (currentPage - 1))
        .limit(perPage);

      return res.json({
        stores,
        perPage,
        currentPage,
        prevPage,
        nextPage,
        totalPages,
      });

      console.log("Query parameters:", data);
      console.log("stores found:", stores);
    } catch (e) {
      console.error("Error fetching stores:", e);
      next(e);
    }
  }

  static async getAllStores(req, res, next) {
    const METERS_PER_KM = 63781;
    const data = req.query;
    const perPage = 15;
    const currentPage = parseInt(req.query.page) || 1;
    const prevPage = currentPage === 1 ? null : currentPage - 1;
    let nextPage = currentPage + 1;
    const store_doc_count = await Store.countDocuments({
      //status: "active",
      name: { $regex: data.name, $options: "i" },
      // location: {
      //   $nearSphere: {
      //     $geometry: {
      //       type: "Point",
      //       coordinates: [parseFloat(data.lat), parseFloat(data.long)],
      //     },
      //     $maxDistance: data.radius * METERS_PER_KM,
      //   },
      //   // $geoWithin: {
      //   //     $centerSphere: [
      //   //         [parseFloat(data.long), parseFloat(data.lat)],
      //   //         parseFloat(data.radius) / METERS_PER_KM,
      //   //     ],
      //   // },
      // },
    });
    if (!store_doc_count) {
      return res.json({
        stores: [],
        perPage,
        currentPage,
        prevPage,
        nextPage: null,
        totalPages: 0,
      });
    }

    const totalPages = Math.ceil(store_doc_count / perPage);

    if (totalPages === 0 || totalPages === currentPage) {
      nextPage = 0;
    }
    if (totalPages < currentPage) {
      // throw new Error('No more Orders available');
      return res.json({
        message: "No more stores available on this page.",
        stores: [],
        perPage,
        currentPage,
        prevPage,
        nextPage: null,
        totalPages,
      });
    }
    try {
      const stores = await Store.find({
        status: "active",
        name: { $regex: data.name, $options: "i" },
        location: {
          $nearSphere: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(data.lat), parseFloat(data.long)],
            },
            $maxDistance: data.radius * METERS_PER_KM,
          },
          //   $geoWithin: {
          //     $centerSphere: [
          //       [parseFloat(data.long), parseFloat(data.lat)],
          //       parseFloat(data.radius) / METERS_PER_KM
          //     ]

          //  }
        },
      })
        .skip(perPage * (currentPage - 1))
        .limit(perPage);

      res.json({
        stores,
        perPage,
        currentPage,
        prevPage,
        nextPage,
        totalPages,
      });
      console.log("Query parameters:", data);
      console.log({
        status: "active",
        location: {
          $geoWithin: {
            $centerSphere: [
              [parseFloat(data.long), parseFloat(data.lat)],
              parseFloat(data.radius) / METERS_PER_KM,
            ],
          },
        },
      });
      //console.log("stores found:", stores);
      //res.send(stores);
    } catch (e) {
      console.error("Error fetching stores:", e);
      next(e);
    }
  }
  static async getStores(req, res, next) {
    try {
      const stores = await Store.find({
        status: "active",
      });
      res.send(stores);
    } catch (e) {
      console.error("Error fetching stores:", e);
      next(e);
    }
  }
}
