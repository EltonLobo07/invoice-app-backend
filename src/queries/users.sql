/* @name getUserByEmail */
SELECT * FROM users WHERE email = :email;

/* @name addUser */
INSERT INTO users (
    "name",
    email,
    password_hash
)
VALUES (
    :name,
    :email,
    :passwordHash 
)
RETURNING "name", email;
