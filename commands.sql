-- blogs table creation command
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY, 
  author VARCHAR(255), 
  url VARCHAR(255) NOT NULL, 
  title VARCHAR(255) NOT NULL, 
  likes INTEGER DEFAULT 0
);

-- blog insert command
INSERT INTO blogs (author, url, title, likes) VALUES ('Carlos Acosta', 'www.myblog.com', 'How to win against AI?', 234);
INSERT INTO blogs (author, url, title, likes) VALUES ('Carlos Acosta', 'www.myblog.com', 'How to become an AI Engineer', 65);