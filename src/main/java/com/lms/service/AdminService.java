package com.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lms.entity.Student;
import com.lms.entity.Teacher;
import com.lms.entity.UserInfo;
import com.lms.exception.StudentNotFoundException;
import com.lms.exception.TeacherAlreadyRegisteredException;
import com.lms.exception.TeacherNotFoundException;
import com.lms.repository.StudentRepository;
import com.lms.repository.TeacherRepository;
import com.lms.repository.UserInfoRepository;

@Service
public class AdminService {

	@Autowired
	private TeacherRepository teacherRepository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	public Teacher addTeacher(Teacher teacher) {
		Optional<Teacher> checkTeacherAvailableOrNot = teacherRepository.findAll().stream()
				.filter(t -> t.getTeacherEmail().equals(teacher.getTeacherEmail())).findAny();
		Optional<UserInfo> teacherInfo = userInfoRepository.findByEmail(teacher.getTeacherEmail());
		if(teacherInfo.isPresent()) {
			throw new TeacherAlreadyRegisteredException("User already registered with email "+teacher.getTeacherEmail());
		}
		if (checkTeacherAvailableOrNot.isPresent()) {
			throw new TeacherAlreadyRegisteredException(
					"Teacher with email " + teacher.getTeacherEmail() + " already registered!!");
		} else {
			userInfoRepository.save(UserInfo.builder()
					.email(teacher.getTeacherEmail())
					.password(passwordEncoder.encode(teacher.getTeacherPassword()))
					.roles("ROLE_TEACHER").build());
			return teacherRepository.save(teacher);
		}
	}

	public Teacher deleteTeacherByTeacherEmail(String teacherEmail) {
		Optional<Teacher> teacher = teacherRepository.findTeacherByTeacherEmail(teacherEmail);
		Optional<UserInfo> teacherInfo = userInfoRepository.findByEmail(teacherEmail);
		
		if (!teacher.isPresent() || !teacherInfo.isPresent()) {
			throw new TeacherNotFoundException("Teacher data not found with email " + teacherEmail + "!!");
		} else {
			Teacher teacherDataToReturn= teacher.get();
			teacherRepository.deleteById(teacher.get().getTeacherId());
			userInfoRepository.deleteById(teacherInfo.get().getUserId());
			return teacherDataToReturn;
		}
	}

	public Student deleteStudentByStudentEmail(String studentEmail) {
		Optional<Student> student = studentRepository.findStudentByStudentEmail(studentEmail);
		Optional<UserInfo> studentInfo = userInfoRepository.findByEmail(studentEmail);
		
		if (!student.isPresent() || !studentInfo.isPresent()) {
			throw new StudentNotFoundException("Student data not found with email " + studentEmail + "!!");
		} else {
			Student studentDataToReturn=student.get();
			studentRepository.deleteById(student.get().getStudentId());
			userInfoRepository.deleteById(studentInfo.get().getUserId());
			return studentDataToReturn;
		}
	}

	public List<Teacher> getAllTeachers() {
		// TODO Auto-generated method stub
		return teacherRepository.findAll();
	}

	public List<Student> getAllStudents() {
		// TODO Auto-generated method stub
		return studentRepository.findAll();
	}

}
