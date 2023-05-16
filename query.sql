-- Creating table
CREATE TABLE users(
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    email varchar(40) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    photo VARCHAR(100) NOT NULL DEFAULT 'photo.jpg'
);

-- Creating table
CREATE TABLE contacts(
    id CHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE NOT NULL,
    contact_phone VARCHAR(20) UNIQUE NOT NULL,
    contact_name VARCHAR(100),
    CONSTRAINT fk_users_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

-- Creating table
CREATE TABLE conversations(
    id CHAR(36) PRIMARY KEY,
    user_id_1 VARCHAR(36) NOT NULL,
    user_id_2 VARCHAR(36) NOT NULL,
    CONSTRAINT fk_users1_id
        FOREIGN KEY (user_id_1)
        REFERENCES users(id),
    CONSTRAINT fk_users2_id
        FOREIGN KEY (user_id_2)
        REFERENCES users(id)
);

-- Creating table
CREATE TABLE groups(
    id CHAR(36) PRIMARY KEY,
    description TEXT,
    photo VARCHAR(100) NOT NULL DEFAULT 'photo.jgp'
);

-- Creating table
CREATE TABLE group_members(
    id CHAR(36) PRIMARY KEY,
    group_id CHAR(36) UNIQUE NOT NULL,
    user_id CHAR(36) NOT NULL,
    CONSTRAINT fk_groups_id
        FOREIGN KEY (group_id)
        REFERENCES groups(id)
        ON DELETE CASCADE
);

-- Creating table
CREATE TABLE messages(
    id CHAR(36) PRIMARY KEY,
    room_id CHAR(36) NOT NULL,
    sender_id CHAR(36) NOT NULL,
    messages TEXT NOT NULL,
    sent_at TIMESTAMP NOT NULL DEFAULT NOW()
);