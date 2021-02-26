import { NextFunction, Request, Response } from "express";

export type APICallback = (req: Request, res: Response) => Promise<void>;

// export function APIWrapper(callback: APICallback) {
//   return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       await callback(req, res);
//       next();
//     } catch (e) {
//       next(e);
//     }
//   };


export function APIWrapper(target: object, propertyKey: string, descriptor: PropertyDescriptor) {
  descriptor.value = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req)
      // await callback(req, res);
      next();
    } catch (e) {
      next(e);
    }
  }


// export function APIWrapper() {
  // const originalMethod = descriptor.value;
  // console.log(descriptor)

  // console.log(this)

  // descriptor.value = async function (req: Request, res: Response, next: NextFunction, callback: APICallback) {
  //   try {
  //     await callback(req, res);
  //     next();
  //   } catch (e) {
  //     next(e);
  //   }
  //   // originalMethod.apply(this, [req, res, next, callback]);
  // }
  // return 'he'

  // return async (req: Request, res: Response, next: NextFunction, target: APICallback): Promise<void> => {
  //   try {
  //     await target(req, res);
  //     next();
  //   } catch (e) {
  //     next(e);
  //   }
  // };
}

// export function APIDecorator() {
//   return async function (req: Request, res: Response, next: NextFunction, target: APICallback): Promise<void> {
//     try {
//       await target(req, res);
//       next();
//     } catch (e) {
//       next(e);
//     }
//   };
// }
