package com.lms.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int studentId;

	private String studentEmail;
	private String studentPassword;
	
	@ManyToMany
	private List<StudentBook> booksTakenByStudent;
	
}
