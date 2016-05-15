'use strict';

export default function (mes) {
  if (NODE_ENV == 'development') {
    console.dir(mes);
  }
  alert(`Welcome ${mes}`);
} 