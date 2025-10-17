package com.classify.auth;

public record User(
  Long id,
  String name,
  String email,
  String course,
  String year,
  String semester
) {}