package com.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.entity.Student;
import com.lms.entity.Teacher;
import com.lms.exception.StudentNotFoundException;
import com.lms.exception.TeacherAlreadyRegisteredException;
import com.lms.exception.TeacherNotFoundException;
import com.lms.repository.StudentRepository;
import com.lms.repository.TeacherRepository;

@Service
public class AdminService {

	@Autowired
	private TeacherRepository teacherRepository;
	
	@Autowired
	private StudentRepository studentRepository;

	public Teacher addTeacher(Teacher teacher) {
		Optional<Teacher> checkTeacherAvailableOrNot = teacherRepository.findAll().stream()
				.filter(t -> t.getTeacherEmail().equals(teacher.getTeacherEmail())).findAny();
		if (checkTeacherAvailableOrNot.isPresent()) {
			throw new TeacherAlreadyRegisteredException(
					"Teacher with email " + teacher.getTeacherEmail() + " already registered!!");
		} else {
			return teacherRepository.save(teacher);
		}
	}

	public Teacher deleteTeacherByTeacherEmail(String teacherEmail) {
		Optional<Teacher> teacher = teacherRepository.findTeacherByTeacherEmail(teacherEmail);
		
		if (!teacher.isPresent()) {
			throw new TeacherNotFoundException("Teacher data not found with email " + teacherEmail + "!!");
		} else {
			Teacher teacherDataToReturn= teacher.get();
			teacherRepository.deleteById(teacher.get().getTeacherId());
			return teacherDataToReturn;
		}
	}

	public Student deleteStudentByStudentEmail(String studentEmail) {
		Optional<Student> student = studentRepository.findStudentByStudentEmail(studentEmail);
		
		if (!student.isPresent()) {
			throw new StudentNotFoundException("Student data not found with email " + studentEmail + "!!");
		} else {
			Student studentDataToReturn=student.get();
			studentRepository.deleteById(student.get().getStudentId());;
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
