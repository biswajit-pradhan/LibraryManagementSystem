package com.lms.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.entity.RefreshToken;
import com.lms.repository.RefreshTokenRepository;
import com.lms.repository.UserInfoRepository;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;

    public RefreshToken createRefreshToken(String username) {
        RefreshToken refreshToken = RefreshToken.builder()
                .userInfo(userInfoRepository.findByEmail(username).get())
                .refreshToken(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(600000))//10 mins
                .build();
        return refreshTokenRepository.save(refreshToken);
    }


    public Optional<RefreshToken> findByRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByRefreshToken(refreshToken);
    }


    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException(token.getRefreshToken() + " Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

}
