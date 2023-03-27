DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE posts (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    title VARCHAR(30) UNIQUE NOT NULL,
    content VARCHAR(500),
    creation_date timestamp,
    update_date timestamp,
    category VARCHAR(30) NOT NULL,
    PRIMARY KEY(post_id),
    FOREIGN KEY(user_id) REFERENCES user_account("user_id")
);

CREATE TABLE complaints(
    votes INT DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    admin_comment VARCHAR(255)
) INHERITS (posts);


CREATE TABLE listings (
    image_url VARCHAR(255),
    price INT NOT NULL,
    sold BOOLEAN DEFAULT FALSE
) INHERITS (posts);

CREATE TABLE information (
    votes INT DEFAULT 0
) INHERITS (posts);

CREATE TABLE skill_share(
    video_url VARCHAR(255) NOT NULL,
    votes INT DEFAULT 0
) INHERITS (posts);


CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

INSERT INTO user_account(username, password) VALUES
('shoshi', 'cat123'),
('yumi', 'yumi123'),
('muffin', 'CuteDog123'),
('ringo','AnotherCuteDog123');

-- INSERT INTO diary(title, content)
-- VALUES
-- ('cat hit list', 'yumi, muffin are my frenemies!'),
-- ('dog gang',' muffin and yumi are the best!');