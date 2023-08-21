package com.jaehwan.jaehwanback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;


@RestController
@SpringBootApplication
public class JaehwanBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(JaehwanBackApplication.class, args);
	}

	//@RequestMapping("/")
	//public String home() {
//		return "jaehwan jeong!!!!!!";
//	}

}
