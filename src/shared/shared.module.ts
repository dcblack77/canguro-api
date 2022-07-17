import { Module } from '@nestjs/common';
import { generateKeyPair } from 'crypto';
import { appendFile, appendFileSync, writeFile } from 'fs';
import { Auth } from './auth';
import { ErrorsResponse } from './errors';
import { Utils } from './utils';

@Module({
  providers: [Auth, Utils, ErrorsResponse],
  exports: [Auth, Utils, ErrorsResponse]
})
export class SharedModule {

  puKey;
  priKey;

  constructor() {
    this.generateCertificate();
  }

  generateCertificate() {
    generateKeyPair('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'top secret'
      }
    }, async (err, publicKey, privateKey) => {

      writeFile('./src/config/publicKey.pem', publicKey, function (err) {
        if (err) throw err;
      });

      writeFile('./src/config/privateKey', privateKey, function (err) {
        if (err) throw err;
      });
    });
  }
}
