package com.lms.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@OpenAPIDefinition
@Configuration
public class SwaggerConfiguration {

  String schemeName = "JWT AUTHENTICATION";
  String bearerFormat = "JWT";
  String scheme = "bearer";

  @Bean
  public OpenAPI caseOpenAPI() {
          return new OpenAPI()
                    .addSecurityItem(new SecurityRequirement().addList(schemeName))
                    .components(new Components()
                                            .addSecuritySchemes(
                                                      schemeName,
                                                      new SecurityScheme()
                                                              .name(schemeName)
                                                              .type(SecurityScheme.Type.HTTP)
                                                              .bearerFormat(bearerFormat)
                                                              .in(SecurityScheme.In.HEADER)
                                                              .scheme(scheme)
                                            )
                    )
                    .info(new Info().title("LIBRARY MANAGEMENT SYSTEM").description("PROJECT FOR LIBRARY MANAGEMENT SYSTEM")
    						.version("v0.0.1").license(new License().name("Apache 2.0").url("http://springdoc.org"))
                    );
          }
}
