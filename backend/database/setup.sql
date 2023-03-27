DROP TABLE IF EXISTS diary;
DROP TABLE IF EXISTS user_account;
CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE diary(
    diary_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(30) UNIQUE NOT NULL,
    content VARCHAR(500),
    is_secret BOOLEAN DEFAULT TRUE,
    creation_date timestamp,
    update_date timestamp,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES user_account(user_id)
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

INSERT INTO diary(title, content)
VALUES
('cat hit list', 'yumi, muffin are my frenemies!'),
('dog gang',' muffin and yumi are the best!');