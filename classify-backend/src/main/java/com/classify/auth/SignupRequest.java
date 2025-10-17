package com.classify.auth;

import jakarta.validation.constraints.*;

public record SignupRequest(
  @NotBlank String name,
  @Email @NotBlank String email,
  @NotBlank String password,
  @NotBlank String course,
  @NotBlank String year,
  @NotBlank String semester
) {}