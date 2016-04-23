// course_id	
// CourseCode
// Semester	
// Period	
// viewed	
// explored	
// certified	
// final_cc_cname_DI	
// LevelOfEducation	
// YearOfBirth	
// gender	
// grade	
// start_time_DI	
// last_event_DI	
// NumberEvents	
// NumberDaysActive	
// NumberVideoPlayed	
// NumberChapters	
// NumberForumPosts	
// roles	
// incomplete_flag
var mongoose = require('mongoose');

var RedactedStudentSchema = new mongoose.Schema({
	course_id : {
		type : String
	},
	CourseCode : {
		type : String
	},
	Year : {
		type : Number
	},
	Period : {
		type : String,
		default : 'Spring-Fall'
	},
	viewed : {
		type : Number,
		default : 0
	},
	explored : {
		type : Number,
		default : 0
	},
	certified : {
		type : Number,
		default : 0
	},
	final_cc_cname_DI : {
		type : String,
		default : 'NA'
	}, 
	LevelOfEducation : {
		type : String,
		default : 'NA'
	},
	YearOfBirth : {
		type : String,
		default : 'NA'
	}, 
	gender : {
		type : String,
		default : 'NA'
	},
	grade : {
		type : Number,
		default : 0
	}, 
	start_time_DI : {
		type : String
	},
	last_event_DI : {
		type : String,
		default : 'present'
	},
	NumberEvents : {
		type : Number,
		default : 0
	},
	NumberDaysActive : {
		type : Number, 
		default : 0
	},
	NumberVideoPlayed : {
		type : Number,
		default : 0
	},
	NumberChapters : {
		type : Number,
		default : 0
	},
	NumberForumPosts : {
		type : Number,
		default : 0
	},
	roles : {
		type : Number,
		default : 0
	},
	incomplete_flag : {
		type : Number,
		default : 0
	}
});

var StudentData = mongoose.model("StudentData", RedactedStudentSchema);
module.exports = StudentData;