USE test_management_system;
GO

CREATE OR ALTER PROCEDURE createProject
    @name NVARCHAR(255),
    @description TEXT,
    @created_by NVARCHAR(36)
AS
BEGIN
	DECLARE @project_id NVARCHAR(36);
	DECLARE @owner_role_id NVARCHAR(36);

	SET @project_id = NEWID();
	SELECT @owner_role_id = role_id FROM roles WHERE name = 'Owner';

    INSERT INTO projects (project_id, name, description, created_by)
    VALUES (@project_id, @name, @description, @created_by);

	EXEC addProjectMember
        @project_id = @project_id, 
        @user_id = @created_by, 
        @role_id = @owner_role_id;
END
GO

CREATE OR ALTER PROCEDURE addProjectMember
    @project_id NVARCHAR(36),
    @user_id NVARCHAR(255),
    @role_id NVARCHAR(36)
AS
BEGIN
	INSERT INTO project_members(project_id, user_id, role_id) 
	VALUES (@project_id, @user_id, @role_id)
END
GO


CREATE OR ALTER PROCEDURE getProjects
AS
BEGIN
    SELECT
        p.project_id,
        p.name,
        p.created_at,
        (SELECT COUNT(*) FROM test_suites ts WHERE ts.project_id = p.project_id) AS test_suite_count,
        (SELECT COUNT(*) 
         FROM test_cases tc 
         JOIN test_suites ts ON tc.suite_id = ts.suite_id
         WHERE ts.project_id = p.project_id) AS test_case_count,
        (SELECT COUNT(*) FROM test_runs tr WHERE tr.project_id = p.project_id) AS test_run_count,
        ISNULL(members.members_json, '[]') AS members
    FROM projects p
    OUTER APPLY (
    SELECT (
        SELECT
            u.user_id,
            u.username AS user_name,
            u.email,
			r.name AS role
        FROM project_members pm
        JOIN users u ON u.user_id = pm.user_id
		JOIN roles r ON r.role_id = pm.role_id
        WHERE pm.project_id = p.project_id
        FOR JSON PATH
    ) AS members_json
) AS members;
END
GO

CREATE OR ALTER PROCEDURE getProject
	@project_id VARCHAR(36)
AS
BEGIN
    SELECT
        p.project_id,
        p.name,
		p.description,
        p.created_at,
		p.created_by,
		p.is_deleted,
        (SELECT COUNT(*) FROM test_suites ts WHERE ts.project_id = p.project_id) AS test_suite_count,
        (SELECT COUNT(*) 
         FROM test_cases tc 
         JOIN test_suites ts ON tc.suite_id = ts.suite_id
         WHERE ts.project_id = p.project_id) AS test_case_count,
        (SELECT COUNT(*) FROM test_runs tr WHERE tr.project_id = p.project_id) AS test_run_count,
        ISNULL(members.members_json, '[]') AS members
    FROM projects p
    OUTER APPLY (
    SELECT (
        SELECT
            u.user_id,
            u.username AS user_name,
            u.email,
			r.name AS role
        FROM project_members pm
        JOIN users u ON u.user_id = pm.user_id
		JOIN roles r ON r.role_id = pm.role_id
        WHERE pm.project_id = p.project_id
        FOR JSON PATH
    ) AS members_json
) AS members
WHERE p.project_id = @project_id;
END
GO

CREATE OR ALTER PROCEDURE getUserProjects
    @user_id NVARCHAR(36)
AS
BEGIN
    SELECT
        p.project_id,
        p.name,
        p.created_at,
        (SELECT COUNT(*) FROM test_suites ts WHERE ts.project_id = p.project_id) AS test_suite_count,
        (SELECT COUNT(*) 
         FROM test_cases tc 
         JOIN test_suites ts ON tc.suite_id = ts.suite_id
         WHERE ts.project_id = p.project_id) AS test_case_count,
        (SELECT COUNT(*) FROM test_runs tr WHERE tr.project_id = p.project_id) AS test_run_count,
        ISNULL(members.members_json, '[]') AS members
    FROM projects p
    INNER JOIN project_members pm_filter ON pm_filter.project_id = p.project_id

    OUTER APPLY (
        SELECT (
            SELECT
                u.user_id,
                u.username AS user_name,
                u.email,
                r.name AS role
            FROM project_members pm
            JOIN users u ON u.user_id = pm.user_id
            JOIN roles r ON r.role_id = pm.role_id
            WHERE pm.project_id = p.project_id
            FOR JSON PATH
        ) AS members_json
    ) AS members

    WHERE pm_filter.user_id = @user_id;
END
GO

CREATE OR ALTER PROCEDURE updateProjectDetails
    @project_id   NVARCHAR(36),
    @name         NVARCHAR(255) = NULL,
    @description  TEXT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Ensure project exists and is not deleted
    IF NOT EXISTS (
        SELECT 1 
        FROM projects 
        WHERE project_id = @project_id
          AND is_deleted = 0
    )
    BEGIN
        RAISERROR ('Project not found or is deleted', 16, 1, @project_id);
        RETURN;
    END

    UPDATE projects
    SET
        name = COALESCE(@name, name),
        description = COALESCE(@description, description)
    WHERE project_id = @project_id;
END
GO

select * from projects where project_id = '878798F5-B2D4-42FD-B057-29A9DF049CAF'




