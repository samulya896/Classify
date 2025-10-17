package com.classify.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {
  private final Key key;
  private final long expirationMs;

  public JwtService(@Value("${app.jwt.secret}") String secret,
                    @Value("${app.jwt.expirationSeconds}") long expirationSeconds) {
    this.key = Keys.hmacShaKeyFor(secret.getBytes());
    this.expirationMs = expirationSeconds * 1000L;
  }

  public String generate(String subject) {
    long now = System.currentTimeMillis();
    return Jwts.builder()
      .setSubject(subject)
      .setIssuedAt(new Date(now))
      .setExpiration(new Date(now + expirationMs))
      .signWith(key, SignatureAlgorithm.HS256)
      .compact();
  }
}