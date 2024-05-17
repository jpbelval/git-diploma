CREATE TABLE gdUser(
   cip VARCHAR(8),
   nom VARCHAR(50) NOT NULL,
   prenom VARCHAR(50) NOT NULL,
   courriel VARCHAR(255) NOT NULL,
   isTuteur BOOLEAN NOT NULL,
   CONSTRAINT PK_cip PRIMARY KEY(cip)
);

INSERT INTO gdUser VALUES ('brol1606', 'brochu', 'laurent', 'brol1606@usherbrooke.ca', false);
INSERT INTO gdUser VALUES ('aubm1811', 'aubin', 'maxime', 'aubm1811@usherbrooke.ca', false);
INSERT INTO gdUser VALUES ('belj1922', 'belval', 'jean-philippe', 'belj1922@usherbrooke.ca', false);
INSERT INTO gdUser VALUES ('lepl1501', 'lépine', 'luka', 'lepl1501@usherbrooke.ca', false);
INSERT INTO gdUser VALUES ('ouej2018', 'ouellet', 'jérôme', 'ouej2018@usherbrooke.ca', false);
INSERT INTO gdUser VALUES ('maif1401', 'mailhot', 'frédéric', 'maif1401@usherbrooke.ca', true);