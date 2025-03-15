CREATE TABLE "attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"studentId" integer NOT NULL,
	"present" smallint DEFAULT 0,
	"day" integer NOT NULL,
	"date" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grades" (
	"id" serial PRIMARY KEY NOT NULL,
	"grades" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(20) NOT NULL,
	"grade" varchar(10) NOT NULL,
	"course" varchar(30) NOT NULL,
	"matricNo" varchar(20) NOT NULL
);
