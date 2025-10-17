package com.classify.auth;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public class UserRepository {
  private final JdbcTemplate jdbc;

  public UserRepository(JdbcTemplate jdbc) { this.jdbc = jdbc; }

  public boolean emailExists(String email) {
    Integer count = jdbc.queryForObject("SELECT COUNT(*) FROM users WHERE email = ?", Integer.class, email);
    return count != null && count > 0;
  }

  public Long insert(String name, String email, String passwordHash, String course, String year, String semester) {
    jdbc.update("INSERT INTO users(name,email,password_hash,course,year,semester) VALUES (?,?,?,?,?,?)",
      name, email, passwordHash, course, year, semester);
    return jdbc.queryForObject("SELECT id FROM users WHERE email = ?", Long.class, email);
  }

  public Optional<User> findByEmail(String email) {
    return jdbc.query("SELECT id,name,email,course,year,semester FROM users WHERE email = ?", rs -> {
      if (rs.next()) {
        return Optional.of(new User(
          rs.getLong("id"),
          rs.getString("name"),
          rs.getString("email"),
          rs.getString("course"),
          rs.getString("year"),
          rs.getString("semester")
        ));
      }
      return Optional.empty();
    }, email);
  }

  public Optional<String> getPasswordHash(String email) {
    return jdbc.query("SELECT password_hash FROM users WHERE email = ?", rs -> {
      if (rs.next()) { return Optional.of(rs.getString(1)); }
      return Optional.empty();
    }, email);
  }
}