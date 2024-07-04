package com.diploma.git.backend;

import jakarta.annotation.security.DeclareRoles;
import org.bouncycastle.jcajce.provider.symmetric.TEA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity

public class SecurityConfig{

    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
    String jwkSetUri;
    public static final String TEACHER = "teacher";
    public static final String STUDENT = "student";
    private final JwtConverter jwtConverter;

    public SecurityConfig(JwtConverter jwtConverter) {
        this.jwtConverter = jwtConverter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((authz) ->
                authz.requestMatchers(HttpMethod.GET, "/api/greetings").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/tutor/**").hasRole(TEACHER)
                        .requestMatchers(HttpMethod.GET, "/api/student/**").hasRole(STUDENT)
                        .requestMatchers(HttpMethod.GET, "/api/team/**").hasAnyRole(TEACHER,STUDENT)
                        .requestMatchers(HttpMethod.GET,"/oauth2/**").permitAll()
                        .anyRequest().authenticated());

        http.sessionManagement(sess -> sess.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));
        http.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtConverter)));

        return http.build();
    }

//    private final KeycloakLogoutHandler keycloakLogoutHandler;
//
//    SecurityConfig(KeycloakLogoutHandler keycloakLogoutHandler) {
//        this.keycloakLogoutHandler = keycloakLogoutHandler;
//    }

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        return http.cors(Customizer.withDefaults())
//                .csrf(csrf -> csrf.ignoringRequestMatchers("/api/home/**"))
//                .authorizeHttpRequests(httpRequests -> {
//                    httpRequests.anyRequest().authenticated();
//                })
//                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer.jwt(Customizer.withDefaults()))
//                 .oauth2Login(Customizer.withDefaults())
//                .build();
//    }

//    @Bean
//    public SecurityFilterChain resourceServerFilterChain(HttpSecurity http) throws Exception {
//        http.authorizeHttpRequests(auth -> auth
//                .requestMatchers(new AntPathRequestMatcher("*", HttpMethod.OPTIONS.name()))
//                .permitAll()
//                .requestMatchers(new AntPathRequestMatcher("*"))
//                .hasRole("student")
//                .requestMatchers(new AntPathRequestMatcher("/"))
//                .permitAll()
//                .anyRequest()
//                .authenticated());
//        http.oauth2ResourceServer((oauth2) -> oauth2
//                .jwt(Customizer.withDefaults()));
//        http.oauth2Login(Customizer.withDefaults())
//                .logout(logout -> logout.addLogoutHandler(keycloakLogoutHandler).logoutSuccessUrl("/"));
//        return http.build();
//    }

}
