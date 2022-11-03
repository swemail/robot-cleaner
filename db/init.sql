CREATE TABLE IF NOT EXISTS executions (
  id SERIAL,
  timestamp varchar(250) NOT NULL,
  commands INT NOT NULL,
  result INT NOT NULL,
  duration REAL NOT NULL,  
  PRIMARY KEY (id)
);