package com.inspiringwave.ticket_management_system.security.jwt;

import com.inspiringwave.ticket_management_system.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.Nonnull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationMillis}")
    private long expirationMillis; // 10 mins = 600000

    private SecretKey signingKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // Generate JWT Token
    public String generateToken(User user) {

        // single active login support
        String sessionId = UUID.randomUUID().toString();
        user.setActiveSessionId(sessionId);

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", Set.of(user.getRole()));
        claims.put("sid", sessionId); // session id inside token

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(signingKey())
                .compact();
    }

    // Extract Email (Subject)
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extract Session ID
    public String extractSessionId(String token) {
        return extractAllClaims(token).get("sid", String.class);
    }

    // Token Expiry Check
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // Validate Token
    public boolean isTokenValid(String token, @Nonnull User user) {
        return extractEmail(token).equals(user.getEmail())
                && extractSessionId(token).equals(user.getActiveSessionId())
                && !isTokenExpired(token);
    }

    // Claims Helpers
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

}
