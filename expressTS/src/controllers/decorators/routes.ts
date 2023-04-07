import 'reflect-metadata';
import { Method } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { RequestHandler } from 'express';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
};

function routeBinder(method: string) {
  return function (path: string) {
    return function(target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
};

export const get = routeBinder(Method.get);
export const put = routeBinder(Method.put);
export const post = routeBinder(Method.post);
export const del = routeBinder(Method.del);
export const patch = routeBinder(Method.patch);