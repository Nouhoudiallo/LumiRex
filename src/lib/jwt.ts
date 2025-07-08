import { SignJWT, jwtVerify } from "jose";

export interface JwtUserPayload {
  id: string;
  email: string;
  role: string; // 'USER' | 'ADMIN'
}

export class JwtUtil {
  private static secret = process.env.JWT_SECRET!;

  /**
   * Génère un token JWT pour un utilisateur donné.
   */
  static async generateToken(user: JwtUserPayload, expiresIn: string = "7d"): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const secret = new TextEncoder().encode(this.secret);
    // expiresIn en secondes
    const expires = Math.floor(Date.now() / 1000) + this.parseExpiresIn(expiresIn);
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(expires)
      .sign(secret);
  }

  /**
   * Vérifie et décode un token JWT.
   */
  static async verifyToken(token: string): Promise<JwtUserPayload | null> {
    try {
      const secret = new TextEncoder().encode(this.secret);
      const { payload } = await jwtVerify(token, secret);
      return {
        id: payload.sub as string,
        email: payload.email as string,
        role: payload.role as string,
      };
    } catch (e) {
      console.error("JWT verification failed:", e);
      return null;
    }
  }

  /**
   * Convertit une durée (ex: '7d', '1h') en secondes.
   */
  private static parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) return 7 * 24 * 60 * 60; // défaut : 7 jours
    const value = parseInt(match[1], 10);
    switch (match[2]) {
      case "s": return value;
      case "m": return value * 60;
      case "h": return value * 60 * 60;
      case "d": return value * 24 * 60 * 60;
      default: return 7 * 24 * 60 * 60;
    }
  }
}

