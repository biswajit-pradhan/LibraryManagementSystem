package com.lms.entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentBook {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int studentBookId;
	
	@ManyToOne 
	private Book bookTaken;
	
	private Date bookAllocationDate;
	private Date bookAllocationEndDate;

}
