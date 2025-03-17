USE test_management_system

CREATE TABLE roles (
    role_id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    name VARCHAR(100) UNIQUE NOT NULL,
    is_deleted BIT DEFAULT 0
);

CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    role_id VARCHAR(36),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE test_suites (
    suite_id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by VARCHAR(36),
    created_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE test_cases (
    case_id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    suite_id VARCHAR(36),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    preconditions TEXT,
    created_by VARCHAR(36),
    created_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (suite_id) REFERENCES test_suites(suite_id),
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE test_runs (
    run_id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_by VARCHAR(36),
    created_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE test_execution (
    execution_id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    run_id VARCHAR(36),
    case_id VARCHAR(36),
    tester_id VARCHAR(36),
    status VARCHAR(50) NOT NULL,
    execution_time DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (run_id) REFERENCES test_runs(run_id),
    FOREIGN KEY (case_id) REFERENCES test_cases(case_id),
    FOREIGN KEY (tester_id) REFERENCES users(user_id)
);

CREATE TABLE test_steps (
    step_id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    case_id VARCHAR(36),
    description TEXT NOT NULL,
    expected_result TEXT NOT NULL,
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (case_id) REFERENCES test_cases(case_id)
);

CREATE TABLE attachments (
    attachment_id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    execution_id VARCHAR(36),
    file_url TEXT NOT NULL,
    uploaded_by VARCHAR(36),
    uploaded_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (execution_id) REFERENCES test_execution(execution_id),
    FOREIGN KEY (uploaded_by) REFERENCES users(user_id)
);

CREATE TABLE comments (
    comment_id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    execution_id VARCHAR(36),
    case_id VARCHAR(36),
    step_id VARCHAR(36),
    commenter_id VARCHAR(36),
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (execution_id) REFERENCES test_execution(execution_id),
    FOREIGN KEY (case_id) REFERENCES test_cases(case_id),
    FOREIGN KEY (step_id) REFERENCES test_steps(step_id),
    FOREIGN KEY (commenter_id) REFERENCES users(user_id)
);

CREATE TABLE test_step_executions (
    step_execution_id VARCHAR(36) PRIMARY KEY DEFAULT NEWID(),
    execution_id VARCHAR(36),
    step_id VARCHAR(36),
    actual_result TEXT,
    status VARCHAR(50) NOT NULL,
    comment_id VARCHAR(36),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (execution_id) REFERENCES test_execution(execution_id),
    FOREIGN KEY (step_id) REFERENCES test_steps(step_id),
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
);



