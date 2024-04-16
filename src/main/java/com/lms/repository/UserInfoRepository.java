package com.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lms.entity.UserInfo;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo,Long> {
	Optional<UserInfo> findByEmail(String username);
}
