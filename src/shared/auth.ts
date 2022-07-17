import { HttpStatus } from "@nestjs/common";
import { readFileSync } from "fs";
import { importPKCS8, JWTPayload, jwtVerify, KeyLike, SignJWT } from "jose";
import { Roles } from "./emuns/roles.enum";

export class Auth {

  userRole(role) {
    return this.getRole(role, Roles.USER);
  }

  adminRole(role) {
    return this.getRole(role, Roles.ADMIN);
  }

  canguRole(role) {
    return this.getRole(role, Roles.CANGURO);
  }

  getRole(userRole, role, next?: () => Promise<void>) {
    if (userRole !== role) {
      throw {
        status: HttpStatus.FORBIDDEN,
        message: "Forbidden"
      }
    }
    next();
  }

  async signToken(payload: JWTPayload) {
    const privateKey = await readFileSync("./src/config/privateKey").toString();
    const ecPrivateKey: KeyLike = await importPKCS8(privateKey, 'aes-256-cbc');

    const token = new SignJWT(payload)
      .setProtectedHeader({ alg: 'ES256' })
      .setIssuedAt()
      .setExpirationTime(process.env.EXPIRATIONTOKEN || '1h')
      .sign(ecPrivateKey);

      return token;
  }

  async verifyToke(jwt) {
    const publicKey = await readFileSync('../config/publicKey.pem');
    const { payload, protectedHeader } = await jwtVerify(jwt, publicKey);

  }
  
}