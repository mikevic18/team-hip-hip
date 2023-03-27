DROP TABLE IF EXISTS complaints_post;
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS information;
DROP TABLE IF EXISTS skill_share;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE complaints(
    complaint_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(30) UNIQUE NOT NULL,
    content VARCHAR(500),
    creation_date timestamp,
    update_date timestamp,
    user_id INT,
    votes INT DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(complaint_id),
    FOREIGN KEY(user_id) REFERENCES user_account("user_id")
);

CREATE TABLE complaints_post(
    post_id INT GENERATED ALWAYS AS IDENTITY,
    content VARCHAR(500),
    user_id INT NOT NULL,
    complaint_id INT,
    creation_date timestamp,
    update_date timestamp,
    PRIMARY KEY (post_id),
    FOREIGN KEY (complaint_id) REFERENCES complaints ("complaint_id"),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE listings (
    item_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    image_url VARCHAR(255),
    price INT NOT NULL,
    description VARCHAR(255),
    sold BOOLEAN DEFAULT FALSE,
    creation_date timestamp,
    update_date timestamp,
    PRIMARY KEY (item_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE information (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    content VARCHAR(1000),
    creation_date timestamp,
    update_date timestamp,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);
CREATE TABLE skill_share(
    post_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    video_url VARCHAR(255) NOT NULL,
    PRIMARY KEY(post_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);


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