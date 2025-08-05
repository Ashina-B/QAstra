USE test_management_system;
GO

CREATE OR ALTER PROCEDURE getOwnerRoleId
AS
BEGIN
    SELECT role_id FROM roles WHERE name = 'Owner'
END
GO

