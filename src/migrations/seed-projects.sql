
-- Seed Projects Table
INSERT INTO projects (id, title, subtitle, description, overview, ascii_art, demo_link, stress_level, user_id)
VALUES 
  ('bad-ideas-01', 'Bad Ideas', 'A collection of terrible project ideas', 'A showcase of project ideas that should never be implemented', 'This is a humorous collection of the worst project ideas I''ve ever had. Each idea comes with an explanation of why it would be terrible to actually build.', '  _____  \n |_   _| \n   | |   \n   | |   \n  _| |_  \n |_____| \n', 'https://example.com/bad-ideas', 5, 'system'),
  
  ('cat-web-03', 'CatWeb', 'A website for cats, by cats', 'A social network exclusively for feline users', 'CatWeb is a parody project exploring what a social network designed exclusively for cats might look like. It features paw-friendly navigation, purr-based authentication, and content organized around napping spots and treat locations.', '  /\\_/\\ \n ( o.o ) \n  > ^ < \n', 'https://example.com/catweb', 1, 'system'),
  
  ('code-dreams-02', 'Code Dreams', 'What if your code could dream?', 'An AI experiment that generates visual representations of code', 'This art project uses machine learning to analyze codebases and generate dreamlike visualizations representing the structure and patterns found in the code. It explores the intersection of programming and creativity.', '  _____  \n |     | \n |_____| \n |     | \n |_____| \n', 'https://example.com/code-dreams', 3, 'system');

-- Seed Project Emojis Table
INSERT INTO project_emojis (project_id, icon, meaning)
VALUES
  ('bad-ideas-01', '💩', 'Bad Ideas'),
  ('bad-ideas-01', '🙈', 'Don''t Look'),
  ('bad-ideas-01', '🔥', 'Dumpster Fire'),
  
  ('cat-web-03', '🐱', 'Cats'),
  ('cat-web-03', '🧶', 'Yarn'),
  ('cat-web-03', '🐟', 'Fish'),
  
  ('code-dreams-02', '✨', 'Magic'),
  ('code-dreams-02', '🧠', 'Neural Networks'),
  ('code-dreams-02', '🎨', 'Art');

-- Seed Project Metrics Table
INSERT INTO project_metrics (project_id, label, value, is_component)
VALUES
  ('bad-ideas-01', 'Comedy Value', 'High', false),
  ('bad-ideas-01', 'Development Time', 'Never', false),
  
  ('cat-web-03', 'Purrs Generated', '9832', false),
  ('cat-web-03', 'Yarn Balls Used', '583', false),
  
  ('code-dreams-02', 'Computation Time', '72 hours', false),
  ('code-dreams-02', 'Dataset Size', '250GB', false);

-- Seed Project Tech Stack Table
INSERT INTO project_tech_stack (project_id, name, level, comment, snippet)
VALUES
  ('bad-ideas-01', 'Satire', 5, 'Heavily reliant on sarcasm and irony', NULL),
  ('bad-ideas-01', 'Comedy Writing', 4, 'Used to create humorous descriptions', 'console.log("Why did the programmer quit his job? He didn''t get arrays!");'),
  
  ('cat-web-03', 'React', 4, 'Used for component-based UI', 'const CatApp = () => <div>Meow World</div>;'),
  ('cat-web-03', 'Tailwind CSS', 3, 'Used for styling', NULL),
  ('cat-web-03', 'Node.js', 4, 'Backend services', NULL),
  
  ('code-dreams-02', 'TensorFlow', 5, 'Core ML framework', 'model.fit(x_train, y_train, epochs=50)'),
  ('code-dreams-02', 'WebGL', 3, 'Rendering visualizations', NULL),
  ('code-dreams-02', 'Python', 4, 'Data processing', NULL);

-- Seed Project Problems Table
INSERT INTO project_problems (project_id, issue, solution)
VALUES
  ('bad-ideas-01', 'Too many terrible ideas', 'Created a ranking system for badness'),
  ('bad-ideas-01', 'People trying to implement the ideas', 'Added very clear warnings'),
  
  ('cat-web-03', 'Cats can''t type', 'Developed paw-friendly interface'),
  ('cat-web-03', 'Content moderation', 'Implemented anti-laser pointer detection'),
  
  ('code-dreams-02', 'GPU performance', 'Optimized shaders and reduced complexity'),
  ('code-dreams-02', 'Memory usage', 'Implemented progressive loading and streaming');

-- Seed Project Challenges Table
INSERT INTO project_challenges (project_id, title, status, description)
VALUES
  ('bad-ideas-01', 'Ideas too believable', 'CLOSED', 'Made ideas more obviously terrible'),
  ('bad-ideas-01', 'Too many venture capitalists interested', 'OPEN', 'Need to add more disclaimers'),
  
  ('cat-web-03', 'Keeping cats interested', 'CLOSED', 'Added random movement animations'),
  ('cat-web-03', 'Dog infiltration attempts', 'WONTFIX', 'Decided to be inclusive after all'),
  
  ('code-dreams-02', 'Visualization clarity', 'CLOSED', 'Improved the color mapping algorithm'),
  ('code-dreams-02', 'Handling large codebases', 'PATCHED', 'Added sampling technique to process only representative code sections');
