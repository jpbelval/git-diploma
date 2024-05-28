CREATE TABLE Student(
   cip VARCHAR(8),
   lastname VARCHAR(50),
   firstname VARCHAR(50),
   email VARCHAR(50),
   PRIMARY KEY(cip)
);

CREATE TABLE Project(
   id_project VARCHAR(50),
   PRIMARY KEY(id_project)
);

CREATE TABLE Event(
   id_event VARCHAR(50),
   cip VARCHAR(50),
   date_event timestamp,
   id_project VARCHAR(50),
   PRIMARY KEY(id_event),
   FOREIGN KEY(id_project) REFERENCES Project(id_project)
);

CREATE TABLE File(
   id_file VARCHAR(50),
   name VARCHAR(50),
   size BIGINT,
   last_change timestamp,
   id_project VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_file),
   FOREIGN KEY(id_project) REFERENCES Project(id_project)
);

CREATE TABLE Tutor(
   cip VARCHAR(8),
   firstname VARCHAR(50),
   lastname VARCHAR(50),
   email VARCHAR(50),
   PRIMARY KEY(cip)
);

CREATE TABLE Class(
   sigle VARCHAR(50),
   name VARCHAR(50),
   PRIMARY KEY(sigle)
);

CREATE TABLE Student_Projet(
   cip VARCHAR(8),
   id_project VARCHAR(50),
   PRIMARY KEY(cip, id_project),
   FOREIGN KEY(cip) REFERENCES Student(cip),
   FOREIGN KEY(id_project) REFERENCES Project(id_project)
);

CREATE TABLE Tutors_Class(
   cip VARCHAR(8),
   sigle VARCHAR(50),
   PRIMARY KEY(cip, sigle),
   FOREIGN KEY(cip) REFERENCES Tutor(cip),
   FOREIGN KEY(sigle) REFERENCES Class(sigle)
);

CREATE TABLE Class_Project(
   id_project VARCHAR(50),
   sigle VARCHAR(50),
   PRIMARY KEY(id_project, sigle),
   FOREIGN KEY(id_project) REFERENCES Project(id_project),
   FOREIGN KEY(sigle) REFERENCES Class(sigle)
);


INSERT INTO Student VALUES ('brol1606', 'brochu', 'laurent', 'brol1606@usherbrooke.ca');
INSERT INTO Student VALUES ('aubm1811', 'aubin', 'maxime', 'aubm1811@usherbrooke.ca');
INSERT INTO Student VALUES ('belj1922', 'belval', 'jean-philippe', 'belj1922@usherbrooke.ca');
INSERT INTO Student VALUES ('lepl1501', 'lépine', 'luka', 'lepl1501@usherbrooke.ca');
INSERT INTO Student VALUES ('ouej2018', 'ouellet', 'jérôme', 'ouej2018@usherbrooke.ca');
INSERT INTO Tutor VALUES ('maif1401', 'mailhot', 'frédéric', 'maif1401@usherbrooke.ca');
