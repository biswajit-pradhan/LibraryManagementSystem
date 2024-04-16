package com.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lms.entity.Student;
import com.lms.entity.Teacher;
import com.lms.entity.UserInfo;
import com.lms.exception.UserAlredayExistException;
import com.lms.repository.UserInfoRepository;

@Service
public class UserInfoService {
	@Autowired
	private UserInfoRepository userInfoRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AdminService adminService;

	@Autowired
	private TeacherService teacherService;

	public UserInfo addUser(UserInfo user) {
		Optional<UserInfo> userData = userInfoRepository.findAll().stream()
				.filter(u -> u.getEmail().equals(user.getEmail())).findAny();
		if (userData.isPresent()) {
			throw new UserAlredayExistException("User already exist with email " + user.getEmail());
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		String[] list = user.getRoles().split(",");
		for (String i : list) {
//			System.out.println(i);
			if ("ROLE_TEACHER".equals(i)) {
				adminService.addTeacher(
						Teacher.builder().teacherEmail(user.getEmail()).teacherPassword(user.getPassword()).build());
			}
			if ("ROLE_STUDENT".equals(i)) {
				teacherService.addStudent(
						Student.builder().studentEmail(user.getEmail()).studentPassword(user.getPassword()).build());
			}
		}
		return userInfoRepository.save(user);
	}

	public List<UserInfo> getAllUsers() {
		return userInfoRepository.findAll();
	}
}
