INSERT INTO departments(department_name)
VALUES ('Finance'),
       ('Marketing'),
       ('Operations'),
       ('Human Resource'),
       ('IT');

INSERT INTO roles(title, salary, department_id)
VALUES ("Financial Analyst", 90000, 1),
       ("Finance Manager", 100000, 1),
       ("Marketing Specialist", 75000, 2),
       ("Marketing Manager", 110000, 2),
       ("Operations Coordinator", 80000, 3),
       ("Operations Manager", 100000, 3),
       ("Human Resource Associate", 750000, 4),
       ("Human Resource Manager", 100000, 4),
       ("IT Engineer", 100000, 5),
       ("IT Manager", 125000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Penny", "Stemmon", 2, null),
       ("Markl", "Fisher", 1, 1),
       ("Sophie", "Hatter", 4, null),
       ("Maddier", "Sulliman", 3, 3),
       ("Howl", "Jenkins", 6, null),
       ("Lettie", "Hatter", 5, 5),
       ("Martha", "Hatter", 8, null),
       ("Annabel", "Fairfax", 7, 7),
       ("Lily", "Angorian", 10, null),
       ("Justin", "Ingary", 9, 9);
    