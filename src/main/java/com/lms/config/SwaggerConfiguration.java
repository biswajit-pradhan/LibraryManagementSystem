package com.lms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@OpenAPIDefinition
@Configuration
public class SwaggerConfiguration {
	
//	For access Swagger you can hit "http://localhost:8080/swagger-ui.html"
	
	@Bean
	public OpenAPI springShopOpenAPI() {
		return new OpenAPI()
				.info(new Info().title("LIBRARY MANAGEMENT SYSTEM").description("PROJECT FOR LIBRARY MANAGEMENT SYSTEM")
						.version("v0.0.1").license(new License().name("Apache 2.0").url("http://springdoc.org")));
	}
}