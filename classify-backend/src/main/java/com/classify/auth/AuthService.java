package com.classify.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
  private final UserRepository repo;
  private final PasswordEncoder encoder;
  private final JwtService jwt;

  public AuthService(UserRepository repo, PasswordEncoder encoder, JwtService jwt) {
    this.repo = repo; this.encoder = encoder; this.jwt = jwt;
  }

  public AuthResponse signup(SignupRequest req) {
    if (repo.emailExists(req.email())) throw new IllegalArgumentException("Email already registered");
    String hash = encoder.encode(req.password());
    repo.insert(req.name(), req.email(), hash, req.course(), req.year(), req.semester());
    var user = repo.findByEmail(req.email()).orElseThrow();
    String token = jwt.generate(user.email());
    return new AuthResponse(token, user);
  }

  public Optional<AuthResponse> login(LoginRequest req) {
    Optional<String> hashOpt = repo.getPasswordHash(req.email());
    if (hashOpt.isEmpty()) return Optional.empty();
    if (!encoder.matches(req.password(), hashOpt.get())) return Optional.empty();
    var user = repo.findByEmail(req.email()).orElseThrow();
    String token = jwt.generate(user.email());
    return Optional.of(new AuthResponse(token, user));
  }
}